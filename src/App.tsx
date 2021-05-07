import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppWrapper } from './App.style';
import Routes from './routing/Routes';
import { ThemeProvider } from '@orfium/ictinus';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <AppWrapper>
          <Routes />
        </AppWrapper>
      </Router>
    </ThemeProvider>
  );
};

export default App;
