import styled from '@emotion/styled';
import { flexCenter } from '@orfium/ictinus/dist/theme/functions';


import { scrollBar } from '../../common.style';
import { ResponsiveProps } from '../types';
import { flex } from 'theme/functions';

const SIDEBAR_WIDTH_COLLAPSED = 110;

const getWidth = ({
  isSmallDesktop,
  isMediumDesktop,
  isLargeDesktop,
  isXLargeDesktop,
}: ResponsiveProps) => {
  console.log(isSmallDesktop, isMediumDesktop, isLargeDesktop, isXLargeDesktop);
  return isSmallDesktop || isMediumDesktop || isLargeDesktop || isXLargeDesktop
    ? SIDEBAR_WIDTH_COLLAPSED
    : 0;
};

export const PageWrapper = styled.div`
  ${flexCenter};
  flex-direction: column;
`;

export const Main = styled.main`
  grid-area: main;
  ${scrollBar};

  overflow-x: hidden;
  overflow-y: auto;

  ${flex}
`;

export const MainContainer = styled.div<ResponsiveProps>`
  display: grid;
  grid-template-areas:
    'header header'
    'sidebar main'
    'sidebar main';
  grid-template-columns: ${getWidth}px 1fr;
  grid-template-rows: 0fr;
  height: 100vh;
  transition: all 0.5s ease-in-out 0s;
`;

export const Header = styled.header`
  grid-area: header;
  width: 100%;
  z-index: 120;
  & > div > div:nth-of-type(2) {
    display: flex;
    flex: 1;
    justify-content: flex-end;
  }
`;

export const SideNav = styled.aside`
  grid-area: sidebar;
`;
