import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const CardShell = styled(motion.div)`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radiusMd};
  background: ${({ theme }) => theme.cardBackground};
  border: 1px solid ${({ theme }) => theme.cardBorderColor};
  backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  -webkit-backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    border-color: ${({ theme }) => theme.accentColor}55;
    box-shadow: 0 22px 46px ${({ theme }) => theme.shadowColor};
  }
`;

const ImageFrame = styled.div`
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;

  ${CardShell}:hover & {
    transform: scale(1.06);
  }
`;

const Body = styled.div`
  padding: 20px 22px 8px;
  flex: 1;
`;

const Title = styled.h3`
  font-size: 1.15rem;
  font-weight: 600;
  margin: 0 0 10px;
  color: ${({ theme }) => theme.color};
`;

const BodyText = styled.div`
  font-size: 0.92rem;
  color: ${({ theme }) => theme.secondaryText};
  text-align: left;

  ul {
    margin: 0;
    padding-left: 18px;
  }

  li {
    margin-bottom: 6px;
    line-height: 1.55;
  }

  strong {
    color: ${({ theme }) => theme.color};
  }
`;

const LinksRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 8px 22px 4px;
`;

const LinkButton = styled.button`
  padding: 7px 16px;
  font-size: 0.82rem;
  font-weight: 600;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.accentColor};
  color: ${({ theme }) => theme.accentColor};
  background: transparent;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.accentColor};
    color: #fff;
  }
`;

const Footer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 16px 22px 22px;
`;

const Tag = styled.span`
  font-size: 0.74rem;
  font-weight: 600;
  padding: 5px 12px;
  border-radius: 999px;
  color: ${({ theme }) => theme.chipColor};
  background: ${({ theme }) => theme.chipBackground};
`;

function ProjectCard(props) {
  const { project } = props;

  return (
    <CardShell
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {project.image && (
        <ImageFrame>
          <Image src={project.image} alt={project.title} loading="lazy" />
        </ImageFrame>
      )}
      <Body>
        <Title>{project.title}</Title>
        <BodyText>
          <ReactMarkdown>{project.bodyText}</ReactMarkdown>
        </BodyText>
      </Body>

      {project.links && project.links.length > 0 && (
        <LinksRow>
          {project.links.map((link) => (
            <LinkButton
              key={link.href}
              type="button"
              onClick={() => window.open(link.href, '_blank', 'noopener')}
            >
              {link.text}
            </LinkButton>
          ))}
        </LinksRow>
      )}

      {project.tags && project.tags.length > 0 && (
        <Footer>
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </Footer>
      )}
    </CardShell>
  );
}

ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    bodyText: PropTypes.string.isRequired,
    image: PropTypes.string,
    links: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })),
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default ProjectCard;
