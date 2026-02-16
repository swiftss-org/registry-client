import React, { memo } from 'react';

import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import { MenuItem as MenuItemProps } from 'components/Drawer/types';
import { NavLink } from 'react-router-dom';

type Props = {
  /** Defines the current menu item whose submenu item is currently selected */
  isCurrent: boolean;
  handleClick?: () => void;
  expanded: boolean;
} & MenuItemProps;

const MenuItem: React.FC<Props> = memo(({ isCurrent, name, url, handleClick, state: linkState, expanded }) => {
  return (
    <ListItem disablePadding>
      <ListItemButton
        component={NavLink}
        to={url}
        state={linkState}
        data-testid={url}
        onClick={handleClick}
        selected={isCurrent}
        sx={{
          height: 44,
          px: 4,
          '&:hover': {
            backgroundColor: 'grey.100',
          },
          '&.active': {
            backgroundColor: 'grey.100',
          },
        }}
      >
        <ListItemText
          primary={name}
          sx={{
            opacity: expanded ? 1 : 0,
            whiteSpace: 'nowrap',
            transition: 'opacity 0.2s ease-in-out, width 0.2s ease-in-out',
            overflow: 'hidden',
          }}
          primaryTypographyProps={{
            fontWeight: isCurrent ? 700 : 400,
            variant: 'body1',
          }}
        />
      </ListItemButton>
    </ListItem>
  );
});

MenuItem.displayName = 'MenuItem';
export default MenuItem;
