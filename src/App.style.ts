import styled from '@emotion/styled';

import theme from 'theme/globals';

export const AppWrapper = styled.div`
  width: 100%;
  height: calc(100vh);
  background-color: ${theme.defaultBackgroundColor};
  font-family: ${theme.fontFamily};
  color: ${theme.defaultTextColor};
  position: relative;
  overflow: hidden;
`;

export const TopBar = styled.div`
  width: 100%;
  position: sticky;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: black;
  font-weight: 700;
  border-bottom: 1px black solid;
`;
