import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { PageWrapper } from './HelloPage.style';

const HelloPage: React.FC = () => {
  return (
    <PageWrapper>
      <Router>
        <div>Hello Orfium</div>
      </Router>
    </PageWrapper>
  );
};

export default HelloPage;
