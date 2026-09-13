import React from 'react';
import styled, { keyframes } from 'styled-components';

const drift = keyframes`
  0% { transform: translate3d(-2%, -1%, 0) scale(1); }
  50% { transform: translate3d(2%, 2%, 0) scale(1.06); }
  100% { transform: translate3d(-2%, -1%, 0) scale(1); }
`;

const drift2 = keyframes`
  0% { transform: translate3d(1%, 2%, 0) scale(1.02); }
  50% { transform: translate3d(-3%, -1%, 0) scale(1); }
  100% { transform: translate3d(1%, 2%, 0) scale(1.02); }
`;

const rise = keyframes`
  0% { opacity: 0; transform: translateY(6%) scale(0.94); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
`;

const Stage = styled.div`
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.skyTop} 0%,
    ${({ theme }) => theme.skyMid} 55%,
    ${({ theme }) => theme.horizon} 100%
  );
  transition: background 0.8s ease;
`;

const Sun = styled.div`
  position: absolute;
  left: 50%;
  top: 38%;
  width: min(70vw, 900px);
  height: min(70vw, 900px);
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: radial-gradient(
    circle,
    ${({ theme }) => theme.skyGlowA} 0%,
    ${({ theme }) => theme.skyGlowB} 35%,
    transparent 70%
  );
  opacity: 0.55;
  filter: blur(10px);
  animation: ${rise} 1.4s ease-out both, ${drift} 22s ease-in-out infinite 1.4s;
`;

const GlowB = styled.div`
  position: absolute;
  right: -10%;
  top: 10%;
  width: min(55vw, 700px);
  height: min(55vw, 700px);
  border-radius: 50%;
  background: radial-gradient(circle, ${({ theme }) => theme.skyGlowC} 0%, transparent 70%);
  opacity: 0.35;
  filter: blur(20px);
  animation: ${drift2} 28s ease-in-out infinite;
`;

const GlowC = styled.div`
  position: absolute;
  left: -15%;
  bottom: -10%;
  width: min(60vw, 760px);
  height: min(60vw, 760px);
  border-radius: 50%;
  background: radial-gradient(circle, ${({ theme }) => theme.skyGlowB} 0%, transparent 70%);
  opacity: 0.28;
  filter: blur(24px);
  animation: ${drift} 34s ease-in-out infinite 2s;
`;

const Grain = styled.div`
  position: absolute;
  inset: 0;
  opacity: ${({ theme }) => (theme.mode === 'dusk' ? 0.05 : 0.035)};
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
`;

const Vignette = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at 50% 40%,
    transparent 40%,
    ${({ theme }) => theme.background} 100%
  );
  opacity: ${({ theme }) => (theme.mode === 'dusk' ? 0.75 : 0.55)};
`;

function SunsetBackground() {
  return (
    <Stage aria-hidden="true">
      <Sun />
      <GlowB />
      <GlowC />
      <Grain />
      <Vignette />
    </Stage>
  );
}

export default SunsetBackground;
