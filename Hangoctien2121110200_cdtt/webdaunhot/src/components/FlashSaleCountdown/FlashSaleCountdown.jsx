import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';

const CountdownContainer = styled.div`
  display: flex;
  color: #fff;
  padding: 10px;
`;

const FlashSaleCountdownItem = styled(animated.div)`
  margin-right: 10px;
  background-color: #000;
  border-radius: 5px;
  padding: 2px;
  font-size: 25px;
`;

const FlashSaleCountdown = ({ saleEndTime }) => {
  const [countdown, setCountdown] = useState(getTimeRemaining());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown(getTimeRemaining());
    }, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  function getTimeRemaining() {
    const now = new Date().getTime();
    const endTime = new Date(saleEndTime).getTime();
    const timeRemaining = endTime - now;

    if (timeRemaining <= 0) {
      // Handle case when sale has ended
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }

  // Hàm này thêm số 0 vào trước nếu giá trị là một chữ số
  const formatTime = (time) => (time < 10 ? `0${time}` : time);

  // Sử dụng useSpring để tạo hiệu ứng trượt lên cho mỗi item
  const animatedStylesHours = useSpring({ opacity: 1, transform: 'translateY(0)', from: { opacity: 0, transform: 'translateY(20px)' } });
  const animatedStylesMinutes = useSpring({ opacity: 1, transform: 'translateY(0)', from: { opacity: 0, transform: 'translateY(20px)' } });
  const animatedStylesSeconds = useSpring({ opacity: 1, transform: 'translateY(0)', from: { opacity: 0, transform: 'translateY(20px)' } });

  return (
    <CountdownContainer>
      <FlashSaleCountdownItem style={animatedStylesHours}>{formatTime(countdown.hours)}</FlashSaleCountdownItem>
      <FlashSaleCountdownItem style={animatedStylesMinutes}>{formatTime(countdown.minutes)}</FlashSaleCountdownItem>
      <FlashSaleCountdownItem style={animatedStylesSeconds}>{formatTime(countdown.seconds)}</FlashSaleCountdownItem>
    </CountdownContainer>
  );
};

export default FlashSaleCountdown;
