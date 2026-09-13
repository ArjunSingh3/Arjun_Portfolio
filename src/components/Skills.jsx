import React, { useEffect, useState } from 'react';
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
  padding: 10px 24px 110px;
`;

const Inner = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.maxContentWidth};
`;

const Intro = styled.div`
  text-align: center;
  max-width: 620px;
  margin: 0 auto 56px;
  color: ${({ theme }) => theme.secondaryText};
  font-size: 1.05rem;
  line-height: 1.7;

  p {
    margin: 0 0 8px;
  }
`;

const Category = styled.div`
  margin-bottom: 44px;
`;

const CategoryTitle = styled.h3`
  font-size: 1.05rem;
  font-weight: 600;
  color: ${({ theme }) => theme.color};
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 14px;

  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${({ theme }) => theme.cardBorderColor};
  }
`;

const ChipGrid = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const Chip = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 16px 9px 9px;
  border-radius: 999px;
  background: ${({ theme }) => theme.cardBackground};
  border: 1px solid ${({ theme }) => theme.cardBorderColor};
  backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    background: ${({ theme }) => theme.cardBackgroundHover};
    border-color: ${({ theme }) => theme.accentColor};
  }
`;

const ChipIcon = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
  border-radius: 4px;
`;

const ChipLabel = styled.span`
  font-size: 0.88rem;
  font-weight: 500;
  color: ${({ theme }) => theme.color};
  white-space: nowrap;
`;

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.035 } },
};

const chipVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.94 },
  show: {
    opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
};

function Skills(props) {
  const { header } = props;
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.skills, {
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
          <Inner>
            <Intro>
              <ReactMarkdown>{data.intro}</ReactMarkdown>
            </Intro>
            {data.skills?.map((rows) => (
              <Category key={rows.title}>
                <CategoryTitle>{rows.title}</CategoryTitle>
                <ChipGrid
                  variants={gridVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-40px' }}
                >
                  {rows.items.map((item) => (
                    <Chip key={item.title} variants={chipVariants}>
                      <ChipIcon src={item.icon} alt={item.title} />
                      <ChipLabel>{item.title}</ChipLabel>
                    </Chip>
                  ))}
                </ChipGrid>
              </Category>
            ))}
          </Inner>
        ) : <FallbackSpinner />}
      </Section>
    </>
  );
}

Skills.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Skills;
