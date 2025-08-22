/** @jsxImportSource @emotion/react */
import React from 'react';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate, useLocation } from 'react-router-dom';

import { Container, Heading, Subheading, TextWrapper } from './EpisodeCard.style';

type Props = {
  type?: string;
  date?: string;
  episodeID?: number;
};

const EpisodeCard: React.FC<Props> = ({ type, date, episodeID }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    navigate(`${location.pathname}/episodes/${episodeID}`);
  };

  return (
    <Container onClick={handleClick}>
      <TextWrapper>
        <Heading>{type}</Heading>
        <Subheading>{date}</Subheading>
      </TextWrapper>
      <ChevronRightIcon />
    </Container>
  );
};

export default EpisodeCard;
