import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { OPEN_CAGE_DATA_API_KEY } from '../../../secrets';
import '../../../sass/components/experiments/_sunClock.scss';
import Form from './Form';
import { IoSettingsSharp } from 'react-icons/io5';
import { fetchLocalTime, fetchSunData, toggleForm } from '../../../state/slices/sunClockSlice'; // pull in actions from slice

const SunClock = ({ props }) => {
  const dispatch = useDispatch();

  // pull state from sunClock redux slice
  let { showForm, sunrise, sunset } = useSelector(state => state.sunClock);



  // useEffect(() => {
  //   let lat = 45.523064
  //   let lng = -122.676483
  //   dispatch(fetchSunData({lat,lng})).then(res=>console.log(res))
  //   dispatch(fetchLocalTime({lat,lng})).then(res=>console.log(res))
  // }, []);

  return (
    <div id='sun-clock'>
      <div id='settings-icon' onClick={() => dispatch(toggleForm())}>
        <IoSettingsSharp />
      </div>
      <Form />
      <div id='chart'>
        <Pie
          data={{
            datasets: [
              {
                data: [50, 50],
                backgroundColor: ['#000099', '#50C0C0'],
                borderWidth: 0,
              },
            ],
          }}
          options={{
            legend: {
              display: false,
            },
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    lat: state.lat,
    lng: state.lng,
    sunrise: state.sunrise,
    sunset: state.sunset,
  };
};

export default connect(mapStateToProps)(SunClock);
