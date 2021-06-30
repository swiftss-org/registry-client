/** @jsxImportSource @emotion/react */
import React from 'react';

import LoginForm from './components/LoginForm';
import { Subtitle, TextContainer, Title } from './Login.style';

const Login: React.FC = () => {
  return (
    <div css={{ padding: '18px' }}>
      <TextContainer>
        <Title>Welcome back!</Title>
        <Subtitle>Please sign in</Subtitle>
      </TextContainer>
      <LoginForm />
    </div>
  );
};

export default Login;
