import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Wrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 84px 20px 8px;
  text-align: center;
`;

const Title = styled(motion.h1)`
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 600;
  background: ${({ theme }) => theme.accentGradient};
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const Rule = styled(motion.span)`
  display: block;
  width: 56px;
  height: 3px;
  margin-top: 14px;
  border-radius: 999px;
  background: ${({ theme }) => theme.accentGradient};
  transform-origin: center;
`;

function Header(props) {
  const { title } = props;
  return (
    <Wrap>
      <Title
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {title}
      </Title>
      <Rule
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      />
    </Wrap>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
