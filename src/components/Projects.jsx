import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Header from './Header';
import endpoints from '../constants/endpoints';
import ProjectCard from './projects/ProjectCard';
import FallbackSpinner from './FallbackSpinner';

const Section = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 10px 24px 110px;
`;

const Inner = styled.div`
  width: 100%;
  max-width: 1180px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 26px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1020px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ShowMoreRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 44px;
`;

const ShowMoreButton = styled.button`
  padding: 13px 32px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.92rem;
  cursor: pointer;
  color: ${({ theme }) => theme.color};
  background: ${({ theme }) => theme.cardBackground};
  border: 1px solid ${({ theme }) => theme.cardBorderColor};
  backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  transition: transform 0.2s ease, background 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    background: ${({ theme }) => theme.cardBackgroundHover};
  }
`;

function Projects(props) {
  const { header } = props;
  const [data, setData] = useState(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    fetch(endpoints.projects, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  const numberOfItems = showMore && data ? data.projects.length : 6;

  return (
    <>
      <Header title={header} />
      <Section>
        {data ? (
          <Inner>
            <Grid>
              {data.projects?.slice(0, numberOfItems).map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </Grid>

            {!showMore && data.projects?.length > numberOfItems && (
              <ShowMoreRow>
                <ShowMoreButton type="button" onClick={() => setShowMore(true)}>
                  Show more
                </ShowMoreButton>
              </ShowMoreRow>
            )}
          </Inner>
        ) : <FallbackSpinner />}
      </Section>
    </>
  );
}

Projects.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Projects;
