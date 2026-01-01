import React from 'react';

import { Box, Grid, Paper } from '@mui/material';
import { DetailItem, SectionTitle } from 'components/Display';
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
    <Box sx={{ p: 4, bgcolor: 'background.default' }}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper variant="outlined" sx={{ p: 2, height: '100%', borderRadius: 2 }}>
            <SectionTitle title="Personal Details" />
            <Grid container spacing={1.5}>
              <Grid size={{ xs: 12 }}>
                <DetailItem id="full_name" label="Full Name" value={patient?.full_name || ''} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <DetailItem id="gender" label="Gender" value={patient?.gender || ''} />
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <DetailItem id="year_of_birth" label="Year of Birth" value={patient?.year_of_birth || ''} />
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <DetailItem id="month_of_birth" label="Month of Birth" value={patient?.month_of_birth || ''} />
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <DetailItem id="age" label="Age" value={patient?.age || ''} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <DetailItem id="national_id" label="National ID" value={patient?.national_id || ''} />
              </Grid>
            </Grid>
            <br />
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper variant="outlined" sx={{ p: 2, height: '100%', borderRadius: 2 }}>
            <SectionTitle title="Hospital & Contact" />
            <Grid container spacing={1.5}>
              <Grid size={{ xs: 12 }}>
                <DetailItem id="hospital" label="Hospital" value={hospital?.name || ''} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <DetailItem id="patient_hospital_id" label="Patient Hospital ID" value={hospitalPatientID || ''} />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <DetailItem id="phone_1" label="Primary Phone" value={patient?.phone_1 || ''} />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <DetailItem id="phone_2" label="Secondary Phone" value={patient?.phone_2 || ''} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <DetailItem id="address" label="Address" value={patient?.address || ''} />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GeneralInformation;
