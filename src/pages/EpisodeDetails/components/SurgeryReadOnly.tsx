import React, { FC } from 'react';

import { Box, Grid } from '@mui/material';
import { DetailItem, SectionTitle } from 'components/Display';
import { EpisodesAPI, SurgeonsAPI } from 'models/apiTypes';

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
        {episode.surgeons.map((surgeon: SurgeonsAPI, index: number) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={`surgeon_${index}`}>
            <DetailItem id={`surgeon_${index}`} label="Surgeon" value={`${surgeon.user.first_name} ${surgeon.user.last_name}`} />
          </Grid>
        ))}
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
