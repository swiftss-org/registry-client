import React, { FC } from 'react';

import { Box, Grid } from '@mui/material';
import { DetailItem, SectionTitle } from 'components/Display';
import { EpisodesAPI } from 'models/apiTypes';

const SurgeryReadOnly: FC<{
  episode: EpisodesAPI;
}> = ({ episode }) => {
  return (
    <Box>
      <SectionTitle title="Episode details" />
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <DetailItem id="cepod" label="CEPOD" value={episode.cepod} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <DetailItem id="side" label="Side" value={episode.side} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <DetailItem id="occurence" label="Occurrence" value={episode.occurence} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <DetailItem id="type" label="Type" value={episode.type} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <DetailItem id="size" label="Size" value={episode.size} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <DetailItem id="complexity" label="Complexity" value={episode.complexity} />
        </Grid>
      </Grid>
      <SectionTitle title="Surgery details" />
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <DetailItem id="mesh_type" label="Mesh type" value={episode.mesh_type} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <DetailItem id="anaesthetic_type" label="Anaesthetic type" value={episode.anaesthetic_type} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <DetailItem id="diathermy_used" label="Diathermy used" value={episode.diathermy_used} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <DetailItem id="antibiotic_used" label="Prophylactic antibiotics given?" value={episode.antibiotic_used} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <DetailItem id="antibiotic_type" label="Prophylactic antibiotics type" value={episode.antibiotic_type} />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <DetailItem
            id="primary_surgeon"
            label="Main Operating Surgeon"
            value={
              episode.primary_surgeon
                ? `${episode.primary_surgeon.user.first_name} ${episode.primary_surgeon.user.last_name}`
                : 'Not recorded'
            }
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <DetailItem
            id="secondary_surgeon"
            label="Secondary Surgeon"
            value={
              episode.secondary_surgeon
                ? `${episode.secondary_surgeon.user.first_name} ${episode.secondary_surgeon.user.last_name}`
                : 'None'
            }
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <DetailItem
            id="tertiary_surgeon"
            label="Supervising Surgeon"
            value={
              episode.tertiary_surgeon
                ? `${episode.tertiary_surgeon.user.first_name} ${episode.tertiary_surgeon.user.last_name}`
                : 'None'
            }
          />
        </Grid>
      </Grid>
      
      {episode.comments && (
        <Box sx={{ mt: 2 }}>
          <DetailItem id="surgery_comments" label="Comments" value={episode.comments} />
        </Box>
      )}
    </Box>
  );
};

export default SurgeryReadOnly;
