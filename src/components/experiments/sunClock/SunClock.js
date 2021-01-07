import React, { useRef, useEffect } from "react";
import axios from 'axios'

const SunClock = ({ props }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let animationFrameId;

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

export default SunClock;

