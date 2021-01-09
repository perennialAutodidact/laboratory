import React, { useRef, useEffect } from "react";
import axios from 'axios';
import {connect} from 'react-redux';
import {setSunriseSunsetTimes} from '../../../state/actions/index'

const SunClock = ({dispatch, ...props}) => {
  const fetchSunriseSunsetTimes = async () => {
    try {
      let response = await axios.get('https://api.sunrise-sunset.org/json?lat=45.523064&lng=-122.676483')

      let {sunrise, sunset} = response.data.results;
      console.log(sunrise,sunset);
      dispatch(setSunriseSunsetTimes({sunrise,sunset}))
    } catch (error) {
    }
  }

  const to24hr = (time) => {
    console.log(time);
  }

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let animationFrameId;

    fetchSunriseSunsetTimes();

    canvas.width = window.innerWidth * .75;
    canvas.height = window.innerHeight * .75;

    const render = () => {
      context.fillStyle = '#3a3a3a';
      context.fillRect(0, 0, canvas.width, canvas.height);

      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () =>  window.cancelAnimationFrame(animationFrameId);

  }, []);

  return <canvas ref={canvasRef} {...props} />;
};

const mapStateToProps = (state) => {
  return {sunrise: state.sunrise, sunset: state.sunset}
}

export default connect(mapStateToProps)(SunClock);

