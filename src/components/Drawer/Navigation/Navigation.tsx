import React, { useState } from 'react';

import useLocationToGetCurrentMenuItem from '@orfium/ictinus/dist/hooks/useLocationToGetCurrentMenuItem';
import { useHistory } from 'react-router-dom';

import { useIsLoggedIn } from '../../../hooks/useIsLoggedIn';
import { Props } from '../Drawer';
import MenuItem from './MenuItem/MenuItem';
import {
  Container,
  PlaceholderContainer,
  PlaceholderText,
  PlaceholderLink,
} from './Navigation.style';

type NavigationProps = Props;

const Navigation: React.FC<NavigationProps> = ({ menuItems, expanded, handleClick }) => {
  const [, setOpenMenuItems] = useState<string[]>([]);
  const [currentMenuItem] = useLocationToGetCurrentMenuItem(menuItems, setOpenMenuItems);
  const { isLoggedIn } = useIsLoggedIn();
  const history = useHistory();

  return (
    <Container expanded={expanded}>
      {isLoggedIn ? (
        menuItems.map(
          (menuItem) =>
            menuItem.visible && (
              <MenuItem
                handleClick={handleClick}
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
    </Container>
  );
};

export default Navigation;
