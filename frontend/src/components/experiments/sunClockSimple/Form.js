import React, { useState, useRef, useEffect } from 'react'
import { GrClose } from 'react-icons/gr'
import { TimelineLite, TweenMax, Elastic } from 'gsap' // gsap animation library
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
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
import dayjs from 'dayjs'
// import AutoCompleteSelect from './AutoCompleteSelect/AutoCompleteSelect'
import Alert from './Alert'
// import SearchResults from './SearchResults'

const Form = () => {
  const dispatch = useDispatch()
  const { showForm } = useSelector(state => state.sunClock)

  const [formData, setFormData] = useState({
    lat: '',
    lng: ''
  })
  const { lat, lng } = formData
  const [alertText, setAlertText] = useState('')
  const [loadingStatus, setLoadingStatus] = useState('IDLE')

  // for GSAP enter/exit animation
  let ref = useRef(null)

  const splitTimeString = timeString => {
    let offset = new Date().getTimezoneOffset()
    let hourOffset = -(offset / 60)
    let [time, meridian] = timeString.split(' ')
    let [hour, minute, second] = time.split(':')//.map(number=>parseInt(number))
    
    if(meridian === 'PM'){
      hour += 12
    }

    // hour += hourOffset

    // console.log(hour, minute, second, meridian);
  }

  // form control functions
  // -------------------------------------
  const onSubmit = e => {
    let query = ''
    e.preventDefault()

    if (!lat || !lng) {
      setAlertText('Please provide latitude and longitude')
    } else {
      setLoadingStatus('PENDING')
      dispatch(fetchSunData({ lat, lng }))
        .then(response => {
          let sunrise = response.payload.results.sunrise
          let sunset = response.payload.results.sunset

          let sunTimes = {
            surise: splitTimeString(sunrise),
            sunset: splitTimeString(sunset)
          }

          // console.log(riseHour, riseMinute, riseSecond)
          // console.log(sunset)

          sunrise = dayjs().startOf('day')

          setLoadingStatus('IDLE')
        })
        .catch(error => {
          setAlertText('An error occurred.')
          console.log(error)
        })
    }
  }

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  // -----------------------------------------------------------------------------------
  // EFFECTS

  // form enter/exit animation
  useEffect(() => {
    const tl = new TimelineLite()

    // tween the form in or out based on the value of the showForm boolean
    let tween = TweenMax.to(ref, {
      y: showForm ? 0 : -500,
      scale: showForm ? 1 : 0,
      duration: 0.5,
      ease: 'elastic.out(0.15, 0.15)'
    })

    // add the tween to the timeline
    tl.add(tween)

    return () => tl.kill()
  }, [showForm])

  // -------------------------------------------------------------------------------------

  return (
    <form id='form' onSubmit={onSubmit} ref={el => (ref = el)}>
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

      <div id='lat-lng'>
        <div className='form-row'>
          <p className='label'>Latitude</p>
          <input type='text' name='lat' value={lat} onChange={onChange} />
        </div>
        <div className='form-row'>
          <p className='label'>Longitude</p>
          <input type='text' name='lng' value={lng} onChange={onChange} />
        </div>
      </div>
      <button type='submit' id='submit'>
        {loadingStatus === 'PENDING' ? (
          <div className='spinner-container'>
            <AiOutlineLoading3Quarters className='spinner' />{' '}
          </div>
        ) : (
          'Submit'
        )}
      </button>
    </form>
  )
}

export default Form
