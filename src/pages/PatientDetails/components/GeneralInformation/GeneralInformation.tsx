/** @jsxImportSource @emotion/react */
import React from 'react';

import { TextField } from '@orfium/ictinus';
import { HospitalsAPI, PatientAPI } from 'models/apiTypes';

import { FieldsContainer } from '../../../../common.style';
import { Container } from './GeneralInformation.style';

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
        locked
        label="Full Name"
        styleType="outlined"
        size="md"
        value={patient?.full_name}
      />

      <TextField locked label="Gender" styleType="outlined" size="md" value={patient?.gender} />
      <FieldsContainer>
        <TextField
          locked
          id="year_of_birth"
          label="Year Of Birth"
          styleType="outlined"
          type="number"
          size="md"
          value={patient?.year_of_birth}
        />
        <TextField
          disabled
          id="age"
          label="Age"
          type="number"
          styleType="outlined"
          size="md"
          value={patient?.age}
        />
      </FieldsContainer>
      <TextField
        id="national_id"
        label="National ID"
        styleType="outlined"
        size="md"
        locked
        value={patient?.national_id}
      />
      <TextField
        id="hospital"
        label="Hospital"
        styleType="outlined"
        size="md"
        locked
        value={hospital?.name}
      />
      <TextField
        id="patient_hospital_id"
        label="Patient Hospital ID"
        styleType="outlined"
        size="md"
        locked
        value={hospitalPatientID}
      />
      <TextField
        id="patient_phone_number_1"
        label="Patient Phone number 1"
        styleType="outlined"
        size="md"
        locked
        value={patient?.phone_1}
      />
      <TextField
        id="patient_phone_number_2"
        label="Patient Phone number 2"
        styleType="outlined"
        size="md"
        locked
        value={patient?.phone_2}
      />
    </Container>
  );
};

export default GeneralInformation;
