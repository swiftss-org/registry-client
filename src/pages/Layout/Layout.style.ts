import styled from '@emotion/styled';

import { scrollBar } from '../../common.style';
import { ResponsiveProps } from '../types';

const SIDEBAR_WIDTH_COLLAPSED = 110;

const getWidth = ({
  isSmallDesktop,
  isMediumDesktop,
  isLargeDesktop,
  isXLargeDesktop,
}: ResponsiveProps) => {
  return isSmallDesktop || isMediumDesktop || isLargeDesktop || isXLargeDesktop
    ? SIDEBAR_WIDTH_COLLAPSED
    : 0;
};

export const PageWrapper = styled.div`
  align-items: center;
  column-gap: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 0;
`;

export const Main = styled.main<{ isDesktop: boolean }>`
  ${scrollBar};

  display: flex;
  grid-area: main;
  overflow-x: hidden;
  overflow-y: hidden;

  ${({ isDesktop }) =>
    isDesktop &&
    `
      align-items: center;
      
    `}
`;

export const MainContainer = styled.div<ResponsiveProps & { isDesktop: boolean }>`
  background: linear-gradient(180deg, #ffffff 0%, #f6f8fb 100%);
  display: grid;
  grid-template-areas:
    'header header'
    'sidebar main'
    'sidebar main';
  grid-template-columns: ${getWidth}px 1fr;
  grid-template-rows: 0fr;
  height: ${({ isDesktop }) => (isDesktop ? '100%' : '100vh')};
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

  & > div {
    border-bottom: none;
  }
`;

export const SideNav = styled.aside`
  grid-area: sidebar;

  & > div {
    border-right: none;
  }
`;
