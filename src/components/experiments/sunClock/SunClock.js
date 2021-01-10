import React, { useRef, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setSunriseSunsetTimes } from "../../../state/actions/index";
import { GOOGLE_TIME_API_KEY } from "../../../secrets";

const SunClock = ({ sunrise, sunset, dispatch, ...props }) => {
  const fetchSunriseSunsetTimes = async (lat, lng) => {
    let params1 = new URLSearchParams([
      ["lat", lat],
      ["lng", lng],
    ]);
    let params2 = new URLSearchParams([
      ["lat", lat],
      ["lng", lng],
      ["key", GOOGLE_TIME_API_KEY],
    ]);
    try {
      // let response = await axios.get(`https://api.sunrise-sunset.org/json`, {
      //   params1,
      // });
      let offset = await axios.get(
        `https://maps.googleapis.com/maps/api/timezone/json`,
        { params:params2 }
      );

      console.log(offset);

      // let { sunrise, sunset } = response.data.results;
      // sunrise = to24hr(sunrise);
      // sunset = to24hr(sunset);
      // console.log(response.data.results);
      // dispatch(setSunriseSunsetTimes({ sunrise, sunset }));
    } catch (error) {}
  };

  const to24hr = (time = null) => {
    time = time.split(" ");
    let ampm = time[1];
    let [hr, min, sec] = time[0].split(":").map((item) => parseInt(item));
    hr = ampm === "AM" ? hr - 8 : hr + 12 - 8;
    console.log(hr, min, sec, ampm);
  };

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let animationFrameId;

    fetchSunriseSunsetTimes(45.523064, -122.676483);

    canvas.width = window.innerWidth * 0.75;
    canvas.height = window.innerHeight * 0.75;

    const render = () => {
      context.fillStyle = "#3a3a3a";
      context.fillRect(0, 0, canvas.width, canvas.height);

      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => window.cancelAnimationFrame(animationFrameId);
  }, []);

  return <canvas ref={canvasRef} {...props} />;
};

const mapStateToProps = (state) => {
  return { sunrise: state.sunrise, sunset: state.sunset };
};

export default connect(mapStateToProps)(SunClock);
