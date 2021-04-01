/**
 *
 * Timer
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import T from '@components/T';
import { colors, fonts } from '@themes';

const Resend = styled(T)`
  color: ${colors.primary};
  ${fonts.weights.bold()};
  ${fonts.size.xSmall()};
  line-height: 1.5;
  letter-spacing: 1.2px;
  margin: 0;
  opacity: ${props => (props.disable ? 0.5 : 1)};
  &:hover {
    cursor: ${props => (props.disable ? 'not-allowed' : 'pointer')};
  }
`;
const Clock = styled.p`
  color: ${colors.secondary};
  ${fonts.weights.bold()};
  ${fonts.size.xSmall()};
  line-height: 1.5;
  letter-spacing: 1.2px;
  opacity: 0.5;
  margin: 0;
`;

function Timer({ initialMinute, initialSeconds, retryNo, resendCallback }) {
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [retry, setRetry] = useState(retryNo);

  async function resendHandler() {
    if (retry > 0) {
      try {
        await resendCallback();
        setRetry(n => n - 1);
        setMinutes(initialMinute);
        setSeconds(initialSeconds);
      } catch (e) {}
    }
  }

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(timerInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(timerInterval);
    };
  });

  return (
    <div data-testid="timer">
      {minutes === 0 && seconds === 0 ? (
        <Resend id="resend" type="subText" onClick={resendHandler} disable={retry <= 0} />
      ) : (
        <Clock>
          {' '}
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </Clock>
      )}
    </div>
  );
}

Timer.propTypes = {
  initialMinute: PropTypes.number,
  initialSeconds: PropTypes.number,
  retryNo: PropTypes.number,
  resendCallback: PropTypes.func
};

Timer.defaultProps = {
  initialMinute: 0,
  initialSeconds: 0,
  retryNo: 0,
  resendCallback: () => {}
};

const TimerComponent = Timer;
export default TimerComponent;
