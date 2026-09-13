import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
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

const TopRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
`;

const TitleBlock = styled.div`
  flex: 1;
  min-width: 220px;
`;

const ItemTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 6px;
  color: ${({ theme }) => theme.color};
`;

const SubtitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  font-size: 0.92rem;
`;

const SubtitleAccent = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.accentColor};
`;

const WorkType = styled.span`
  color: ${({ theme }) => theme.mutedText};
`;

const MediaImg = styled.img`
  width: 84px;
  height: 84px;
  object-fit: contain;
  border-radius: ${({ theme }) => theme.radiusSm};
  background: ${({ theme }) => theme.backgroundElevated};
  padding: 8px;
  flex-shrink: 0;
`;

const DescriptionTitle = styled.h4`
  font-size: 0.82rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.accentColor};
  margin: 20px 0 10px;
`;

const DescriptionList = styled.ul`
  margin: 0;
  padding-left: 20px;
  color: ${({ theme }) => theme.secondaryText};

  li {
    margin-bottom: 8px;
    line-height: 1.6;
  }

  strong {
    color: ${({ theme }) => theme.color};
  }
`;

function Experience(props) {
  const { header } = props;
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.experiences, { method: 'GET' })
      .then((res) => res.json())
      .then((res) => setData(res.experiences))
      .catch((err) => err);
  }, []);

  return (
    <>
      {header && <Header title={header} />}
      <Section>
        {data ? (
          <TimelineTrack>
            {data.map((item, index) => (
              <Row key={item.title + item.dateText}>
                <DotCol>
                  <Dot $current={index === 0} />
                </DotCol>
                <ContentCol>
                  <Card
                    variants={cardEnterVariants}
                    initial="hiddenUp"
                    whileInView="show"
                    viewport={{ once: true, margin: '-60px' }}
                  >
                    <DateBadge>{item.dateText}</DateBadge>
                    <TopRow>
                      <TitleBlock>
                        <ItemTitle>{item.title}</ItemTitle>
                        <SubtitleRow>
                          <SubtitleAccent>{item.subtitle}</SubtitleAccent>
                          {item.workType && (
                            <WorkType>
                              &nbsp;·&nbsp;
                              {item.workType}
                            </WorkType>
                          )}
                        </SubtitleRow>
                      </TitleBlock>
                      {item.media?.type === 'IMAGE' && item.media.source?.url && (
                        <MediaImg src={item.media.source.url} alt={item.media.name || ''} />
                      )}
                    </TopRow>

                    {item.workDescription && item.workDescription.length > 0 && (
                      <>
                        <DescriptionTitle>Highlights</DescriptionTitle>
                        <DescriptionList>
                          {item.workDescription.map((point) => (
                            <li key={point}>
                              <ReactMarkdown components={{ p: 'span' }}>{point}</ReactMarkdown>
                            </li>
                          ))}
                        </DescriptionList>
                      </>
                    )}
                  </Card>
                </ContentCol>
              </Row>
            ))}
          </TimelineTrack>
        ) : (
          <FallbackSpinner />
        )}
      </Section>
    </>
  );
}

Experience.propTypes = {
  header: PropTypes.string,
};

Experience.defaultProps = {
  header: '',
};

export default Experience;
