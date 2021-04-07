/**
Returns an array of numbers from start to stop-1

start defaults to 0

step defaults to 1

 * @param {number} stop - range goes from start to stop-1
 * @param {number} start - Default: 0 - starting number of range
 * @param {number} step - Default: 1 - interval between range numbers
 */
const range = (stop, start = 0, step = 1) => {
  // switch start and stop values if start is provided
  if (start) {
      let tmp = start;
      start = stop;
      stop = tmp;
  }
  try {

      if(stop < start && step > 0){
          throw `ERROR: step (${step}) must be positive to count up from ${start} to ${stop}`
      } else if(start > stop && step < 0) {
          throw `ERROR: step (${step}) must be negative to count down from ${start} to ${stop}`
      }
  } catch(error) { 
      console.error(error)
  }


  let nums = [];
  let i = start;
  
  if(start > stop) {
      while(i > stop){
          nums.push(i);
          i += step;
      }  
  } else {
      while(i < stop){
          nums.push(i);
          i += step;
      }
  }

  return nums
}

export default range;
