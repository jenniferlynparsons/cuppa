import React from "react";
import TimerContainer from "../../src/components/Timer";

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

export const timerRender = props => {
  if (props.timerID) {
    return (
      <TimerContainer
        timerID={props.timerID}
        handleCloseTimer={props.handleCloseTimer}
      />
    );
  }
  return <div />;
};

const timerHelpers = {
  convertTimeToMinSec,
  convertTimeToSec,
  timerRender
};

export default timerHelpers;
