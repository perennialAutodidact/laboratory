import React, { useState, useRef } from 'react';
import { CgCloseR } from 'react-icons/cg';
import { TimelineLite, TweenMax } from 'gsap'; // gsap animation library
import { Transition } from 'react-transition-group';
import { useDispatch, useSelector } from 'react-redux';
import { toggleForm } from '../../../state/slices/sunClockSlice'; // pull in actions from slice

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

  return (
    // This is the transition that's causing the warning
    <Transition
      mountOnEnter
      unmountOnExit
      nodeRef={ref}
      in={showForm}
      // node and done are provided by addEndListener
      // node is the element being transitioned and done
      addEndListener={(node, done) => {
        const tl = new TimelineLite();

        // tween the form in or out based on the value of the showForm boolean
        let tween = TweenMax.to(node, {
          y: showForm ? 0 : -500,
          autoAlpha: showForm ? 1 : 0,
          scale: showForm ? 1 : 0,
          onComplete: done,
        });

        // add the tween to the timeline
        tl.add(tween);
      }}
    >
      <form id='form' onSubmit={onSubmit}>
        <div id='header'>
          <span id='close-x'>
            {/* toggle hide/show form */}
            <CgCloseR onClick={() => dispatch(toggleForm())} />
          </span>
          <span id='title'>Location</span>
        </div>
        <div id='city-state-country'>
          <div className='form-row'>
            <p className='label'>City</p>
            <input type='text' name='city' value={city} onChange={onChange} />
          </div>
          <div className='form-row'>
            <p className='label'>State</p>
            <input type='text' name='state' value={state} onChange={onChange} />
          </div>
          <div className='form-row'>
            <p className='label'> Country </p>
            <input
              type='text'
              name='country'
              value={country}
              onChange={onChange}
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
    </Transition>
  );
};

export default Form;
