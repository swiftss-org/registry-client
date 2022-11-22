/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';

import { Icon } from '@orfium/ictinus';
import { IconWrapper } from 'App.style';
import { PageTitle, PageWrapper } from 'common.style';
import { Tabs } from 'components/Tabs';
import { useResponsiveLayout } from 'hooks/useResponsiveSidebar';
import { useHistory } from 'react-router-dom';
import urls from 'routing/urls';

import { ComponentWrapper } from '../PatientDetails/PatientDetails.style';
import ChangePasswordForm from './components/ChangePasswordForm';

const tabs = [{ label: 'Change Password', value: 'change-password' }];

const Settings: React.FC = () => {
  const { isDesktop } = useResponsiveLayout();

  const [activeTab, setActiveTab] = useState('change-password');
  const history = useHistory();

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
        Settings
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
        {activeTab === 'change-password' ? <ChangePasswordForm /> : <div />}
      </ComponentWrapper>
    </PageWrapper>
  );
};

export default Settings;
