import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import endpoints from '../constants/endpoints';
import ThemeToggler from './ThemeToggler';

const Bar = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  display: flex;
  justify-content: center;
  padding: ${({ $scrolled }) => ($scrolled ? '10px 16px' : '20px 16px')};
  transition: padding 0.3s ease;
`;

const Inner = styled.div`
  width: 100%;
  max-width: 1080px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 10px 8px 14px;
  border-radius: 999px;
  background: ${({ theme }) => theme.navBackground};
  border: 1px solid ${({ theme }) => theme.navBorder};
  backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  -webkit-backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  box-shadow: ${({ theme, $scrolled }) => ($scrolled ? `0 10px 34px ${theme.shadowColor}` : 'none')};
  transition: box-shadow 0.35s ease, background 0.4s ease;
`;

const Brand = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  flex-shrink: 0;
`;

const LogoImg = styled.img`
  width: 36px;
  height: 32px;
  object-fit: cover;
  border-radius: 9px;
  box-shadow: 0 0 0 1px ${({ theme }) => theme.navBorder};
`;

const BrandName = styled.span`
  font-family: ${({ theme }) => theme.fontHeading};
  font-weight: 600;
  font-size: 1.02rem;
  color: ${({ theme }) => theme.color};
  letter-spacing: -0.01em;

  @media (max-width: 480px) {
    display: none;
  }
`;

const NavLinksRow = styled.nav`
  display: none;
  align-items: center;
  gap: 2px;

  @media (min-width: 860px) {
    display: flex;
  }
`;

const NavItem = styled(Link)`
  position: relative;
  padding: 8px 16px;
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  border-radius: 999px;
  white-space: nowrap;
  color: ${({ theme, $active }) => ($active ? theme.navbarTheme.linkActiveColor : theme.navbarTheme.linkColor)};
  transition: color 0.25s ease;

  &:hover {
    color: ${({ theme }) => theme.navbarTheme.linkHoverColor};
  }
`;

const ActivePill = styled(motion.span)`
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: 999px;
  background: ${({ theme }) => theme.cardBackgroundHover};
  border: 1px solid ${({ theme }) => theme.cardBorderColor};
`;

const ExternalItem = styled.a`
  padding: 8px 18px;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 999px;
  color: #fff;
  background: ${({ theme }) => theme.accentGradient};
  white-space: nowrap;
  box-shadow: 0 6px 18px ${({ theme }) => theme.shadowColor};
  transition: transform 0.2s ease, filter 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    filter: brightness(1.06);
  }
`;

const RightGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const HamburgerButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.navBorder};
  background: transparent;
  cursor: pointer;
  padding: 0;

  @media (min-width: 860px) {
    display: none;
  }
`;

const HamLine = styled(motion.span)`
  display: block;
  width: 16px;
  height: 2px;
  border-radius: 2px;
  background: ${({ theme }) => theme.color};
`;

const MobilePanel = styled(motion.nav)`
  position: fixed;
  top: 76px;
  left: 16px;
  right: 16px;
  z-index: 49;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 10px;
  border-radius: 22px;
  background: ${({ theme }) => theme.navBackground};
  border: 1px solid ${({ theme }) => theme.navBorder};
  backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  box-shadow: 0 24px 60px ${({ theme }) => theme.shadowColor};

  @media (min-width: 860px) {
    display: none;
  }
`;

const MobileLink = styled(Link)`
  padding: 12px 16px;
  border-radius: 14px;
  font-size: 0.98rem;
  font-weight: 500;
  text-decoration: none;
  color: ${({ theme, $active }) => ($active ? theme.navbarTheme.linkActiveColor : theme.navbarTheme.linkColor)};
  background: ${({ theme, $active }) => ($active ? theme.cardBackgroundHover : 'transparent')};
`;

const MobileExternalLink = styled.a`
  margin-top: 4px;
  padding: 12px 16px;
  border-radius: 14px;
  font-size: 0.98rem;
  font-weight: 600;
  text-decoration: none;
  text-align: center;
  color: #fff;
  background: ${({ theme }) => theme.accentGradient};
`;

function NavBar() {
  const location = useLocation();
  const [data, setData] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch(endpoints.navbar, { method: 'GET' })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const isActive = (href, index) => (index === 0
    ? location.pathname === href
    : location.pathname.startsWith(href));

  return (
    <Bar $scrolled={scrolled}>
      <Inner $scrolled={scrolled}>
        <Brand to="/">
          {data?.logo && <LogoImg src={data.logo.source} alt="logo" />}
          <BrandName>{data?.name || 'Portfolio'}</BrandName>
        </Brand>

        <NavLinksRow>
          {data
            && data.sections?.map((section, index) => (section?.type === 'link' ? (
              <ExternalItem
                key={section.title}
                href={section.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {section.title}
              </ExternalItem>
            ) : (
              <NavItem
                key={section.title}
                to={section.href}
                $active={isActive(section.href, index)}
              >
                {isActive(section.href, index) && (
                  <ActivePill layoutId="nav-active-pill" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />
                )}
                {section.title}
              </NavItem>
            )))}
        </NavLinksRow>

        <RightGroup>
          <ThemeToggler />
          <HamburgerButton
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <HamLine animate={{ rotate: open ? 45 : 0, y: open ? 6.5 : 0 }} />
            <HamLine animate={{ opacity: open ? 0 : 1 }} />
            <HamLine animate={{ rotate: open ? -45 : 0, y: open ? -6.5 : 0 }} />
          </HamburgerButton>
        </RightGroup>
      </Inner>

      <AnimatePresence>
        {open && (
          <MobilePanel
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            {data
              && data.sections?.map((section, index) => (section?.type === 'link' ? (
                <MobileExternalLink
                  key={section.title}
                  href={section.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {section.title}
                </MobileExternalLink>
              ) : (
                <MobileLink
                  key={section.title}
                  to={section.href}
                  $active={isActive(section.href, index)}
                >
                  {section.title}
                </MobileLink>
              )))}
          </MobilePanel>
        )}
      </AnimatePresence>
    </Bar>
  );
}

export default NavBar;
