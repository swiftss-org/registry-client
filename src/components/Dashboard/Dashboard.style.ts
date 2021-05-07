import styled from '@emotion/styled';
import { flex } from '@orfium/ictinus/dist/theme/functions';

const SIDEBAR_WIDTH_COLLAPSED = 110;
const SIDEBAR_WIDTH_EXPANDED = 309;

type ResponsiveProps = { isLargeDesktop: boolean; isExpanded?: boolean; isSmallDesktop: boolean };

const getWidth = ({ isLargeDesktop, isSmallDesktop }: ResponsiveProps) => {
  return isSmallDesktop ? SIDEBAR_WIDTH_COLLAPSED : isLargeDesktop ? SIDEBAR_WIDTH_EXPANDED : 0;
};
export const GridContainer = styled.div<ResponsiveProps>`
  display: grid;
  grid-template-columns: ${getWidth}px 1fr;

  grid-template-rows: 0fr;
  grid-template-areas:
    'header header'
    'sidebar main'
    'sidebar main';
  height: 100vh;
`;

export const Header = styled.header`
  width: 100%;
  grid-area: header;
`;

export const Main = styled.main`
  grid-area: main;
  padding: ${(props) => props.theme.spacing.md} 48px;
  background-color: ${(props) => props.theme.utils.getColor('lightGray', 100)};
`;

export const SideNav = styled.aside<ResponsiveProps>`
  ${flex};
  grid-area: sidebar;
  background-color: ${(props) => props.theme.palette['white']};
  flex-direction: column;
  height: auto;
  width: ${getWidth}px;
  transition: all 0.2s ease-in-out;
  margin-right: 20px;
  > div {
    -webkit-box-shadow: rgb(0 0 0 / 15%) -4px 3px 20px 0px;
    box-shadow: rgb(0 0 0 / 15%) -4px 3px 20px 0px;
  }
`;
