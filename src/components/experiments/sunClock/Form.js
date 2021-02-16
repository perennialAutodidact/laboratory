import React, { Component, useRef, useEffect, useState } from 'react';
import { TimelineLite } from 'gsap';
import { CgCloseR } from 'react-icons/cg';
import { useDispatch, useSelector } from 'react-redux';
import { toggleForm } from '../../../state/slices/sunClockSlice';

// class Form extends Component {
//   constructor() {
//     this.state = {
//       city: '',
//       state: '',
//       country: '',
//       lat: '',
//       lng: '',
//     };
//     this.dispatch = useDispatch();
//     this.form = null;
//   }

//   componentDidMount() {
//     let { showForm } = useSelector(state => state.sunClock);
//   }

//   onChange() {}

//   render() {
//     const {city,state,country,lat,lng} = this.state;
//     return (
//       <form id='form' onSubmit={onSubmit} ref={el => (this.form = el)}>
//         <div id='header'>
//           <span id='close-x'>
//             <CgCloseR onClick={() => this.dispatch(toggleForm())} />
//           </span>
//           <span id='title'>Location</span>
//         </div>
//         <div id='city-state-country'>
//           <div className='form-row'>
//             <p className='label'>City</p>
//             <input type='text' name='city' value={city} onChange={onChange} />
//           </div>
//           <div className='form-row'>
//             <p className='label'>State</p>
//             <input type='text' name='state' value={state} onChange={onChange} />
//           </div>
//           <div className='form-row'>
//             <p className='label'> Country </p>
//             <input
//               type='text'
//               name='country'
//               value={country}
//               onChange={onChange}
//             />
//           </div>
//         </div>

//         <div id='divider'>
//           <span id='circle'>
//             <span>OR</span>
//           </span>
//         </div>

//         <div id='lat-lng'>
//           <div className='form-row'>
//             <p className='label'>
//               <span className='text'>Latitude</span>
//             </p>
//             <input type='text' name='lat' value={lat} onChange={onChange} />
//           </div>
//           <div className='form-row'>
//             <p className='label'>Longitude</p>
//             <input type='text' name='lng' value={lng} onChange={onChange} />
//           </div>

//           <div className='form-row'>
//             <input type='submit' id='submit' value='Submit' />
//           </div>
//         </div>
//       </form>
//     );
//   }
// }

const Form = () => {
  const [formData, setFormData] = useState({
    city: '',
    state: '',
    country: '',
    lat: '',
    lng: '',
  });

  const dispatch = useDispatch();
  const { city, state, country, lat, lng } = formData;
  let { showForm } = useSelector(state => state.sunClock);
  let form = useRef(null);

  useEffect(() => {
    const tl = new TimelineLite();

    if (!showForm) {
      return () => {
        console.log('CLEANUP');
      };
    }
  }, [showForm]);

  const onSubmit = e => {
    e.preventDefault();
  };

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form id='form' onSubmit={onSubmit} ref={el => (form = el)}>
      <div id='header'>
        <span id='close-x'>
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
  );
};

export default Form;