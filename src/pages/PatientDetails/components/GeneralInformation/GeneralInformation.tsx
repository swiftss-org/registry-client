/** @jsxImportSource @emotion/react */
import React from 'react';

import { TextField } from '@mui/material';
import { HospitalsAPI, PatientAPI } from 'models/apiTypes';

import { Container } from './GeneralInformation.style';
import { FieldsContainer } from '../../../../common.style';

type Props = {
  patient?: PatientAPI;
  hospital?: HospitalsAPI;
};
const GeneralInformation: React.FC<Props> = ({ patient, hospital }) => {
  const hospitalPatientID = patient?.hospital_mappings.find(
    (value) => value.hospital_id === hospital?.id
  )?.patient_hospital_id;

  return (
    <Container>
      <TextField
        disabled
        label="Full Name"
        variant="outlined"
        size="medium"
        value={patient?.full_name}
      />

      <TextField disabled label="Gender" variant="outlined" size="medium" value={patient?.gender} />
      <FieldsContainer>
        <TextField
          disabled
          id="year_of_birth"
          label="Year Of Birth"
          variant="outlined"
          type="number"
          size="medium"
          value={patient?.year_of_birth}
        />
        <TextField
          disabled
          id="age"
          label="Age"
          type="number"
          variant="outlined"
          size="medium"
          value={patient?.age}
        />
      </FieldsContainer>
      <TextField
        id="national_id"
        label="National ID"
        variant="outlined"
        size="medium"
        disabled
        value={patient?.national_id}
      />
      <TextField
        id="hospital"
        label="Hospital"
        variant="outlined"
        size="medium"
        disabled
        value={hospital?.name}
      />
      <TextField
        id="patient_hospital_id"
        label="Patient Hospital ID"
        variant="outlined"
        size="medium"
        disabled
        value={hospitalPatientID}
      />
      <TextField
        id="patient_phone_number_1"
        label="Patient Phone number 1"
        variant="outlined"
        size="medium"
        disabled
        value={patient?.phone_1}
      />
      <TextField
        id="patient_phone_number_2"
        label="Patient Phone number 2"
        variant="outlined"
        size="medium"
        disabled
        value={patient?.phone_2}
      />
    </Container>
  );
};

export default GeneralInformation;
