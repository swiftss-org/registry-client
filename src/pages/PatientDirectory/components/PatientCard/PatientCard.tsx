/** @jsxImportSource @emotion/react */
import React from 'react';

import { useTheme, Icon } from '@orfium/ictinus';
import { PatientAPI } from 'models/apiTypes';

import { CardContainer, IdLabel, IdValue, Subtitle, Title } from './PatientCard.style';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PatientCard: React.FC<PatientAPI> = ({ full_name, gender, age, national_id, hospitals }) => {
  const theme = useTheme();
  return (
    <CardContainer key={'patient_' + national_id}>
      <div css={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
        <Icon name="user" color={theme.utils.getColor('blue', 400)} size={24} />
        <Icon name="fatArrowRight" color={theme.utils.getColor('cyan', 200)} size={24} />
      </div>
      <Title>{full_name}</Title>
      <Subtitle>
        {gender}, {age}
      </Subtitle>
      <div css={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
        <IdLabel>Patient Hospital ID:</IdLabel>
        <IdValue>-</IdValue>
      </div>
      <div css={{ display: 'flex', justifyContent: 'space-between' }}>
        <IdLabel>National ID:</IdLabel>
        <IdValue>{national_id}</IdValue>
      </div>
    </CardContainer>
  );
};

export default PatientCard;
