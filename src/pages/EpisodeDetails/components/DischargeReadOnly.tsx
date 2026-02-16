import React, { FC } from 'react';

import { Box, Grid } from '@mui/material';
import { DetailItem, SectionTitle } from 'components/Display';
import { DischargeAPI } from 'models/apiTypes';

const DischargeReadOnly: FC<{
  discharge: DischargeAPI;
}> = ({ discharge }) => {

  return (
    <Box>
      <SectionTitle title="Discharge Details" />
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <DetailItem id="discharge_date" label="Date" value={discharge.date} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <DetailItem 
            id="aware_of_mesh" 
            label="Antibiotics given on discharge" 
            value={discharge.aware_of_mesh}
          />
        </Grid>
        {discharge.aware_of_mesh && (
          <Grid size={{ xs: 12, sm: 6 }}>
            <DetailItem 
              id="discharge_duration" 
              label="Discharge Duration (days)" 
              value={discharge.discharge_duration || ''} 
            />
          </Grid>
        )}
        <Grid size={{ xs: 12 }}>
          <DetailItem 
            id="post_operative_complication"
            label="Post-operative complications" 
            value={discharge.infection || 'None'} 
          />
        </Grid>
      </Grid>

      {discharge.comments && (
        <Box sx={{ mt: 2 }}>
          <DetailItem id="discharge_comments" label="Comments" value={discharge.comments} />
        </Box>
      )}
    </Box>
  );
};

export default DischargeReadOnly;
