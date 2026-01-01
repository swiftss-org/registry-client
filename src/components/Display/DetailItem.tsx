import React from 'react';

import { Box, Typography } from '@mui/material';

interface DetailItemProps {
  id: string;
  label: string;
  value: string | number | boolean | undefined;
}

const DetailItem: React.FC<DetailItemProps> = ({ id, label, value }) => {
  let displayValue: string | number = '—';

  if (value !== undefined && value !== null && value !== '') {
    if (typeof value === 'boolean') {
      displayValue = value ? 'Yes' : 'No';
    } else {
      displayValue = value;
    }
  }

  return (
    <Box sx={{ mb: 1.5 }}>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5, fontWeight: 500 }}>
        {label}
      </Typography>
      <Typography id={id} variant="body1" color="text.primary" sx={{ fontWeight: 400 }}>
        {displayValue}
      </Typography>
    </Box>
  );
};

export default DetailItem;
