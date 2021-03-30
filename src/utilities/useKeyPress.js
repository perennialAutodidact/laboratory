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

        // the slightest of delays to keep selected option
        // from jumping more than one position while keyPress is true
        setTimeout(1, setKeyPressed(false));
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
