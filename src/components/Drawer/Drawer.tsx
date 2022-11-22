import React from 'react';

import { Button, useBreakpoints } from '@orfium/ictinus';
import { useHistory } from 'react-router-dom';

import SwiftSSLogo from '../../assets/swiftss-logo.png';
import TSALogo from '../../assets/tsa-logo.png';
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
          Tanzania <br />
          NMHP Registry
        </HeaderText>
      </Header>
      <Navigation handleClick={handleClick} {...props} />

      <Footer>
        <div style={{ display: 'flex', gap: '12px' }}>
          <img width={44} src={SwiftSSLogo} />
          <img width={52} src={TSALogo} />
        </div>

        <FooterText>
          The Tanzania Mesh Hernia Project Registry is a joint project between Swiftss and the TSA.
        </FooterText>
      </Footer>
    </Container>
  );
};

export default Drawer;
