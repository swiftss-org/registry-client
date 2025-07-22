/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';

import { Button, Icon } from '@orfium/ictinus';
import { IconWrapper } from 'App.style';
import { useGetHospital, useGetPatient } from 'hooks/api/patientHooks';
import { useHistory, useRouteMatch } from 'react-router-dom';

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

  const match = useRouteMatch<{ hospitalID?: string; patientID?: string }>();
  const [activeTab, setActiveTab] = useState('info');
  const history = useHistory();

  const { hospitalID, patientID } = match.params;

  const { data: patient, isLoading: isPatientLoading } = useGetPatient(patientID ?? '');
  const { data: hospital, isLoading: isHospitalLoading } = useGetHospital(hospitalID ?? '');

  const isLoading = isHospitalLoading || isPatientLoading;

  return (
    <PageWrapper isDesktop={isDesktop}>
      <PageTitle>
        <IconWrapper>
          <Icon
            name="fatArrowLeft"
            size={24}
            color={'lightGray-700'}
            onClick={() => {
              history.push(urls.patients());
            }}
          />
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
      />
      <ComponentWrapper>
        {activeTab === 'info' ? (
          <GeneralInformation patient={patient} hospital={hospital} />
        ) : (
          <EpisodeList patient={patient} />
        )}
      </ComponentWrapper>
      <ButtonContainer isDesktop={isDesktop}>
        <Button
          color={'blue-500'}
          buttonType="button"
          disabled={isLoading}
          block
          size="md"
          onClick={() => history.push(`${history.location.pathname}/add-episode`)}
        >
          Register new episode
        </Button>
      </ButtonContainer>
    </PageWrapper>
  );
};

export default PatientDetails;
