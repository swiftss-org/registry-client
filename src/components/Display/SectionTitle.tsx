import React from 'react';

import { Typography } from '@mui/material';

interface SectionTitleProps {
  title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => (
  <Typography variant="h6" color="primary" sx={{ mb: 2, fontWeight: 600, mt: 1 }}>
    {title}
  </Typography>
);

export default SectionTitle;
