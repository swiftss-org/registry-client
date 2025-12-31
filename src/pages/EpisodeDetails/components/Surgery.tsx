import React, { FC } from 'react';

import { Box, TextField, TextareaAutosize, Typography } from '@mui/material';
import { EpisodesAPI, SurgeonsAPI } from 'models/apiTypes';

const Surgery: FC<{
  episode: EpisodesAPI;
}> = ({ episode }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Episode details:
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 2, mb: 3 }}>
        <TextField disabled label="CEPOD" id="cepod" variant="outlined" size="small" value={episode.cepod} />
        <TextField disabled label="Side" id="side" variant="outlined" size="small" value={episode.side} />
        <TextField
          disabled
          label="Occurrence"
          id="occurence"
          variant="outlined"
          size="small"
          value={episode.occurence}
        />
        <TextField disabled label="Type" id="type" variant="outlined" size="small" value={episode.type} />
        <TextField
          disabled
          label="Size"
          id="size"
          variant="outlined"
          size="small"
          value={episode.size}
        />
        <TextField
          disabled
          label="Complexity"
          id="complexity"
          variant="outlined"
          size="small"
          value={episode.complexity}
        />
      </Box>

      <Typography variant="h6" gutterBottom>
        Surgery details:
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 2 }}>
        <TextField
          disabled
          label="Mesh type"
          id="mesh_type"
          variant="outlined"
          size="small"
          value={episode.mesh_type}
        />
        <TextField
          disabled
          label="Anaesthetic type"
          id="anaesthetic_type"
          variant="outlined"
          size="small"
          value={episode.anaesthetic_type}
        />
        <TextField
          disabled
          label="Diathermy used"
          id="diathermy_used"
          variant="outlined"
          size="small"
          value={episode.diathermy_used ? 'Yes' : 'No'}
        />
        <TextField
          disabled
          label="Prophylactic antibiotics given?"
          id="antibiotic_used"
          variant="outlined"
          size="small"
          value={episode.antibiotic_used ? 'Yes' : 'No'}
        />
        <TextField
          disabled
          label="Prophylactic antibiotics type"
          id="antibiotic_type"
          variant="outlined"
          size="small"
          value={episode.antibiotic_type}
        />
        {episode.surgeons.map((surgeon: SurgeonsAPI, index: number) => (
          <TextField
            key={`surgeon_${index}`}
            disabled
            label="Surgeon"
            id="surgeon"
            variant="outlined"
            size="small"
            value={`${surgeon.user.first_name} ${surgeon.user.last_name}`}
          />
        ))}
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography variant="caption" color="textSecondary" display="block" gutterBottom>
          Comments
        </Typography>
        <TextareaAutosize
          disabled
          minRows={3}
          id="surgery_comments"
          value={episode.comments}
          style={{ width: '100%', padding: '8px', borderColor: '#c4c4c4', borderRadius: '4px' }}
        />
      </Box>
    </Box>
  );
};

export default Surgery;
