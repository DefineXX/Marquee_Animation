import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';

export const MarqueeHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 48px;
`;

export const PlayPauseButton = styled.button`
  width: fit-content;
  height: fit-content;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Marquee = styled(motion.div)`
  display: flex;
  height: fit-content;
  align-items: center;

  cursor: -webkit-grab;
  overflow: hidden;

  ${({ $isRunning }) =>
    !$isRunning &&
    css`
      cursor: auto;
    `}
`;
