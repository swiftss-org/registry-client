/** @jsxImportSource @emotion/react */
import React from 'react';

import { PatientAPI } from 'models/apiTypes';

import EpisodeCard from './EpisodeCard';
import { Container, EmptyState } from './EpisodeList.style';

type Props = {
  patient?: PatientAPI;
};
const EpisodeList: React.FC<Props> = ({ patient }) => {
  return patient?.episodes.length === 0 ? (
    <EmptyState>
      <div>There are no episodes to display</div>
    </EmptyState>
  ) : (
    <Container>
      {patient?.episodes
        .sort((a, b) => (new Date(a.surgery_date) <= new Date(b.surgery_date) ? 1 : -1))
        .map((episode) => (
          <EpisodeCard date={episode.surgery_date} type={episode.episode_type} />
        ))}
    </Container>
  );
};

export default EpisodeList;
