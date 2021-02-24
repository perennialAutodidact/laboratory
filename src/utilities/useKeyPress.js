import React, {useEffect, useState} from 'react';

const useKeyPress = (targetKey) => {

  const [keyPressed, setKeyPressed] = useState(false);

  const upHandler = ({key}) => {
    
    if(key === targetKey){
      setKeyPressed(false);
    }
  }
  
  const downHandler = ({key}) => {
    console.log(key);
    if(key === targetKey){
      setKeyPressed(true);
    }
  }

  useEffect(() => {
    window.addEventListener('keyup', upHandler);
    window.addEventListener('keydown', downHandler);

    return () => {
      window.removeEventListener('keyup', upHandler);
      window.removeEventListener('keydown', downHandler);
    }
  }, [])

  return keyPressed

}

export default useKeyPress;