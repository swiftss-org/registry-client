import React, { FC } from 'react';

import { TextArea, TextField } from '@orfium/ictinus';
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
        <TextField locked label="Cepod" styleType="outlined" size="md" value={episode.cepod} />
        <TextField locked label="Side" styleType="outlined" size="md" value={episode.side} />
        <TextField
          locked
          label="Occurrence"
          styleType="outlined"
          size="md"
          value={episode.occurence}
        />
        <TextField locked label="Type" styleType="outlined" size="md" value={episode.type} />
        <TextField
          locked
          label="Complexity"
          styleType="outlined"
          size="md"
          value={episode.complexity}
        />
      </FieldContainer>
      <Heading>Surgery details:</Heading>
      <FieldContainer>
        <TextField
          locked
          label="Mesh type"
          styleType="outlined"
          size="md"
          value={episode.mesh_type}
        />
        <TextField
          locked
          label="Anaesthetic type"
          styleType="outlined"
          size="md"
          value={episode.anaesthetic_type}
        />
        <TextField
          locked
          label="Diathermy used"
          styleType="outlined"
          size="md"
          value={episode.diathermy_used ? 'Yes' : 'No'}
        />
        {episode.surgeons.map((surgeon, index) => (
          <TextField
            key={`surgeon_${index}`}
            locked
            label="Surgeon"
            styleType="outlined"
            size="md"
            value={`${surgeon.user.first_name} ${surgeon.user.last_name}`}
          />
        ))}
        <TextArea disabled styleType="outlined" placeholder={episode.comments} />
      </FieldContainer>
    </InternalContainer>
  );
};

export default Surgery;
