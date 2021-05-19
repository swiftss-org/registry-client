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
