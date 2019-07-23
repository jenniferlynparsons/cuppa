export const convertTimeToMinSec = milliseconds => {
  console.log(`milliseconds: ${milliseconds}`);
  let minute, seconds;
  seconds = Math.floor(milliseconds / 1000);
  minute = Math.floor(seconds / 60);
  seconds = minute % 60;
  console.log(`seconds: ${seconds}`);
  minute = (minute - (minute % 60)) / 60;
  console.log(`minute: ${minute}`);
  return {
    minute: seconds == 60 ? minute + 1 + ":00" : minute,
    seconds: (seconds < 10 ? "0" : "") + seconds
  };
};

export const convertTimeToMill = (min, sec) => {
  return min * (60000 * 60) + sec * 60000;
};
