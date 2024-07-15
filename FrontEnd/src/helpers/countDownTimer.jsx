import React, { useState, useEffect } from "react";

const CountDownTimer = ({ expiryDate, onTimerComplete }) => {
  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = new Date(expiryDate) - now;

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = {
        minutes: 0,
        seconds: 0,
      };
      if (onTimerComplete) {
        onTimerComplete();
      }
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      {timeLeft.minutes === 0 && timeLeft.seconds === 0 ? (
        <div>Time expired!</div>
      ) : (
        <div>
          <span>{timeLeft.minutes < 10 ? `0${timeLeft.minutes}` : timeLeft.minutes}:</span>
          <span>{timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}</span>
        </div>
      )}
    </div>
  );
};

export default CountDownTimer;
