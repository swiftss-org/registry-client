import React from 'react';
import { TextField, Select } from '@orfium/ictinus';

import {
  PatientDirectoryContainer,
  SearchWrapper,
  Line,
  PatientsList,
} from './PatientDirectory.style';
import PatientCard from './components/PatientCard';
import { Patients } from './constants';

const PatientDirectory: React.FC = () => {
  return (
    <PatientDirectoryContainer>
      <SearchWrapper>
        <TextField
          type={'outlined'}
          placeholder={'Search (Name , ID, Patient Hospital ID ...)'}
          leftIcon={'search'}
        />
        <Select
          label="Center"
          styleType="outlined"
          size="sm"
          required
          options={[{ label: 'Hospital Number 1', value: 1 }]}
        />
      </SearchWrapper>

      <PatientsList>
        {Patients.map((patient, index) => (
          <>
            <PatientCard key={'patient' + index} {...patient} />
            <Line />
          </>
        ))}
      </PatientsList>
    </PatientDirectoryContainer>
  );
};

export default PatientDirectory;
