/** @jsxImportSource @emotion/react */
import React from 'react';

import Notifications from 'components/Notifications';

import LoginForm from './components/LoginForm';
import { Subtitle, TextContainer, Title, Wrapper } from './Login.style';

const Login: React.FC = () => {
  return (
    <Wrapper>
      <Notifications />
      <TextContainer>
        <Title>Welcome!</Title>
        <Subtitle>Please sign in using your credentials to access your account.</Subtitle>
      </TextContainer>
      <LoginForm />
    </Wrapper>
  );
};

export default Login;
