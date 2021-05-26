import React from 'react';

import { PageWrapper, Subtitle, TextContainer, Title } from './Login.style';
import LoginForm from './components/LoginForm';

const Login: React.FC = () => {
  return (
    <PageWrapper>
      <TextContainer>
        <Title>Welcome back!</Title>
        <Subtitle>Please sign in</Subtitle>
      </TextContainer>
      <LoginForm />
    </PageWrapper>
  );
};

export default Login;
