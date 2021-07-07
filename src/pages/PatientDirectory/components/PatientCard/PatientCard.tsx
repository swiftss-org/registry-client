import React from 'react';

import { Chip, Icon } from '@orfium/ictinus';
import { Patient } from 'pages/PatientDirectory/types';

import {
  CardContainer,
  Info,
  ChipWrapper,
  Header,
  Footer,
  CardItemsContainer,
  CardItemContainer,
  CardLabel,
  CardValue,
  ViewMore,
} from './PatientCard.style';

const PatientCard: React.FC<Patient> = ({ name, gender, age, hospital, patientHospitalId, id }) => {
  return (
    <CardContainer>
      <Header>
        <Info>
          {name} , {gender} , {age}
        </Info>
        <ChipWrapper>
          <Chip styleType={'filled'} size={'sm'} fill={'lightGray'} shade={300}>
            {hospital}
          </Chip>
        </ChipWrapper>
      </Header>
      <Footer>
        <CardItemsContainer>
          <CardItemContainer>
            <CardLabel>Patient Hospital ID</CardLabel>
            <CardValue>{patientHospitalId}</CardValue>
          </CardItemContainer>
          <CardItemContainer>
            <CardLabel>ID</CardLabel>
            <CardValue>{id}</CardValue>
          </CardItemContainer>
        </CardItemsContainer>
        <ViewMore onClick={() => console.log('view more')}>
          <div>VIEW</div>
          <Icon name="chevronLargeRight" color={'#0047FF'} />
        </ViewMore>
      </Footer>
    </CardContainer>
  );
};

export default PatientCard;
