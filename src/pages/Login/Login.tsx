import React from 'react';

import { Box, Container, Paper, Typography } from '@mui/material';
import Notifications from 'components/Notifications';
import { useSignIn } from 'hooks/api/userHooks';

import LoginForm from './components/LoginForm';

const Login: React.FC = () => {
  const { mutate, isPending } = useSignIn();

  return (
    <Container component="main" maxWidth="xs">
      <Notifications />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            borderRadius: 2
          }}
        >
          <Typography component="h1" variant="h4" fontWeight="bold" gutterBottom>
            Welcome!
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
            Please sign in using your credentials to access your account.
          </Typography>
          <LoginForm onSubmit={mutate} isPending={isPending} />
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
