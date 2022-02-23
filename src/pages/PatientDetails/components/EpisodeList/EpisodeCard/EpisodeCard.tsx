/** @jsxImportSource @emotion/react */
import React from 'react';

import { Icon } from '@orfium/ictinus';

import { Container, Heading, Subheading, TextWrapper } from './EpisodeCard.style';

type Props = {
  type?: string;
  date?: string;
};

const EpisodeCard: React.FC<Props> = ({ type, date }) => {
  return (
    <Container>
      <TextWrapper>
        <Heading>{type}</Heading>
        <Subheading>{date}</Subheading>
      </TextWrapper>
      <Icon name={'chevronSmallRight'} color={'lightGrey'} variant={400} size={24} />
    </Container>
  );
};

export default EpisodeCard;
