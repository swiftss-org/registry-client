import React, { FC } from 'react';

import { Box, Grid } from '@mui/material';
import { DetailItem, SectionTitle } from 'components/Display';
import { FollowUpAPI } from 'models/apiTypes';

const FollowUpReadOnly: FC<{
  followUp: FollowUpAPI;
}> = ({ followUp }) => {
  return (
    <Box>
      <SectionTitle title="Follow Up Details" />
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <DetailItem id="follow_up_date" label="Date" value={followUp.date} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <DetailItem id="pain_severity" label="Pain Severity" value={followUp.pain_severity} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <DetailItem id="mesh_awareness" label="Mesh Awareness" value={followUp.mesh_awareness} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <DetailItem id="seroma" label="Seroma" value={followUp.seroma} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <DetailItem id="infection" label="Infection" value={followUp.infection} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <DetailItem id="numbness" label="Numbness" value={followUp.numbness} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <DetailItem id="recurrence" label="Recurrence" value={followUp.recurrence} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <DetailItem id="further_surgery_need" label="Need for further surgery?" value={followUp.further_surgery_need} />
        </Grid>
      </Grid>

      <SectionTitle title="Seen By" />
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <DetailItem
            id="primary_attendee"
            label="Seen By"
            value={
              followUp.primary_attendee
                ? `${followUp.primary_attendee.user.first_name} ${followUp.primary_attendee.user.last_name}`
                : 'Not recorded'
            }
          />
        </Grid>
      </Grid>

      {followUp.surgery_comments_box && (
        <Box sx={{ mt: 2 }}>
          <DetailItem id="follow_up_comments" label="Comments" value={followUp.surgery_comments_box} />
        </Box>
      )}
    </Box>
  );
};

export default FollowUpReadOnly;
