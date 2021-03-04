import { useEffect, useState } from "react";

const useKeyPress = (targetKey) => {
  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {
    const upHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(false);
      }
    };

    const downHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(true);
      }
    };

    
    window.addEventListener("keyup", upHandler);
    window.addEventListener("keydown", downHandler);

    return () => {
      window.removeEventListener("keyup", upHandler);
      window.removeEventListener("keydown", downHandler);
    };
  });

  return keyPressed;
};

export default useKeyPress;
