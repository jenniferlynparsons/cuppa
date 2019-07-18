export const convertTimeToMinSec = milliseconds => {
  let minute, seconds;
  seconds = Math.floor(milliseconds / 1000);
  minute = Math.floor(seconds / 60);
  seconds = minute % 60;
  minute = (minute - (minute % 60)) / 60;
  return {
    minute: seconds == 60 ? minute + 1 + ":00" : minute,
    seconds: (seconds < 10 ? "0" : "") + seconds
  };
};

export const convertTimeToMill = (min, sec) => {
  return min * (60000 * 60) + sec * 60000;
};
