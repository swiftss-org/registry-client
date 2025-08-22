/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, IconButton } from '@mui/material';
import { IconWrapper } from 'App.style';
import { useGetHospital, useGetPatient } from 'hooks/api/patientHooks';
import { useNavigate, useParams } from 'react-router-dom';

import EpisodeList from './components/EpisodeList';
import GeneralInformation from './components/GeneralInformation';
import { ComponentWrapper } from './PatientDetails.style';
import { ButtonContainer, PageTitle, PageWrapper } from '../../common.style';
import { Tabs } from '../../components/Tabs';
import { useResponsiveLayout } from '../../hooks/useResponsiveSidebar';
import urls from '../../routing/urls';

const tabs = [
  { label: 'General Information', value: 'info' },
  { label: 'Episodes', value: 'episodes' },
];

const PatientDetails: React.FC = () => {
  const { isDesktop } = useResponsiveLayout();

  const [activeTab, setActiveTab] = useState('info');
  const navigate = useNavigate();

  const { hospitalID, patientID } = useParams<{ hospitalID?: string; patientID?: string }>();

  const { data: patient, isLoading: isPatientLoading } = useGetPatient(patientID ?? '');
  const { data: hospital, isLoading: isHospitalLoading } = useGetHospital(hospitalID ?? '');

  const isLoading = isHospitalLoading || isPatientLoading;

  return (
    <PageWrapper isDesktop={isDesktop}>
      <PageTitle>
        <IconWrapper>
          <IconButton
            onClick={() => {
              navigate(urls.patients());
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        </IconWrapper>
        Patient Details
      </PageTitle>
      <Tabs
        matchActiveDataType={activeTab}
        onTabClick={(tabId) => {
          setActiveTab(tabId);
        }}
        tabs={tabs}
        shouldDisplayTabs
      >
        <ComponentWrapper>
          {activeTab === 'info' ? (
            <GeneralInformation patient={patient} hospital={hospital} />
          ) : (
            <EpisodeList patient={patient} />
          )}
        </ComponentWrapper>
      </Tabs>
      <ButtonContainer isDesktop={isDesktop}>
        <Button
          variant="contained"
          color="primary"
          disabled={isLoading}
          fullWidth
          size="medium"
          onClick={() => navigate(`${location.pathname}/add-episode`)}
        >
          Register new episode
        </Button>
      </ButtonContainer>
    </PageWrapper>
  );
};

export default PatientDetails;
