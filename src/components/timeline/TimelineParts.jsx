import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

export const TimelineTrack = styled.div`
  position: relative;
  width: 100%;
  max-width: ${({ theme, $wide }) => ($wide ? '920px' : theme.maxContentWidth)};
  margin: 0 auto;
  padding: 4px 0 8px;

  &::before {
    content: '';
    position: absolute;
    top: 4px;
    bottom: 12px;
    left: 19px;
    width: 2px;
    border-radius: 2px;
    background: linear-gradient(
      180deg,
      ${({ theme }) => theme.accentColor},
      ${({ theme }) => theme.accentColorDeep} 70%,
      transparent
    );

    ${({ $center }) => $center
    && `
      @media (min-width: 860px) {
        left: 50%;
        transform: translateX(-50%);
      }
    `}
  }
`;

export const Row = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 40px 1fr;
  column-gap: 22px;
  margin-bottom: 40px;

  ${({ $center }) => $center
    && `
    @media (min-width: 860px) {
      grid-template-columns: 1fr 40px 1fr;
      column-gap: 36px;
    }
  `}
`;

export const DotCol = styled.div`
  grid-column: 1;
  position: relative;
  display: flex;
  justify-content: center;
  padding-top: 8px;

  ${({ $center }) => $center
    && `
    @media (min-width: 860px) {
      grid-column: 2;
    }
  `}
`;

const pulseRing = keyframes`
  0% { transform: scale(0.9); opacity: 0.55; }
  70% { transform: scale(2); opacity: 0; }
  100% { transform: scale(2); opacity: 0; }
`;

export const Dot = styled.span`
  position: relative;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ theme, $current }) => ($current ? theme.accentColor : theme.accentColorDeep)};
  box-shadow: 0 0 0 4px ${({ theme }) => theme.background};
  flex-shrink: 0;

  &::after {
    content: '';
    display: ${({ $current }) => ($current ? 'block' : 'none')};
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    border: 2px solid ${({ theme }) => theme.accentColor};
    animation: ${pulseRing} 2.2s ease-out infinite;
  }
`;

export const ContentCol = styled.div`
  grid-column: 2;

  ${({ $center, $side }) => $center
    && `
    @media (min-width: 860px) {
      grid-column: ${$side === 'left' ? '1' : '3'};
    }
  `}
`;

export const Card = styled(motion.div)`
  background: ${({ theme }) => theme.cardBackground};
  border: 1px solid ${({ theme }) => theme.cardBorderColor};
  backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  -webkit-backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  border-radius: ${({ theme }) => theme.radiusMd};
  padding: 22px 24px;
  text-align: left;
  transition: transform 0.25s ease, background 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;

  &:hover {
    transform: translateY(-3px);
    background: ${({ theme }) => theme.cardBackgroundHover};
    border-color: ${({ theme }) => theme.accentColor}55;
    box-shadow: 0 18px 40px ${({ theme }) => theme.shadowColor};
  }
`;

export const DateBadge = styled.span`
  display: inline-block;
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  padding: 4px 13px;
  border-radius: 999px;
  color: #fff;
  background: ${({ theme }) => theme.accentGradient};
  margin-bottom: 12px;
`;

export const cardEnterVariants = {
  hiddenLeft: { opacity: 0, x: -36 },
  hiddenRight: { opacity: 0, x: 36 },
  hiddenUp: { opacity: 0, y: 24 },
  show: {
    opacity: 1, x: 0, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};
