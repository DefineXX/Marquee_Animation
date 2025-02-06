import { useRef, useState } from 'react';
import { useSpring, useTransform, motion } from 'framer-motion';
import normalizeWheel from 'normalize-wheel';
import { useRafLoop } from 'react-use';

import { PlayPauseIcon } from '../icons/PlayPause';

import MarqueeItem from './MarqueeItem';
import MemberCard from './MemberCard/MemberCard';

import * as S from './InteractiveMarquee.styled';

const _ = {
  content: <MemberCard />,
  speed: 2,
  threshold: 0.014,
  wheelFactor: 1.8,
  dragFactor: 1.2,
};

const InteractiveMarquee = () => {
  const [isRunning, setIsRunning] = useState(false);

  const marquee = useRef(null);
  const slowDown = useRef(false);
  const isScrolling = useRef(false); // 스크롤 중인지를 추적하는 변수

  const x = useRef(0);
  const w = useRef(window.innerWidth).current;

  const handlePlayPause = () => setIsRunning(!isRunning);

  // speed, opacity, skewX (Framer Motion Properties)
  const speed = useSpring(_.speed, {
    damping: 40,
    stiffness: 90,
    mass: 5,
  });
  const opacity = useTransform(speed, [-w * 0.25, 0, w * 0.25], [1, 0, 1]);
  const skewX = useTransform(speed, [-w * 0.25, 0, w * 0.25], [-10, 0, 10]);

  // 스크롤을 했을 경우 속도를 조절하는 함수
  const onWheel = (e) => {
    const normalized = normalizeWheel(e);
    console.log(normalized);

    x.current = normalized.pixelY * _.wheelFactor;

    // Reset speed on scroll end
    window.clearTimeout(isScrolling.current);
    isScrolling.current = setTimeout(() => {
      speed.set(_.speed);
    }, 30);
  };

  // 드래그를 했을 경우 속도를 조절하는 함수
  const onDragStart = () => {
    if (!isRunning) return;

    slowDown.current = true;
    marquee.current.classList.add('drag');
    speed.set(0);
  };

  const onDrag = (e, info) => {
    if (!isRunning) return;

    speed.set(_.dragFactor * -info.delta.x);
  };

  const onDragEnd = () => {
    if (!isRunning) return;
    
    slowDown.current = false;
    marquee.current.classList.remove('drag');
    x.current = _.speed;
  };

  // loop 함수
  const loop = () => {
    if (slowDown.current || !isRunning || Math.abs(x.current) < _.threshold)
      return;

    x.current *= 0.66;

    if (x.current < 0) {
      x.current = Math.min(x.current, 0);
    } else {
      x.current = Math.max(x.current, 0);
    }

    speed.set(_.speed + x.current);
  };

  useRafLoop(loop, true);

  return (
    <>
      <motion.div className="bg" style={{ opacity }} />
      <div className="marquee-container">
        <S.MarqueeHeader>
          <h2 className="title">
            Participants <span>.</span>
          </h2>
          <S.PlayPauseButton onClick={handlePlayPause}>
            <PlayPauseIcon />
          </S.PlayPauseButton>
        </S.MarqueeHeader>

        <S.Marquee
          ref={marquee}
          style={{ skewX }}
          onWheel={onWheel}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragStart={onDragStart}
          onDrag={onDrag}
          onDragEnd={onDragEnd}
          dragElastic={0.01} // needs to be > 0 ¯\_(ツ)_/¯
          $isRunning={isRunning}
        >
          <MarqueeItem
            content={_.content}
            speed={speed}
            isRunning={isRunning}
          />
          <MarqueeItem
            content={_.content}
            speed={speed}
            isRunning={isRunning}
          />
        </S.Marquee>
      </div>
    </>
  );
};

export default InteractiveMarquee;
