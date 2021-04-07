import React, {useEffect} from "react";
import { useDispatch, useSelector} from "react-redux";
import {
  resetScore,
  increaseScore,
  decreaseScore,
} from "../../state/slices/crushCloneSlice";

import Board from './Board'

const CrushClone = () => {
  const dispatch = useDispatch();
  const {score, increaseScore} = useSelector(state=>state.crushClone)

  useEffect(() => {
    console.log('loaded');

    setTimeout(increaseScore, 1000)
  },[])

  return <div id='crush-clone'>
    score {score} 
    <Board/>
  </div>;
};

export default CrushClone;
