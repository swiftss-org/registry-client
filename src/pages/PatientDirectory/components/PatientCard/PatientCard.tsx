import React from 'react';

import { Chip, Icon } from '@orfium/ictinus';
import { isEmpty } from 'lodash';
import { PatientAPI } from 'models/apiTypes';

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

const PatientCard: React.FC<PatientAPI> = ({ full_name, gender, age, national_id, hospitals }) => {
  return (
    <CardContainer key={'patient_' + national_id}>
      <Header>
        <Info>
          {full_name} , {gender} , {age}
        </Info>
        {!isEmpty(hospitals) && (
          <ChipWrapper>
            <Chip styleType={'filled'} size={'sm'} fill={'lightGray'} shade={300}>
              {/** TODO: change this! */}
              {hospitals[0].name}
            </Chip>
          </ChipWrapper>
        )}
      </Header>
      <Footer>
        <CardItemsContainer>
          <CardItemContainer>
            <CardLabel>Patient Hospital ID</CardLabel>
            {/** TODO: change this! */}
            {!isEmpty(hospitals) && <CardValue>{hospitals[0].patient_hospital_id}</CardValue>}
          </CardItemContainer>
          <CardItemContainer>
            <CardLabel>ID</CardLabel>
            <CardValue>{national_id}</CardValue>
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
