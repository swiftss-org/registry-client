import React, { SyntheticEvent, useState } from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import {
  useGetEpisode,
  useGetEpisodeDischarge,
  useGetEpisodeFollowUps,
} from 'hooks/api/patientHooks';
import { useResponsiveLayout } from 'hooks/useResponsiveSidebar';
import { useNavigate, useParams } from 'react-router-dom';
import urls from 'routing/urls';

import Discharge from './components/Discharge';
import FollowUps from './components/FollowUps';
import Surgery from './components/Surgery';

const EpisodeDetails: React.FC = () => {
  const { isDesktop } = useResponsiveLayout();
  const navigate = useNavigate();
  const { hospitalID, patientID, episodeID } = useParams<{
    hospitalID: string;
    patientID: string;
    episodeID: string;
  }>();

  if (!hospitalID || !patientID || !episodeID) {
    throw new Error('Missing required route parameters');
  }

  const { data: episode } = useGetEpisode(episodeID);
  const { data: followUps } = useGetEpisodeFollowUps(episodeID);
  const { data: discharge } = useGetEpisodeDischarge(episodeID);

  const [expanded, setExpanded] = useState<string | false>('surgery');

  const handleChange = (panel: string) => (__event: SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        pb: isDesktop ? 4 : 10,
        pt: 2,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
        <IconButton
          edge="start"
          onClick={() => {
            navigate(urls.patientDetails(hospitalID, patientID, 'episodes'));
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" component="h1" fontWeight={700} color="text.primary">
          Episode Details
        </Typography>
      </Box>

      {episode && (
        <Stack spacing={2}>
          <Paper elevation={0} variant="outlined" sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 4 }}>
              <Box>
                <Typography variant="overline" color="text.secondary">
                  Episode Type
                </Typography>
                <Typography variant="h6">{episode.episode_type}</Typography>
              </Box>
              <Box>
                <Typography variant="overline" color="text.secondary">
                  Surgery Date
                </Typography>
                <Typography variant="h6">{episode.surgery_date}</Typography>
              </Box>
            </Box>
          </Paper>

          {/* Surgery Section */}
          <Accordion
            expanded={expanded === 'surgery'}
            onChange={handleChange('surgery')}
            variant="outlined"
            elevation={0}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography fontWeight={600}>Surgery</Typography>
                <CheckCircleIcon color="success" fontSize="small" />
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Surgery episode={episode} />
            </AccordionDetails>
          </Accordion>

          {/* Discharge Section */}
          <Accordion
            expanded={expanded === 'discharge'}
            onChange={handleChange('discharge')}
            variant="outlined"
            elevation={0}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography fontWeight={600}>
                  {discharge?.infection !== undefined ? 'Discharge' : 'Add New Discharge'}
                </Typography>
                {discharge?.infection !== undefined && (
                  <CheckCircleIcon color="success" fontSize="small" />
                )}
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Discharge discharge={discharge!} />
            </AccordionDetails>
          </Accordion>

          {/* Existing FollowUps */}
          {followUps?.map((followUp, index) => (
            <Accordion
              key={`follow_up_${index}`}
              expanded={expanded === `follow_up_${index}`}
              onChange={handleChange(`follow_up_${index}`)}
              variant="outlined"
              elevation={0}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography fontWeight={600}>Follow Up - {followUp.date}</Typography>
                  <CheckCircleIcon color="success" fontSize="small" />
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <FollowUps followUp={followUp} />
              </AccordionDetails>
            </Accordion>
          ))}

          {/* New FollowUp */}
          <Accordion
            expanded={expanded === 'new_follow_up'}
            onChange={handleChange('new_follow_up')}
            variant="outlined"
            elevation={0}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography fontWeight={600}>Add New Follow Up</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <FollowUps />
            </AccordionDetails>
          </Accordion>
        </Stack>
      )}
    </Container>
  );
};

export default EpisodeDetails;
