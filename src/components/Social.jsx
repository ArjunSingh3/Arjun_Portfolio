import React, { useEffect, useState, useContext } from 'react';
import { SocialIcon } from 'react-social-icons';
import styled, { ThemeContext } from 'styled-components';
import endpoints from '../constants/endpoints';

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

const IconFrame = styled.div`
  border-radius: 50%;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  box-shadow: 0 0 0 rgba(0, 0, 0, 0);

  &:hover {
    transform: translateY(-3px) scale(1.06);
    box-shadow: 0 10px 24px ${({ theme }) => theme.shadowColor};
  }
`;

function Social() {
  const theme = useContext(ThemeContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.social, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <Row>
      {data ? data.social.map((social) => (
        <IconFrame key={social.network}>
          <SocialIcon
            url={social.href}
            network={social.network}
            bgColor={theme.socialIconBgColor}
            style={{ width: 42, height: 42 }}
            target="_blank"
            rel="noopener"
          />
        </IconFrame>
      )) : null}
    </Row>
  );
}

export default Social;
