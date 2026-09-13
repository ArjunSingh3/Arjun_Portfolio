import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import AppContext from '../AppContext';

const Track = styled.button`
  position: relative;
  width: 56px;
  height: 30px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.navBorder};
  background: ${({ theme }) => (theme.mode === 'dusk'
    ? 'linear-gradient(90deg, #241f33, #3a2c44)'
    : 'linear-gradient(90deg, #ffd9ad, #ffb787)')};
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;
  transition: background 0.4s ease;

  &:hover {
    filter: brightness(1.08);
  }
`;

const Knob = styled(motion.span)`
  position: absolute;
  top: 3px;
  left: 3px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: ${({ theme }) => (theme.mode === 'dusk' ? '#f4ece2' : '#2c2130')};
  color: ${({ theme }) => (theme.mode === 'dusk' ? '#2c2130' : '#f4ece2')};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
`;

function SunIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
      <circle cx="12" cy="12" r="4.2" />
      <line x1="12" y1="1.5" x2="12" y2="4.5" />
      <line x1="12" y1="19.5" x2="12" y2="22.5" />
      <line x1="1.5" y1="12" x2="4.5" y2="12" />
      <line x1="19.5" y1="12" x2="22.5" y2="12" />
      <line x1="4.4" y1="4.4" x2="6.5" y2="6.5" />
      <line x1="17.5" y1="17.5" x2="19.6" y2="19.6" />
      <line x1="4.4" y1="19.6" x2="6.5" y2="17.5" />
      <line x1="17.5" y1="6.5" x2="19.6" y2="4.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" />
    </svg>
  );
}

function ThemeToggler(props) {
  const { onClick } = props;
  const { sunset } = useContext(AppContext);

  const handleClick = () => {
    sunset.toggle();
    onClick();
  };

  return (
    <Track
      type="button"
      onClick={handleClick}
      aria-label={sunset.isDusk ? 'Switch to dawn (light) mode' : 'Switch to dusk (dark) mode'}
      aria-pressed={sunset.isDusk}
    >
      <Knob
        animate={{ x: sunset.isDusk ? 0 : 26 }}
        transition={{ type: 'spring', stiffness: 500, damping: 32 }}
      >
        {sunset.isDusk ? <MoonIcon /> : <SunIcon />}
      </Knob>
    </Track>
  );
}

ThemeToggler.propTypes = {
  onClick: PropTypes.func,
};
ThemeToggler.defaultProps = {
  onClick: () => {},
};

export default ThemeToggler;
