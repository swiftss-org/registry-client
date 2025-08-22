import React from 'react';

import useCurrentMenuItem from './useCurrentMenuItem';
import { useIsLoggedIn } from '../../../hooks/useIsLoggedIn';
import { Props } from '../Drawer';
import MenuItem from './MenuItem/MenuItem';
import { Container, PlaceholderContainer, PlaceholderText } from './Navigation.style';

type NavigationProps = Props;

const Navigation: React.FC<NavigationProps> = ({ menuItems, expanded, handleClick }) => {
  const currentMenuItem = useCurrentMenuItem(menuItems);
  const { isLoggedIn } = useIsLoggedIn();

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
        </PlaceholderContainer>
      )}
    </Container>
  );
};

export default Navigation;
