import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import {
  TimelineTrack, Row, DotCol, Dot, ContentCol, Card, DateBadge, cardEnterVariants,
} from './timeline/TimelineParts';

const Section = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 10px 24px 110px;
`;

const Thumb = styled.img`
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.radiusSm};
  margin-bottom: 14px;
`;

const CardTitle = styled.h3`
  font-size: 1.15rem;
  font-weight: 600;
  margin: 0 0 4px;
  color: ${({ theme }) => theme.color};
`;

const CardSubtitle = styled.p`
  font-size: 0.95rem;
  font-weight: 500;
  color: ${({ theme }) => theme.accentColor};
  margin: 0 0 8px;
`;

const CardDetail = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.secondaryText};
  margin: 0;
`;

const CertLink = styled.a`
  display: inline-block;
  margin-top: 12px;
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ theme }) => theme.accentColor};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

function Education(props) {
  const { header } = props;
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.education, {
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
          <TimelineTrack $center>
            {data.education.map((item, index) => {
              const side = index % 2 === 0 ? 'right' : 'left';
              return (
                <Row key={item.cardTitle + item.title} $center>
                  <DotCol $center>
                    <Dot $current={index === 0} />
                  </DotCol>
                  <ContentCol $center $side={side}>
                    <Card
                      variants={cardEnterVariants}
                      initial={side === 'left' ? 'hiddenLeft' : 'hiddenRight'}
                      whileInView="show"
                      viewport={{ once: true, margin: '-60px' }}
                    >
                      <DateBadge>{item.title}</DateBadge>
                      {item.media?.source?.url && (
                        <Thumb
                          src={item.media.source.url}
                          alt={item.media.name || item.cardTitle}
                        />
                      )}
                      <CardTitle>{item.cardTitle}</CardTitle>
                      {item.cardSubtitle && <CardSubtitle>{item.cardSubtitle}</CardSubtitle>}
                      {item.cardDetailedText && <CardDetail>{item.cardDetailedText}</CardDetail>}
                      {item.url && (
                        <CertLink href={item.url} target="_blank" rel="noopener noreferrer">
                          View certificate →
                        </CertLink>
                      )}
                    </Card>
                  </ContentCol>
                </Row>
              );
            })}
          </TimelineTrack>
        ) : <FallbackSpinner />}
      </Section>
    </>
  );
}

Education.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Education;
