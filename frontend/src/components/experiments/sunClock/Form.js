import React, { useState, useRef, useEffect } from 'react'
import { GrClose } from 'react-icons/gr'
import { TimelineLite, TweenMax, Elastic } from 'gsap' // gsap animation library
import { useDispatch, useSelector } from 'react-redux'
import {
  toggleForm,
  fetchCoords,
  fetchSunData,
  setSunData,
  setCoords,
  setLocation
} from '../../../state/slices/sunClockSlice' // pull in actions from slice
import { countryList } from '../../constants/countryList'
import { stateList } from '../../constants/stateList'
// import { cityList } from '../../constants/cityList'

import AutoCompleteSelect from './AutoCompleteSelect/AutoCompleteSelect'
import Alert from './Alert'

const Form = () => {
  const dispatch = useDispatch()
  const { showForm } = useSelector(state => state.sunClock)

  const [formData, setFormData] = useState({
    city: '',
    lat: '',
    lng: ''
  })
  const { city, lat, lng } = formData
  const [stateName, setStateName] = useState('')
  const [country, setCountry] = useState('')
  const [showCityField, setShowCityField] = useState(false)
  const [showStateNameField, setShowStateNameField] = useState(false)
  const [alertText, setAlertText] = useState('')

  // for GSAP enter/exit animation
  let ref = useRef(null)

  // form control functions
  // -------------------------------------
  const onSubmit = e => {
    let query
    e.preventDefault()

    if (!lat && !lng && !country) {
      setAlertText('Please provide a country name or coordinates')
    } else if(!countryList.includes(country)){
      setAlertText('Please select a valid country')
    } else {
      if (lat !== '' && lng !== '') {
        // call sunrise/sunset api
        dispatch(fetchSunData({ lat, lng }))
          .then(response => console.log(response))
          .catch(error => console.log(error))
      }
      // call APIs with form data
      else if (!(lat && lng)) {
        query = `${city + ', ' || ''} ${stateName + ', ' || ''} ${country ||
          ''} `
        if (stateName && country !== 'United States') {
          query += stateName
        }
        dispatch(fetchCoords(query))
          .then(res => {
            let results = res.payload.data.results
            results = results.filter(result=>result.confidence <= 6)
            console.log(results)

            // call sunrise api
          })
          .catch(err => console.error(err))
      }
    }
  }

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  // ---------------------------------------

  useEffect(() => {
    if (country !== 'United States') {
      setStateName('')
    } else if (!country) {
      setFormData({ ...formData, city: '' })
    }
  }, [country, setStateName, setFormData])

  useEffect(() => {
    setShowCityField(country !== '')
    setShowStateNameField(country === 'United States')
  }, [country])

  useEffect(() => {
    const tl = new TimelineLite()

    // tween the form in or out based on the value of the showForm boolean
    let tween = TweenMax.to(ref, {
      y: showForm ? 0 : -500,
      scale: showForm ? 1 : 0,
      duration: 1,
      ease: 'elastic.out(0.25, 0.25)'
    })

    // add the tween to the timeline
    tl.add(tween)

    return () => tl.kill()
  }, [showForm])

  return (
    <form
      id='form'
      onSubmit={onSubmit}
      ref={el => (ref = el)}
      onKeyDown={e => {
        // override default action when Enter is pressed
        // to avoid erroneous form submissions when using Enter
        // to choose an option in the select menus
        if (e.key === 'Enter') {
          e.preventDefault()
        }
      }}
    >
      {alertText !== '' && (
        <Alert alertText={alertText} setAlertText={setAlertText} interval={3} />
      )}

      <div id='header'>
        <span className='close-x'>
          {/* toggle hide/show form */}
          <GrClose onClick={() => dispatch(toggleForm())} />
        </span>
        <span id='title'>Location</span>
      </div>
      <div id='city-state-country'>
        <div className='form-row'>
          <p className='label'>
            <span className='text'>Country</span>
          </p>
          <AutoCompleteSelect
            fieldName={'country'}
            value={country}
            allOptions={countryList}
            formDataSetter={setCountry}
            optionsShown={6}
          />
        </div>

        <div className='form-row' id='state-field'>
          <p className='label'>
            <span className='text'>State</span>
          </p>
          {!showStateNameField ? <div className='disabled-form-row'></div> : ''}
          <AutoCompleteSelect
            fieldName={'state'}
            value={stateName}
            allOptions={stateList}
            formDataSetter={setStateName}
            optionsShown={6}
            isDisabled={country !== 'United States'}
          />
        </div>
        <div
          className={'form-row ' + (showCityField ? '' : 'hidden')}
          id='city-field'
        >
          <p className='label'>
            <span className='text'>City</span>
          </p>
          {!showCityField ? <div className='disabled-form-row'></div> : ''}
          <input
            type='text'
            name='city'
            value={city}
            onChange={onChange}
            disabled={!country}
          />
        </div>
      </div>
      <div id='divider'>
        <span id='circle'>
          <span>OR</span>
        </span>
      </div>

      <div id='lat-lng'>
        <div className='form-row'>
          <p className='label'>
            <span className='text'>Latitude</span>
          </p>
          <input type='text' name='lat' value={lat} onChange={onChange} />
        </div>
        <div className='form-row'>
          <p className='label'>Longitude</p>
          <input type='text' name='lng' value={lng} onChange={onChange} />
        </div>

        <div className='form-row'>
          <input type='submit' id='submit' value='Submit' />
        </div>
      </div>
    </form>
    // </Transition>
  )
}

export default Form
