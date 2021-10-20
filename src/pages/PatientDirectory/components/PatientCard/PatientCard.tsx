/* eslint-disable @typescript-eslint/no-unused-vars */
/** @jsxImportSource @emotion/react */
import React from 'react';

import { useTheme, Icon, Chip } from '@orfium/ictinus';
// import { isEmpty } from 'lodash';
import { PatientAPI } from 'models/apiTypes';

import { CardContainer, ChipWrapper, IdLabel, IdValue, Subtitle, Title } from './PatientCard.style';

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
      {/* <ChipWrapper>
        <Chip styleType={'filled'} size={'sm'} fill={'cyan'} shade={100}>
          {hospitals[0].name}
        </Chip>
      </ChipWrapper> */}
    </CardContainer>
  );
};

export default PatientCard;
