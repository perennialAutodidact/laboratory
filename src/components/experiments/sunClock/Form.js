import React, { useState, useRef, useEffect } from 'react';
import { CgCloseR } from 'react-icons/cg';
import { TimelineLite, TweenMax, Elastic } from 'gsap'; // gsap animation library
import { useDispatch, useSelector } from 'react-redux';
import { toggleForm } from '../../../state/slices/sunClockSlice'; // pull in actions from slice
import { countryList } from '../../constants/countryList';

const Form = () => {
  const dispatch = useDispatch();
  const { showForm } = useSelector(state => state.sunClock);

  const [formData, setFormData] = useState({
    city: '',
    state: '',
    country: '',
    lat: '',
    lng: '',
  });
  const { city, state, country, lat, lng } = formData;

  let ref = useRef(null);

  // form control functions
  // -------------------------------------
  const onSubmit = e => {
    e.preventDefault();
    // call APIs with form data
  };

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  // ---------------------------------------

  useEffect(() => {
    const tl = new TimelineLite();

    // tween the form in or out based on the value of the showForm boolean
    let tween = TweenMax.to(ref, {
      y: showForm ? 0 : -500,
      autoAlpha: showForm ? 1 : 0,
      scale: showForm ? 1 : 0,
      duration: 1.5,
      ease: 'elastic.out(1, 0.3)',
    });

    // add the tween to the timeline
    tl.add(tween);
  }, [showForm]);

  return (
    <form id='form' onSubmit={onSubmit} ref={el => (ref = el)}>
      <div id='header'>
        <span id='close-x'>
          {/* toggle hide/show form */}
          <CgCloseR onClick={() => dispatch(toggleForm())} />
        </span>
        <span id='title'>Location</span>
      </div>
      <div id='city-state-country'>
        <div className='form-row'>
          <p className='label'>
            <span className='text'>City</span>
          </p>
          <input type='text' name='city' value={city} onChange={onChange} />
        </div>
        <div className='form-row'>
          <p className='label'>
            <span className='text'>State</span>
          </p>
          <input type='text' name='state' value={state} onChange={onChange} />
        </div>
        <div className='form-row'>
          <p className='label'>
            <span className='text'>Country</span>
          </p>

          {/* <select name='country' size='5' onChange={onChange} value={country}>
            
            
            {countryList.map(item => (
              <option className='country-option' value={item.name}>
                {item.name}
              </option>
            ))}
          </select> */}
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
  );
};

export default Form;
