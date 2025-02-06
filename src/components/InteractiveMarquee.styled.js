import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';

export const MarqueeContainer = styled.div`
  width: 100%;
  height: 100vh;
  padding: 120px 64px;

  display: flex;
  flex-direction: column;
  gap: 48px;
`;

export const MarqueeHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 48px;

  .title {
    font-size: 48px;
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.02em;
    white-space: nowrap;

    span {
      color: #ffc700;
    }
  }
`;

export const PlayPauseButton = styled.button`
  width: fit-content;
  height: fit-content;

  display: flex;
  justify-content: center;
  align-items: center;

  &:active {
    transform: scale(0.9) translateY(1px);
  }

  transition: transform 0.1s ease-out;
`;

export const Marquee = styled(motion.div)`
  width: 100%;
  height: fit-content;

  display: flex;
  align-items: center;
  /* gap: 48px; */

  overflow-x: hidden;

  cursor: -webkit-grab;

  ${({ $isRunning }) =>
    !$isRunning &&
    css`
      cursor: default;
    `}
`;
