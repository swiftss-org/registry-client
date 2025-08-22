/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';
import { IconWrapper } from 'App.style';
import { PageTitle, PageWrapper } from 'common.style';
import { Tabs } from 'components/Tabs';
import { useResponsiveLayout } from 'hooks/useResponsiveSidebar';
import { useNavigate } from 'react-router-dom';
import urls from 'routing/urls';

import { ComponentWrapper } from '../PatientDetails/PatientDetails.style';
import ChangePasswordForm from './components/ChangePasswordForm';

const tabs = [{ label: 'Change Password', value: 'change-password' }];

const Settings: React.FC = () => {
  const { isDesktop } = useResponsiveLayout();

  const [activeTab, setActiveTab] = useState('change-password');
  const navigate = useNavigate();

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
        Settings
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
          {activeTab === 'change-password' ? <ChangePasswordForm /> : <div />}
        </ComponentWrapper>
      </Tabs>
    </PageWrapper>
  );
};

export default Settings;
