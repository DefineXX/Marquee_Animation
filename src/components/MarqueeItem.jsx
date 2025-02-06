import { useEffect, useRef } from 'react';
import { useRafLoop } from 'react-use';
import { useWindowSize } from '@react-hook/window-size';
import PropTypes from 'prop-types';

const MarqueeItem = ({ content, speed, isRunning }) => {
  const item = useRef(null);
  const rect = useRef({}); // DOM 요소의 크기와 위치를 저장하는 객체
  const x = useRef(0);
  const buffer = useRef(0);

  // 뷰포트의 너비와 높이 계산 Hook
  const [width, height] = useWindowSize();

  useEffect(() => {
    rect.current = item.current.getBoundingClientRect(); // MarqueeItem 요소의 크기와 위치를 가져옴 (width와 height를 사용)
  }, [width, height]);

  const setX = () => {
    if (!item.current || !rect.current) return;

    const xPercentage = (x.current / rect.current.width) * 100;

    // x의 절댓값이 MarqueeItem의 너비를 초과할 때, x.currrent를 0으로 설정 (무한 반복을 위함)
    if (xPercentage < -100) x.current = 0;

    // x의 값이 양수일 때, x.current를 -rect.current.width로 설정 (무한 반복을 위함)
    if (xPercentage > 0) x.current = -rect.current.width;

    item.current.style.transform = `translate(${xPercentage}%, 0)`;
  };

  const loop = (e) => {
    // x.current -= speed.get();
    // setX();

    if (!isRunning) return;

    const delta = (e - buffer.current) / 1000;
    const c = Math.max(1 / 60 / delta, 1);
    buffer.current = e;
    x.current -= speed.get() / c;
    setX();
  };

  useRafLoop(loop, true);

  return (
    <div className="item" ref={item}>
      {content}
    </div>
  );
};

MarqueeItem.propTypes = {
  content: PropTypes.element.isRequired,
  speed: PropTypes.object.isRequired,
  isRunning: PropTypes.bool.isRequired,
};

export default MarqueeItem;
