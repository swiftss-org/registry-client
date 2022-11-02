import styled from '@emotion/styled';

import { appTheme } from './theme/globals';

export const AppWrapper = styled.div<{ isDesktop: boolean }>`
  background-color: white;
  color: black;
  font-family: ${appTheme.fontFamily};
  height: calc(100vh);
  overflow: hidden;
  position: relative;
  width: 100%;
`;

export const TopBar = styled.div`
  align-items: center;
  border-bottom: 1px black solid;
  color: black;
  display: flex;
  flex-direction: row;
  font-weight: 700;
  position: sticky;
  width: 100%;
`;
