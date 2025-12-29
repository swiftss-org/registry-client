/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Box,
  Container,
  IconButton,
  Paper,
  Tab,
  Tabs as MuiTabs,
  Typography
} from '@mui/material';
import ConfirmationModal from 'components/ConfirmationModal';
import Notifications from 'components/Notifications';
import { useChangePassword } from 'hooks/api/userHooks';

import { useNavigate } from 'react-router-dom';
import urls from 'routing/urls';

import ChangePasswordForm from './components/ChangePasswordForm';

const tabs = [{ label: 'Change Password', value: 'change-password' }];

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('change-password');
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const navigate = useNavigate();

  const { mutate: changePassword, isPending: isChangePasswordPending } = useChangePassword();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Notifications />
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton
          onClick={() => {
            if (isFormDirty) {
              setShowWarningModal(true);
            } else {
              navigate(urls.patients());
            }
          }}
          edge="start"
          sx={{ mr: 2 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Settings
        </Typography>
      </Box>

      <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <MuiTabs
            value={activeTab}
            onChange={(__, newValue) => setActiveTab(newValue)}
            aria-label="settings tabs"
            sx={{ px: 2 }}
          >
            {tabs.map((tab) => (
              <Tab key={tab.value} label={tab.label} value={tab.value} />
            ))}
          </MuiTabs>
        </Box>

        <Box sx={{ p: 4 }}>
          {activeTab === 'change-password' ? (
            <ChangePasswordForm onSubmit={changePassword} isPending={isChangePasswordPending} onDirtyChange={setIsFormDirty} />
          ) : (
            <div />
          )}
        </Box>
      </Paper>
      {showWarningModal && (
        <ConfirmationModal
          onClose={() => {
            setShowWarningModal(false);
          }}
          title={'Are you sure you want to leave this page?'}
          subtitle={
            "You have unsaved changes. If you leave this page, your changes will be lost."
          }
          buttonText={'Yes, leave page'}
          onClick={() => navigate(urls.patients())}
        />
      )}
    </Container>
  );
};

export default Settings;
