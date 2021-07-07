import styled from '@emotion/styled';

import theme from 'theme/globals';

export const AppWrapper = styled.div`
  background-color: ${theme.defaultBackgroundColor};
  color: ${theme.defaultTextColor};
  font-family: ${theme.fontFamily};
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
