import styled from '@emotion/styled';
import { flexCenter } from '@orfium/ictinus/dist/theme/functions';

import { flex } from 'theme/functions';
import { scrollBar } from '../../common.style';
import { ResponsiveProps } from '../types';

const SIDEBAR_WIDTH_COLLAPSED = 110;
const SIDEBAR_WIDTH_EXPANDED = 308;

const getWidth = ({
  isSmallDesktop,
  isMediumDesktop,
  isLargeDesktop,
  isXLargeDesktop,
}: ResponsiveProps) => {
  return isSmallDesktop || isMediumDesktop
    ? SIDEBAR_WIDTH_COLLAPSED
    : isLargeDesktop || isXLargeDesktop
    ? SIDEBAR_WIDTH_EXPANDED
    : 0;
};

export const PageWrapper = styled.div`
  ${flexCenter};
  flex-direction: column;
`;

export const Main = styled.main`
  grid-area: main;
  ${scrollBar};

  overflow-y: auto;
  overflow-x: hidden;

  ${flex}
`;

export const MainContainer = styled.div<ResponsiveProps>`
  display: grid;
  grid-template-columns: ${getWidth}px 1fr;
  grid-template-rows: 0fr;
  grid-template-areas:
    'header header'
    'sidebar main'
    'sidebar main';
  height: 100vh;
  transition: all 0.5s ease-in-out 0s;
`;

export const Header = styled.header`
  width: 100%;
  grid-area: header;
  z-index: 120;
  & > div > div:nth-of-type(2) {
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }
`;

export const SideNav = styled.aside`
  grid-area: sidebar;
`;
