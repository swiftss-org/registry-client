import React from 'react';
import { TextField } from '@orfium/ictinus';

import { PatientDirectoryContainer, SearchWrapper, Line } from './PatientDirectory.style';
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
      </SearchWrapper>

      <div>
        {Patients.map((patient, index) => (
          <>
            <PatientCard key={'patient' + index} {...patient} />
            <Line />
          </>
        ))}
      </div>
    </PatientDirectoryContainer>
  );
};

export default PatientDirectory;
