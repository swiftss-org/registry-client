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
        <TextField disabled label="CEPOD" variant="outlined" size="medium" value={episode.cepod} />
        <TextField disabled label="Side" variant="outlined" size="medium" value={episode.side} />
        <TextField
          disabled
          label="Occurrence"
          variant="outlined"
          size="medium"
          value={episode.occurence}
        />
        <TextField disabled label="Type" variant="outlined" size="medium" value={episode.type} />
        <TextField
          disabled
          label="Size"
          variant="outlined"
          size="medium"
          value={episode.size}
        />
        <TextField
          disabled
          label="Complexity"
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
          variant="outlined"
          size="medium"
          value={episode.mesh_type}
        />
        <TextField
          disabled
          label="Anaesthetic type"
          variant="outlined"
          size="medium"
          value={episode.anaesthetic_type}
        />
        <TextField
          disabled
          label="Diathermy used"
          variant="outlined"
          size="medium"
          value={episode.diathermy_used ? 'Yes' : 'No'}
        />
        <TextField
          disabled
          label="Prophylactic antibiotics given?"
          variant="outlined"
          size="medium"
          value={episode.antibiotic_used ? 'Yes' : 'No'}
        />
        <TextField
          disabled
          label="Prophylactic antibiotics type"
          variant="outlined"
          size="medium"
          value={episode.antibiotic_type}
        />        
        {episode.surgeons.map((surgeon, index) => (
          <TextField
            key={`surgeon_${index}`}
            disabled
            label="Surgeon"
            variant="outlined"
            size="medium"
            value={`${surgeon.user.first_name} ${surgeon.user.last_name}`}
          />
        ))}
        <TextareaAutosize disabled minRows={3} placeholder={episode.comments} />
      </FieldContainer>
    </InternalContainer>
  );
};

export default Surgery;
