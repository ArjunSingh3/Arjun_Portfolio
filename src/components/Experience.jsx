import React, { useEffect, useState, useContext } from 'react';
import { Timeline, TimelineItem } from 'vertical-timeline-component-for-react';
import { Container } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import '../css/experience.css';

function Experience(props) {
  const theme = useContext(ThemeContext);
  const { header } = props;
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.experiences, { method: 'GET' })
      .then((res) => res.json())
      .then((res) => setData(res.experiences))
      .catch((err) => err);
  }, []);

  // Theme-dependent styles
  const styles = {
    ulStyle: { listStylePosition: 'outside', paddingLeft: 20, marginTop: 8 },
    subtitleContainerStyle: { marginTop: 6, marginBottom: 6 },
    subtitleStyle: { display: 'inline-block', fontSize: '1em', fontWeight: 500 },
    inlineChild: { display: 'inline-block', fontSize: '0.95em' },
    itemStyle: { marginBottom: 10 },
    topRow: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '18px',
      marginBottom: 6,
    },
    textCol: {
      flex: 2,
      minWidth: 0,
    },
    mediaCol: {
      flex: '0 0 auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginLeft: '18px', // closer to text
    },
    image: {
      maxWidth: '180px',
      maxHeight: '180px',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      marginLeft: 0,
      marginBottom: '6px',
    },
    keywords: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '6px',
      fontSize: '10px',
      marginTop: '4px',
      color: theme.secondaryText,
      alignItems: 'center',
      justifyContent: 'center',
    },
    keywordBadge: {
      background: theme.accentColor,
      color: '#fff',
      borderRadius: '8px',
      padding: '2px 8px',
      fontSize: '10px',
      fontWeight: 500,
      letterSpacing: '0.5px',
    },
    itemBody: {
      color: theme.color,
      background: theme.background,
      padding: '24px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    },
    dateInner: {
      background: theme.accentColor,
      color: '#fff',
      fontWeight: 500,
    },
    itemTitle: {
      fontSize: '1.18em',
      fontWeight: 600,
      margin: 0,
      lineHeight: 1.2,
    },
    itemSubtitle: {
      fontSize: '1em',
      fontWeight: 500,
      margin: 0,
    },
    descriptionTitle: {
      fontSize: '1em',
      fontWeight: 600,
      margin: '16px 0 8px 0',
      color: theme.accentColor,
      letterSpacing: '0.5px',
    },
  };

  return (
    <>
      {header && <Header title={header} />}
      <Container>
        {data ? (
          <Timeline lineColor={theme.timelineLineColor}>
            {data.map((item) => (
              <TimelineItem
                key={item.title + item.dateText}
                dateText={item.dateText}
                dateInnerStyle={styles.dateInner}
                style={styles.itemStyle}
                bodyContainerStyle={styles.itemBody}
              >
                {/* Top row: title, subtitle, workType, image, and keywords */}
                <div style={styles.topRow}>
                  <div style={styles.textCol}>
                    <h2 className="item-title" style={styles.itemTitle}>{item.title}</h2>
                    <div style={styles.subtitleContainerStyle}>
                      <span style={{ ...styles.subtitleStyle, color: theme.accentColor }}>
                        {item.subtitle}
                      </span>
                      {item.workType && (
                        <span style={styles.inlineChild}>
                          &nbsp;·
                          {' '}
                          {item.workType}
                        </span>
                      )}
                    </div>
                  </div>
                  {(item.media && item.media.type === 'IMAGE' && item.media.source && item.media.source.url) && (
                    <div style={styles.mediaCol}>
                      <img
                        src={item.media.source.url}
                        alt={item.media.alt || ''}
                        style={styles.image}
                      />
                      {item.keywords && item.keywords.length > 0 && (
                        <div style={styles.keywords}>
                          {item.keywords.map((kw) => (
                            <span key={kw} style={styles.keywordBadge}>
                              {kw}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {/* Description section with a title, spanning full width */}
                <h5 style={styles.descriptionTitle}>Description</h5>
                <ul style={styles.ulStyle}>
                  {item.workDescription
                    && item.workDescription.map((point) => (
                      <li key={point}>
                        <ReactMarkdown components={{ p: 'span' }}>
                          {point}
                        </ReactMarkdown>
                      </li>
                    ))}
                </ul>
              </TimelineItem>
            ))}
          </Timeline>
        ) : (
          <FallbackSpinner />
        )}
      </Container>
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
