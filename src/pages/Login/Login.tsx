import React from 'react';

import { PageWrapper, Subtitle, TextContainer, Title } from './Login.style';

const Login: React.FC = () => {
  return (
    <PageWrapper>
      <TextContainer>
        <Title>Welcome back!</Title>
        <Subtitle>Please sign in</Subtitle>
      </TextContainer>
    </PageWrapper>
  );
};

export default Login;
