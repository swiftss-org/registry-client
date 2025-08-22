import styled from '@emotion/styled';
import { rem } from 'polished';
import { NavLink } from 'react-router-dom';

export const Container = styled.div<{ expanded: boolean }>`
  background-color: white;
  box-sizing: border-box;
  height: 100%;
  position: relative;
  transition: opacity 0.2s ease-in-out, width 0.2s ease-in-out;
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
  font-size: ${(props) => props.theme.typography.body1.fontSize};
  line-height: ${rem(24)};
`;

export const PlaceholderLink = styled.span`
  color: ${(props) => props.theme.palette.primary.dark};
  cursor: pointer;
  font-weight: ${(props) => props.theme.typography.body1.fontWeight};
`;

export const Header = styled.div`
  background-color: ${(props) => props.theme.palette.primary.dark};
  color: white;
  height: ${rem(176)};
  padding: ${rem(16)};
  position: relative;
`;

export const HeaderText = styled.span`
  bottom: ${rem(24)};
  font-size: ${(props) => props.theme.typography.h1.fontSize};
  font-weight: ${(props) => props.theme.typography.h1.fontWeight};
  left: ${rem(16)};
  line-height: ${rem(24)};
  position: absolute;
`;

export const UserContainer = styled.div`
  display: flex;
  gap: ${rem(8)};
  justify-content: end;
`;

export const Footer = styled.div`
  border-top: 1px solid ${(props) => props.theme.palette.grey[200]};
  bottom: ${rem(16)};
  display: flex;
  flex-direction: column;
  gap: ${rem(8)};
  height: ${rem(131)};
  padding: ${rem(16)};
  position: absolute;
`;

export const FooterText = styled.span`
  font-size: ${(props) => props.theme.typography.body2.fontSize};
  line-height: ${rem(17)};
`;

export const MenuLink = styled(NavLink)`
  align-items: center;
  color: ${(props) => props.theme.palette.common.black};
  cursor: default;
  display: flex;
  font-size: ${rem(16)};
  font-weight: ${(props) => props.theme.typography.body1.fontWeight};
  height: ${rem(44)};
  padding: 0 ${(props) => props.theme.spacing(4)};

  &:hover {
    background-color: ${(props) => props.theme.palette.grey[100]};
  }

  text-decoration: none;
`;

export const MenuItemText = styled.span<{ current: boolean }>`
  font-weight: ${(props) => (props.current ? props.theme.typography.body1.fontWeight : 'initial')};
  transition: font-weight 0.2s ease-in-out;
`;
