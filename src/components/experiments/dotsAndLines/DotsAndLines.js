import React, { useRef, useEffect } from "react";

import Dot from "./Dot";

const Canvas = ({ bgColor, ...props }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let animationFrameId;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const dots = [];
    const distThreshold = 300;
    for (let i = 0; i < 50; i++) {
      let x = Math.random() * canvas.width;
      let y = Math.random() * canvas.height;
      let dot = new Dot(context, x, y, 2);
      dots.push(dot);
    }

    const render = () => {
      context.fillStyle = "#000000";
      context.fillRect(0, 0, canvas.width, canvas.height);

      // cycle through each dot
      // draw lines if they're
      // within a certain radius

      dots.forEach((dot) => {
        let neighbors = dots
          .map((otherDot) => {
            let dist = Math.sqrt(
              (dot.x - otherDot.x) ** 2 + (dot.y - otherDot.y) ** 2
            );
            if (otherDot !== dot && dist < distThreshold) {
              let opacity = 1 - dist / distThreshold;
              return { ...otherDot, opacity };
            }
            return null;
          })
          .filter((neighbor) => neighbor !== null);

        dot.update();
        dot.drawLines(neighbors);
        dot.draw();
      });

      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} {...props} />;
};

export default Canvas;
