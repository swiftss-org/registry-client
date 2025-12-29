import React from 'react';

import { TextField, Box, Stack } from '@mui/material';
import { HospitalsAPI, PatientAPI } from 'models/apiTypes';

type Props = {
  patient?: PatientAPI;
  hospital?: HospitalsAPI;
};

const GeneralInformation: React.FC<Props> = ({ patient, hospital }) => {
  const hospitalPatientID = patient?.hospital_mappings?.find(
    (mapping) => mapping.hospital_id === hospital?.id
  )?.patient_hospital_id;

  return (
    <Stack spacing={1} sx={{ p: 2 }}>
      <TextField
        disabled
        label="Full Name"
        id="full_name"
        variant="outlined"
        size="medium"
        value={patient?.full_name || ''}
      />

      <TextField disabled label="Gender" id="gender" variant="outlined" size="medium" value={patient?.gender || ''} />
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
        <TextField
          disabled
          id="year_of_birth"
          label="Year Of Birth"
          variant="outlined"
          type="number"
          size="medium"
          value={patient?.year_of_birth || ''}
        />
        <TextField
          disabled
          id="age"
          label="Age"
          type="number"
          variant="outlined"
          size="medium"
          value={patient?.age || ''}
        />
      </Box>
      <TextField
        id="national_id"
        label="National ID"
        variant="outlined"
        size="medium"
        disabled
        value={patient?.national_id || ''}
      />
      <TextField
        id="hospital"
        label="Hospital"
        variant="outlined"
        size="medium"
        disabled
        value={hospital?.name || ''}
      />
      <TextField
        id="patient_hospital_id"
        label="Patient Hospital ID"
        variant="outlined"
        size="medium"
        disabled
        value={hospitalPatientID || ''}
      />
      <TextField
        id="patient_phone_number_1"
        label="Patient Phone number 1"
        variant="outlined"
        size="medium"
        disabled
        value={patient?.phone_1 || ''}
      />
      <TextField
        id="patient_phone_number_2"
        label="Patient Phone number 2"
        variant="outlined"
        size="medium"
        disabled
        value={patient?.phone_2 || ''}
      />
    </Stack>
  );
};

export default GeneralInformation;
