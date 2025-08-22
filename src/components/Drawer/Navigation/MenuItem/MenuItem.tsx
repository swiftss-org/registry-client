import React, { memo } from 'react';

import { MenuItem as MenuItemProps } from 'components/Drawer/types';

import { MenuItemText, MenuLink } from '../Navigation.style';

type Props = {
  /** Defines the current menu item whose submenu item is currently selected */
  isCurrent: boolean;
  handleClick?: () => void;
} & MenuItemProps;

const MenuItem: React.FC<Props> = memo(
  ({ isCurrent, name, url, handleClick, state: linkState }) => {
    const MenuItemContent = (
      <React.Fragment>
        <MenuItemText current={isCurrent} className={'menu-item-text'}>
          {name}
        </MenuItemText>
      </React.Fragment>
    );

    return (
      <React.Fragment>
        <MenuLink
          to={url}
          state={linkState}
          data-testid={url}
          className={({ isActive }) => (isActive ? 'active' : undefined)}
          key={url}
          onClick={handleClick}
        >
          {MenuItemContent}
        </MenuLink>
      </React.Fragment>
    );
  }
);

MenuItem.displayName = 'MenuItem';
export default MenuItem;
