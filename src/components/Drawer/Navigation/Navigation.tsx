import React from 'react';

import { Box, List, Typography } from '@mui/material';
import { useIsLoggedIn } from 'hooks/useIsLoggedIn';

import { Props as DrawerProps } from '../Drawer';
import MenuItem from './MenuItem/MenuItem';
import useCurrentMenuItem from './useCurrentMenuItem';

const Navigation: React.FC<DrawerProps> = ({ menuItems, expanded, handleClick }) => {
  const currentMenuItem = useCurrentMenuItem(menuItems);
  const { isLoggedIn } = useIsLoggedIn();

  return (
    <Box sx={{ width: '100%', position: 'relative' }}>
      {isLoggedIn ? (
        <List disablePadding>
          {menuItems.map(
            (menuItem) =>
              menuItem.visible && (
                <MenuItem
                  handleClick={handleClick}
                  key={menuItem.url}
                  isCurrent={currentMenuItem === menuItem.url}
                  expanded={expanded}
                  {...menuItem}
                />
              )
          )}
        </List>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            p: 2,
          }}
        >
          <Typography variant="body1">
            For more options please go to sign in page and use your credentials to enter the
            application.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Navigation;
