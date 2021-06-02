import React from 'react';

import { Subtitle, TextContainer, Title } from './Login.style';
import LoginForm from './components/LoginForm';

const Login: React.FC = () => {
  return (
    <>
      <TextContainer>
        <Title>Welcome back!</Title>
        <Subtitle>Please sign in</Subtitle>
      </TextContainer>
      <LoginForm />
    </>
  );
};

export default Login;
