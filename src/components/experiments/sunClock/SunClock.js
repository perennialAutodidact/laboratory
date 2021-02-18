import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { OPEN_CAGE_DATA_API_KEY } from '../../../secrets';
import '../../../Sass/components/experiments/_sunClock.scss';
import Form from './Form';
import { Transition } from 'react-transition-group';
import { TimelineLite, TweenMax } from 'gsap';

const SunClock = ({ props }) => {
  const dispatch = useDispatch();
  const { lat, lng, showForm } = useSelector(state => state.sunClock);
  const formRef = useRef(null);

  const fetchCoords = async query => {
    return await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${OPEN_CAGE_DATA_API_KEY}`
    );
  };

  const fetchSunriseSunsetTimes = async (lat, lng, query) => {
    return await axios.get(
      `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}`
    );
  };

  const to24hr = (time = null) => {
    time = time.split(' ');
    let ampm = time[1];
    let [hr, min, sec] = time[0].split(':').map(item => parseInt(item));
    hr = ampm === 'AM' ? hr - 8 : hr + 12 - 8;
    console.log(hr, min, sec, ampm);
  };

  useEffect(() => {
    fetchCoords('Lagos  ')
      .then(res => {
        console.log('coords', res.data.results);
      })
      .catch(err => {
        console.error(err);
      });

  //   fetchSunriseSunsetTimes(
  //     -2.632153,
  //     40.198174,
  //     'moscow illinois united states'
  //   ).then(res => {
  //     console.log(res);
  //   });
  }, []);

  return (
    <div id='sun-clock'>

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
