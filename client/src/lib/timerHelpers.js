export const convertTimeToMinSec = totalSeconds => {
  const minute = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return {
    minute: (minute < 10 ? "0" : "") + minute,
    seconds: (seconds < 10 ? "0" : "") + seconds
  };
};

export const convertTimeToSec = (min, sec) => {
  return min * 60 + sec;
};

const timerHelpers = {
  convertTimeToMinSec,
  convertTimeToSec
};

export default timerHelpers;
