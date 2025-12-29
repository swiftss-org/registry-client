import React from 'react';

import { Stack, Box, Typography } from '@mui/material';
import { PatientAPI } from 'models/apiTypes';

import EpisodeCard from './EpisodeCard';

type Props = {
  patient?: PatientAPI;
};

const EpisodeList: React.FC<Props> = ({ patient }) => {
  if (!patient || patient.episodes.length === 0) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          There are no episodes to display
        </Typography>
      </Box>
    );
  }

  return (
    <Stack spacing={1} sx={{ p: 2 }}>
      {patient.episodes
        .sort((a, b) => (new Date(a.surgery_date) <= new Date(b.surgery_date) ? 1 : -1))
        .map((episode, index) => (
          <EpisodeCard
            key={`${episode.episode_type}_${episode.surgery_date}_${index}`}
            episodeID={episode.id}
            date={episode.surgery_date}
            type={episode.episode_type}
          />
        ))}
    </Stack>
  );
};

export default EpisodeList;
