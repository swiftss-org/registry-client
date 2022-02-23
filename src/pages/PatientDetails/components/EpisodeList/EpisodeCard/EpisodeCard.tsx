/** @jsxImportSource @emotion/react */
import React from 'react';

import { Icon } from '@orfium/ictinus';
import { useHistory } from 'react-router-dom';

import { Container, Heading, Subheading, TextWrapper } from './EpisodeCard.style';

type Props = {
  type?: string;
  date?: string;
  episodeID?: number;
};

const EpisodeCard: React.FC<Props> = ({ type, date, episodeID }) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(`${history.location.pathname}/episodes/${episodeID}`);
  };

  return (
    <Container onClick={handleClick}>
      <TextWrapper>
        <Heading>{type}</Heading>
        <Subheading>{date}</Subheading>
      </TextWrapper>
      <Icon name={'chevronSmallRight'} color={'lightGrey'} variant={400} size={24} />
    </Container>
  );
};

export default EpisodeCard;
