import React, { FC } from 'react';

import { TextField, TextareaAutosize } from '@mui/material';
import { EpisodesAPI } from 'models/apiTypes';

import { Heading } from '../../../../PatientDetails/components/EpisodeList/EpisodeCard/EpisodeCard.style';
import { InternalContainer } from '../style';
import { FieldContainer } from './style';

const Surgery: FC<{
  isOpen: boolean;
  episode: EpisodesAPI;
}> = ({ isOpen, episode }) => {
  return (
    <InternalContainer isOpen={isOpen} aria-expanded={isOpen}>
      <Heading>Episode details:</Heading>
      <FieldContainer>
        <TextField disabled label="CEPOD" id="cepod" variant="outlined" size="medium" value={episode.cepod} />
        <TextField disabled label="Side" id="side" variant="outlined" size="medium" value={episode.side} />
        <TextField
          disabled
          label="Occurrence"
          id="occurence"
          variant="outlined"
          size="medium"
          value={episode.occurence}
        />
        <TextField disabled label="Type" id="type" variant="outlined" size="medium" value={episode.type} />
        <TextField
          disabled
          label="Size"
          id="size"
          variant="outlined"
          size="medium"
          value={episode.size}
        />
        <TextField
          disabled
          label="Complexity"
          id="complexity"
          variant="outlined"
          size="medium"
          value={episode.complexity}
        />
      </FieldContainer>
      <Heading>Surgery details:</Heading>
      <FieldContainer>
        <TextField
          disabled
          label="Mesh type"
          id="mesh_type"
          variant="outlined"
          size="medium"
          value={episode.mesh_type}
        />
        <TextField
          disabled
          label="Anaesthetic type"
          id="anaesthetic_type"
          variant="outlined"
          size="medium"
          value={episode.anaesthetic_type}
        />
        <TextField
          disabled
          label="Diathermy used"
          id="diathermy_used"
          variant="outlined"
          size="medium"
          value={episode.diathermy_used ? 'Yes' : 'No'}
        />
        <TextField
          disabled
          label="Prophylactic antibiotics given?"
          id="antibiotic_used"
          variant="outlined"
          size="medium"
          value={episode.antibiotic_used ? 'Yes' : 'No'}
        />
        <TextField
          disabled
          label="Prophylactic antibiotics type"
          id="antibiotic_type"
          variant="outlined"
          size="medium"
          value={episode.antibiotic_type}
        />
        {episode.surgeons.map((surgeon, index) => (
          <TextField
            key={`surgeon_${index}`}
            disabled
            label="Surgeon"
            id="surgeon"
            variant="outlined"
            size="medium"
            value={`${surgeon.user.first_name} ${surgeon.user.last_name}`}
          />
        ))}
        <TextareaAutosize disabled minRows={3} id="surgery_comments" value={episode.comments} />
      </FieldContainer>
    </InternalContainer>
  );
};

export default Surgery;
