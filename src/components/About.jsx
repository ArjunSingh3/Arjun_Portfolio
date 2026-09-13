import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

const Section = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px 24px 110px;
`;

const Grid = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.maxContentWidth};
  display: grid;
  grid-template-columns: 1fr;
  gap: 48px;
  align-items: center;

  @media (min-width: 860px) {
    grid-template-columns: 0.85fr 1.15fr;
    gap: 64px;
  }
`;

const ImageCol = styled(motion.div)`
  display: flex;
  justify-content: center;
`;

const PortraitFrame = styled(motion.div)`
  position: relative;
  width: min(300px, 70vw);
  border-radius: ${({ theme }) => theme.radiusLg};
  padding: 6px;
  background: ${({ theme }) => theme.accentGradient};
  box-shadow: 0 20px 50px ${({ theme }) => theme.shadowColor};
`;

const Portrait = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  border-radius: calc(${({ theme }) => theme.radiusLg} - 5px);
  object-fit: cover;
  aspect-ratio: 3 / 4;
  background: ${({ theme }) => theme.backgroundElevated};
`;

const TextCol = styled(motion.div)`
  text-align: left;
  font-size: 1.05rem;

  p {
    margin: 0 0 18px;
    color: ${({ theme }) => theme.secondaryText};
  }

  strong {
    color: ${({ theme }) => theme.accentColor};
    font-weight: 700;
  }
`;

function About(props) {
  const { header } = props;
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.about, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <>
      <Header title={header} />
      <Section>
        {data ? (
          <Grid>
            <ImageCol
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <PortraitFrame whileHover={{ rotate: -1, scale: 1.015 }}>
                <Portrait src={data.imageSource} alt="Profile portrait" />
              </PortraitFrame>
            </ImageCol>
            <TextCol
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <ReactMarkdown>{data.about}</ReactMarkdown>
            </TextCol>
          </Grid>
        ) : <FallbackSpinner />}
      </Section>
    </>
  );
}

About.propTypes = {
  header: PropTypes.string.isRequired,
};

export default About;
