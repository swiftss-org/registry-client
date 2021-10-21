import React, { useState } from 'react';

import useLocationToGetCurrentMenuItem from '@orfium/ictinus/dist/hooks/useLocationToGetCurrentMenuItem';
import SwiftSSLogo from 'assets/swiftss-logo.png';
import TSALogo from 'assets/tsa-logo.png';
import { useHistory } from 'react-router-dom';

import { useIsLoggedIn } from '../../../hooks/useIsLoggedIn';
import { Props } from '../Drawer';
import MenuItem from './MenuItem/MenuItem';
import {
  Container,
  Header,
  HeaderText,
  Footer,
  FooterText,
  PlaceholderContainer,
  PlaceholderText,
  PlaceholderLink,
} from './Navigation.style';

type NavigationProps = Props;

const Navigation: React.FC<NavigationProps> = ({ menuItems, expanded }) => {
  const [, setOpenMenuItems] = useState<string[]>([]);
  const [currentMenuItem] = useLocationToGetCurrentMenuItem(menuItems, setOpenMenuItems);
  const { isLoggedIn } = useIsLoggedIn();
  const history = useHistory();

  return (
    <Container expanded={expanded}>
      <Header>
        <HeaderText>
          Tanzania <br />
          NMHP Registry
        </HeaderText>
      </Header>
      {isLoggedIn ? (
        menuItems.map(
          (menuItem) =>
            menuItem.visible && (
              <MenuItem
                key={menuItem.url}
                isCurrent={currentMenuItem === menuItem.url}
                {...menuItem}
              />
            )
        )
      ) : (
        <PlaceholderContainer>
          <PlaceholderText>
            For more options please go to sign in page and use your credentials to enter the
            application.
          </PlaceholderText>
          <PlaceholderLink onClick={() => history.push('/login')}>
            Go to sign in page
          </PlaceholderLink>
        </PlaceholderContainer>
      )}
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

export default Navigation;
