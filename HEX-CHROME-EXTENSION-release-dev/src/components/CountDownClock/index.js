import React from "react";
import Countdown, { zeroPad } from "react-countdown";

export const CountDownClock = ({ countDownInMilliSeconds, onComplete }) => {
  const renderer = ({ api, hours, minutes, seconds, completed }) => {
    if (completed) {
      onComplete();
      api.start();
    }

    return (
      <span>
        {zeroPad(minutes)}:{zeroPad(seconds)}
      </span>
    );
  };

  return (
    <Countdown
      date={Date.now() + countDownInMilliSeconds}
      renderer={renderer}
    />
  );
};

export default CountDownClock;
