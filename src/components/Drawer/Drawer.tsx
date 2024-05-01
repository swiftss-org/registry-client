import React from 'react';

import { Button, useBreakpoints } from '@orfium/ictinus';
import GHLogo from 'assets/gh-logo.png'
import SLLogo from 'assets/sl-logo.png';
import SwiftSSLogo from 'assets/swiftss-logo.png';
import TSALogoLocal from 'assets/tsa-logo-local.png';
import TSALogoTest from 'assets/tsa-logo-test.png';
import TSALogo from 'assets/tsa-logo.png';
import { useHistory } from 'react-router-dom';

import { useIsLoggedIn } from '../../hooks/useIsLoggedIn';
import urls from '../../routing/urls';
import { clearUserStorage } from '../../utils/storage';
import { Container } from './Drawer.style';
import Navigation from './Navigation/Navigation';
import {
  Footer,
  FooterText,
  Header,
  HeaderText,
  UserContainer,
} from './Navigation/Navigation.style';
import { MenuItem } from './types';

export type Props = {
  /** Defines if the drawer is expanded */
  expanded: boolean;
  /** Changes if the drawer is expanded */
  setExpanded: (v: boolean) => void;
  /** The menu items to be displayed in the drawer */
  menuItems: MenuItem[];
  handleClick?: () => void;
};

let SiteLogo: string;
SiteLogo = TSALogo;
if (window.location.hostname === 'tmh-registry-client.herokuapp.com') {
  // Tanzania
  SiteLogo = TSALogo;
} else if (window.location.hostname === 'tmh-registry-client-gh-6a64e51863f6.herokuapp.com') {
  // Ghana
  SiteLogo = GHLogo;
} else if (window.location.hostname === 'tmh-registry-client-sl.herokuapp.com') {
  // Sierra Leone
  SiteLogo = SLLogo;
} else if (window.location.hostname === 'tmh-registry-client-staging.herokuapp.com') {
  // Staging site
  SiteLogo = TSALogoTest;
} else if (window.location.hostname === 'localhost') {
  // Localhost
  SiteLogo = TSALogoLocal;
}

const Drawer: React.FC<Props> = (props) => {
  const breakpoints = useBreakpoints();
  const isSmallDesktop = breakpoints.des1200 && !breakpoints.des1440;
  const { isLoggedIn } = useIsLoggedIn();
  const history = useHistory();

  const handleLogout = () => {
    clearUserStorage();
    history.push('/');
  };

  const handleSettings = () => {
    handleClick();
    history.push(urls.settings());
  };

  const handleClick = () => {
    props.setExpanded(false);
  };

  const isDesktop =
    breakpoints.des1200 || breakpoints.des1440 || breakpoints.des1366 || breakpoints.des1920;

  const getLocalisedFooterText = () => {
    if (window.location.hostname === 'tmh-registry-client.herokuapp.com') {
      // Tanzania
      return (
        <div>The Tanzania National Mesh Hernia Project is an original collaboration between SWIFTSS
          and the TSA (and the forerunner of the Affordable Mesh Hernia Surgery Initiative). For
          more information visit <a href="https://swiftss.org/">www.swiftss.org</a>.</div>
      );
    } else if (window.location.hostname === 'tmh-registry-client-gh-6a64e51863f6.herokuapp.com') {
      // Ghana
      return (
        <div>The Affordable Mesh Hernia Surgery Initiative is a collaboration between SWIFTSS and
          the Ghanaian AMHSI working group. For more information visit
          <a href="https://swiftss.org/">www.swiftss.org</a>.</div>
      );
    } else if (window.location.hostname === 'tmh-registry-client-sl.herokuapp.com') {
      // Sierra Leone
      return (
        <div>The Affordable Mesh Hernia Surgery Initiative is a collaboration between SWIFTSS and
          the Sierra Leone AMHSI working group.  For more information visit
          <a href="https://swiftss.org/">www.swiftss.org</a>.</div>
      );
    } else if (window.location.hostname === 'tmh-registry-client-staging.herokuapp.com') {
      // Staging site
      return (
        <div>This is the test site for the AMHSI. Please enjoy the freedom to try it out. Look
          around and create some fake patients, episodes, discharges and follow ups. PLEASE DO NOT
          USE ANY REAL DATA ON THIS SITE.</div>
      );
    } else if (window.location.hostname === 'localhost') {
      // Localhost
      return (
        <div>The Tanzania National Mesh Hernia Project is an original collaboration between SWIFTSS
          and the TSA (and the forerunner of the Affordable Mesh Hernia Surgery Initiative). For
          more information visit <a href="https://swiftss.org/">www.swiftss.org</a>. LOCALHOST</div>
      )
    } else {
      return (
        <div>The Tanzania National Mesh Hernia Project is an original collaboration between SWIFTSS
          and the TSA (and the forerunner of the Affordable Mesh Hernia Surgery Initiative). For
          more information visit <a href="https://swiftss.org/">www.swiftss.org</a>.</div>
      );
    }
  };

  const footerText= getLocalisedFooterText();

  const getLocalisedHeaderText = () => {
    if (window.location.hostname === 'tmh-registry-client.herokuapp.com') {
      // Tanzania
      return (
        <div>Tanzania National <br />
          Mesh Hernia Project <br />
          eRegistry</div>
      );
    } else if (window.location.hostname === 'tmh-registry-client-gh-6a64e51863f6.herokuapp.com') {
      // Ghana
      return (
        <div>AMHSI Ghana <br />
          eRegistry</div>
      );
    } else if (window.location.hostname === 'tmh-registry-client-sl.herokuapp.com') {
      // Sierra Leone
      return (
        <div>AMHSI Sierra Leone <br />
          eRegistry</div>
      );
    } else if (window.location.hostname === 'tmh-registry-client-staging.herokuapp.com') {
      // Staging site
      return (
        <div>AMHSI <br />
          TEST SITE</div>
      );
    } else if (window.location.hostname === 'localhost') {
      // Localhost
      return (
        <div>eRegistry <br />
          LOCALHOST SITE</div>
      )
    } else {
      return (
        <div>Tanzania National <br />
          Mesh Hernia Project <br />
          eRegistry</div>
      );
    }
  };

  const headerText= getLocalisedHeaderText();

  return (
    <Container
      expanded={props.expanded}
      isDesktop={isDesktop}
      isSmallDesktop={isSmallDesktop}
      onMouseEnter={() => isSmallDesktop && props.setExpanded(true)}
      onMouseLeave={() => isSmallDesktop && props.setExpanded(false)}
    >
      <Header>
        {isLoggedIn && (
          <UserContainer>
            <Button
              transparent
              filled={false}
              buttonType={'button'}
              color={'lightGray-100'}
              onClick={handleSettings}
            >
              Settings
            </Button>
            <Button
              transparent
              filled={false}
              buttonType={'button'}
              color={'lightGray-100'}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </UserContainer>
        )}
        <HeaderText>
          {headerText}
        </HeaderText>
      </Header>
      <Navigation handleClick={handleClick} {...props} />

      <Footer>
        <div style={{ display: 'flex', gap: '12px' }}>
          <img width={44} src={SwiftSSLogo} />
          <img width={52} src={SiteLogo} />
        </div>

        <FooterText>
          {footerText}
        </FooterText>
      </Footer>
    </Container>
  );
};

export default Drawer;
