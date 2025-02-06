import { useEffect, useRef } from 'react';
import { useRafLoop } from 'react-use';
import { useWindowSize } from '@react-hook/window-size';
import PropTypes from 'prop-types';

import * as S from './MarqueeItem.styled';

const MarqueeItem = ({ content, speed, isRunning }) => {
  const item = useRef(null);
  const rect = useRef({}); // DOM 요소의 크기와 위치를 저장하는 객체
  const x = useRef(0);
  // const buffer = useRef(0);

  // 뷰포트의 너비와 높이 계산 Hook
  const [width, height] = useWindowSize();

  useEffect(() => {
    if (!item.current) return;

    rect.current = item.current.getBoundingClientRect(); // MarqueeItem 요소의 크기와 위치를 가져옴 (width와 height를 사용)
    console.log(rect.current);
  }, [width, height]);

  const setX = () => {
    if (!item.current || !rect.current) return;

    const xPercentage = (x.current / rect.current.width) * 100;

    // x의 절댓값이 MarqueeItem의 너비를 초과할 때, x.currrent를 0으로 설정 (무한 반복을 위함)
    if (xPercentage < -100) x.current += rect.current.width; // 전체 너비만큼 x값을 이동
    if (xPercentage > 0) x.current -= rect.current.width; // 전체 너비만큼 x값을 이동

    item.current.style.transform = `translate3d(${xPercentage}%, 0, 0)`;
  };

  const loop = () => {
    if (!isRunning) return;

    x.current -= speed.get();
    setX();

    // if (!isRunning) return;

    // const delta = (e - buffer.current) / 1000;
    // const c = Math.max(1 / 60 / delta, 1);
    // buffer.current = e;

    // x.current -= speed.get() / c;
    // setX();
  };

  useRafLoop(loop, true);

  return (
    // <li ref={item}>{content}</li>
    <S.MarqueeItemContainer ref={item}>
      {Array.from({ length: 5 }).map((_, index) => (
        <li key={index}>{content}</li>
      ))}
    </S.MarqueeItemContainer>
  );
};

MarqueeItem.propTypes = {
  content: PropTypes.element.isRequired,
  speed: PropTypes.object.isRequired,
  isRunning: PropTypes.bool.isRequired,
};

export default MarqueeItem;
