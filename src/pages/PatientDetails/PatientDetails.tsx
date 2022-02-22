/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';

import { Button, Icon } from '@orfium/ictinus';
import { useGetHospital, useGetPatient } from 'hooks/api/patientHooks';
import { useHistory, useRouteMatch } from 'react-router-dom';

import { ButtonContainer, PageTitle, PageWrapper } from '../../common.style';
import { Tabs } from '../../components/Tabs';
import urls from '../../routing/urls';
import GeneralInformation from './components/GeneralInformation';
import { ComponentWrapper } from './PatientDetails.style';

const tabs = [
  { label: 'General Information', value: 'info' },
  { label: 'Episodes', value: 'episodes' },
];

const PatientDetails: React.FC = () => {
  const match = useRouteMatch<{ hospitalID?: string; patientID?: string }>();
  const [activeTab, setActiveTab] = useState('info');
  const history = useHistory();

  const { hospitalID, patientID } = match.params;

  const { data: patient, isLoading: isPatientLoading } = useGetPatient(patientID ?? '');
  const { data: hospital, isLoading: isHospitalLoading } = useGetHospital(hospitalID ?? '');

  const isLoading = isHospitalLoading || isPatientLoading;

  return (
    <PageWrapper>
      <PageTitle>
        <Icon
          name="fatArrowLeft"
          size={24}
          color={'lightGray-700'}
          onClick={() => {
            history.push(urls.patients());
          }}
        />
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
          <div>Episodes</div>
        )}
      </ComponentWrapper>
      <ButtonContainer>
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
