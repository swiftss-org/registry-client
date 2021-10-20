import styled from '@emotion/styled';
import { transition } from '@orfium/ictinus/dist/theme/functions';
import { rem } from 'polished';
import { NavLink } from 'react-router-dom';

import { flexCenterVertical } from '../../../theme/functions';

export const Container = styled.div<{ expanded: boolean }>`
  ${transition(10.2)};
  background-color: white;
  box-sizing: border-box;
  height: 100%;
  position: relative;
  width: 100%;
  .menu-item-text,
  .submenu-item-text {
    opacity: ${(props) => (props.expanded ? 1 : 0)};
    white-space: nowrap;
    width: ${(props) => (props.expanded ? rem(204) : rem(16))};
  }

  #submenu-item-link {
    padding-left: ${(props) => (props.expanded ? 'auto' : rem(40))};
  }
`;

export const PlaceholderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${rem(24)};
  padding: ${rem(16)};
`;

export const PlaceholderText = styled.span`
  font-size: ${(props) => props.theme.typography.fontSizes[16]};
  line-height: ${rem(24)};
`;

export const PlaceholderLink = styled.span`
  color: ${(props) => props.theme.utils.getColor('blue', 500)};
  cursor: pointer;
  font-weight: ${(props) => props.theme.typography.weights.bold};
`;

export const Header = styled.div`
  background-color: ${(props) => props.theme.utils.getColor('blue', 500)};
  color: white;
  position: relative;
  height: ${rem(176)};
  padding: ${rem(16)}};

`;

export const HeaderText = styled.span`
  bottom: ${rem(24)};
  font-size: ${(props) => props.theme.typography.fontSizes[20]};
  font-weight: ${(props) => props.theme.typography.weights.regular};
  left: ${rem(16)};
  line-height: ${rem(24)};
  position: absolute;
`;

export const Footer = styled.div`
  border-top: 1px solid ${(props) => props.theme.utils.getColor('lightGray', 200)};
  bottom: ${rem(16)};
  display: flex;
  flex-direction: column;
  gap: ${rem(8)};
  height: ${rem(131)};
  padding: ${rem(16)};
  position: absolute;
`;

export const FooterText = styled.span`
  font-size: ${(props) => props.theme.typography.fontSizes[10]};
  line-height: ${rem(17)};
`;

export const MenuLink = styled(NavLink)`
  ${flexCenterVertical};
  color: ${(props) => props.theme.palette.black};
  cursor: default;
  font-size: ${rem(16)};
  font-weight: ${(props) => props.theme.typography.weights.regular};
  height: ${rem(44)};
  padding: 0 ${(props) => props.theme.spacing.md};

  &:hover {
    background-color: ${(props) => props.theme.utils.getColor('lightGray', 100)};
  }

  text-decoration: none;
`;

export const MenuItemText = styled.span<{ current: boolean }>`
  ${transition(0.2)};
  font-weight: ${(props) => (props.current ? props.theme.typography.weights.bold : 'initial')};
`;
