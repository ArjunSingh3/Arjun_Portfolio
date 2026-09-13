import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.4; transform: scale(0.9); }
  50% { opacity: 1; transform: scale(1); }
`;

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: 40vh;
  width: 100%;
`;

const Ring = styled.div`
  position: relative;
  width: 46px;
  height: 46px;
`;

const Arc = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: ${({ theme }) => theme.accentColor};
  border-right-color: ${({ theme }) => theme.accentColorAlt};
  animation: ${spin} 0.9s linear infinite;
`;

const Core = styled.div`
  position: absolute;
  inset: 14px;
  border-radius: 50%;
  background: ${({ theme }) => theme.accentGradient};
  animation: ${pulse} 1.6s ease-in-out infinite;
`;

function FallbackSpinner() {
  return (
    <Wrap>
      <Ring>
        <Arc />
        <Core />
      </Ring>
    </Wrap>
  );
}

export default FallbackSpinner;
