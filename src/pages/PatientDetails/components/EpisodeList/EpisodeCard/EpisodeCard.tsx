import React from 'react';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, Typography, Paper } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import urls from 'routing/urls';

type Props = {
  type?: string;
  date?: string;
  episodeID?: number;
};

const EpisodeCard: React.FC<Props> = ({ type, date, episodeID }) => {
  const navigate = useNavigate();
  const { hospitalID, patientID } = useParams<{ hospitalID: string; patientID: string }>();

  const handleClick = () => {
    if (hospitalID && patientID && episodeID) {
      navigate(urls.episodeDetails(hospitalID, patientID, episodeID.toString()));
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 2,
        cursor: 'pointer',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        '&:hover': {
          bgcolor: 'action.hover'
        }
      }}
      onClick={handleClick}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" fontWeight={600} color="text.primary">
          {type}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {date}
        </Typography>
      </Box>
      <ChevronRightIcon color="action" />
    </Paper>
  );
};

export default EpisodeCard;
