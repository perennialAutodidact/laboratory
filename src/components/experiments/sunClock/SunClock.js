import React, { useEffect } from "react";
import axios from 'axios';
import {setSunriseSunsetTimes} from '../../../state/actions/index'

const SunClock = () => {

  useEffect(() => {
    const fetchSunriseSunsetTimes = async () => {
      try {
        let response = await axios.get('https://api.sunrise-sunset.org/json?lat=45.523064&lng=-122.676483')

        console.log(response);
      } catch (error) {
        console.log(error);
      }
      
      
    }
    fetchSunriseSunsetTimes();
  }, [])

  return (
    <div id="sunClock">
      <div id="face">

      </div>
    </div>
  )
}


export default SunClock

// const SunClock = ({ props }) => {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const context = canvas.getContext("2d");
//     let animationFrameId;

//     canvas.width = window.innerWidth * .75;
//     canvas.height = window.innerHeight * .75;

//     const render = () => {
//       context.fillStyle = '#3a3a3a';
//       context.fillRect(0, 0, canvas.width, canvas.height);

//       animationFrameId = window.requestAnimationFrame(render);
//     };
//     render();

//     return () =>  window.cancelAnimationFrame(animationFrameId);

//   }, []);

//   return <canvas ref={canvasRef} {...props} />;
// };

// export default SunClock;

