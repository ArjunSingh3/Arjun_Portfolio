import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import endpoints from '../constants/endpoints';
import Social from './Social';
import FallbackSpinner from './FallbackSpinner';

const Wrap = styled(motion.div)`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 90px 24px 60px;
`;

const Eyebrow = styled(motion.p)`
  font-size: 0.82rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.accentColor};
  font-weight: 700;
  margin: 0 0 18px;
`;

const Name = styled(motion.h1)`
  font-size: clamp(2.4rem, 8vw, 4.8rem);
  line-height: 1.05;
  font-weight: 600;
  background: ${({ theme }) => theme.accentGradient};
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin: 0 0 20px;
`;

const RoleRow = styled(motion.div)`
  font-size: clamp(1.15rem, 3.2vw, 1.7rem);
  color: ${({ theme }) => theme.secondaryText};
  font-weight: 500;
  min-height: 2.4em;
  font-family: ${({ theme }) => theme.fontHeading};

  .Typewriter__wrapper {
    color: ${({ theme }) => theme.color};
    font-weight: 600;
  }

  .Typewriter__cursor {
    color: ${({ theme }) => theme.accentColor};
  }
`;

const ButtonRow = styled(motion.div)`
  display: flex;
  gap: 14px;
  margin-top: 36px;
  flex-wrap: wrap;
  justify-content: center;
`;

const buttonBase = `
  padding: 13px 30px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  transition: transform 0.2s ease, filter 0.2s ease, background 0.2s ease;
`;

const PrimaryButton = styled(Link)`
  ${buttonBase}
  color: #fff;
  background: ${({ theme }) => theme.accentGradient};
  box-shadow: 0 10px 28px ${({ theme }) => theme.shadowColor};

  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.06);
  }
`;

const SecondaryButton = styled(Link)`
  ${buttonBase}
  color: ${({ theme }) => theme.color};
  border: 1px solid ${({ theme }) => theme.cardBorderColor};
  background: ${({ theme }) => theme.cardBackground};
  backdrop-filter: blur(${({ theme }) => theme.glassBlur});

  &:hover {
    transform: translateY(-2px);
    background: ${({ theme }) => theme.cardBackgroundHover};
  }
`;

const SocialWrap = styled(motion.div)`
  margin-top: 42px;
`;

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.home, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  if (!data) return <FallbackSpinner />;

  return (
    <Wrap variants={containerVariants} initial="hidden" animate="show">
      <Eyebrow variants={itemVariants}>Hello, I&apos;m</Eyebrow>
      <Name variants={itemVariants}>{data.name}</Name>
      <RoleRow variants={itemVariants}>
        <Typewriter
          options={{
            loop: true,
            autoStart: true,
            strings: data.roles,
          }}
        />
      </RoleRow>
      <ButtonRow variants={itemVariants}>
        <PrimaryButton to="/projects">View my work</PrimaryButton>
        <SecondaryButton to="/about">About me</SecondaryButton>
      </ButtonRow>
      <SocialWrap variants={itemVariants}>
        <Social />
      </SocialWrap>
    </Wrap>
  );
}

export default Home;
