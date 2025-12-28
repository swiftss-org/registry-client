
import React from 'react';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PersonIcon from '@mui/icons-material/Person';
import { Box, Paper, Typography } from '@mui/material';
import { PatientAPI } from 'models/apiTypes';
import { useNavigate } from 'react-router-dom';

type Props = PatientAPI & { selectedHospital?: number };

const PatientCard: React.FC<Props> = ({
  full_name,
  gender,
  age,
  national_id,
  id,
  hospital_mappings,
  selectedHospital,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/patients/${selectedHospital}/${id}`);
  };

  return (
    <Paper
      elevation={0}
      onClick={handleClick}
      sx={{
        border: '1px solid',
        borderColor: 'primary.main',
        borderRadius: 1,
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        padding: 2,
        transition: 'all 0.1s ease-in-out',
        '&:hover': {
          bgcolor: 'grey.100',
        },
        '&:active': {
          bgcolor: 'grey.200',
        },
        mb: 1
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <PersonIcon sx={{ color: 'primary.dark', fontSize: 24 }} />
        <ArrowForwardIcon sx={{ color: 'primary.light', fontSize: 24 }} />
      </Box>

      <Typography variant="h6" sx={{ color: 'primary.dark', fontWeight: 700, mb: 1 }}>
        {full_name}
      </Typography>

      <Typography variant="body2" sx={{ color: 'primary.dark', fontWeight: 500, mb: 2 }}>
        {gender}, {age}
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="caption" sx={{ color: 'grey.500' }}>
          Patient Hospital ID:
        </Typography>
        <Typography variant="body2" sx={{ color: 'primary.dark', fontWeight: 700 }}>
          {
            hospital_mappings.find((hospital) => hospital?.hospital_id === selectedHospital)
              ?.patient_hospital_id
          }
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="caption" sx={{ color: 'grey.500' }}>
          National ID:
        </Typography>
        <Typography variant="body2" sx={{ color: 'primary.dark', fontWeight: 700 }}>
          {national_id}
        </Typography>
      </Box>
    </Paper>
  );
};

export default PatientCard;
