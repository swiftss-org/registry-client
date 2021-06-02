import styled from '@emotion/styled';
import { flexCenter } from '@orfium/ictinus/dist/theme/functions';
import { flex } from 'theme/functions';

export const PageWrapper = styled.div`
  ${flexCenter};
  flex-direction: column;
`;

export const Main = styled.main`
  grid-area: main;

  // for Firefox
  scrollbar-width: thin;

  // for Chrome
  ::-webkit-scrollbar {
    width: 8px;
    background: transparent !important;
  }

  ::-webkit-scrollbar-track {
    background: transparent !important;
  }

  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.utils.getColor('coolGray', 400)};
    border-radius: 32px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${(props) => props.theme.utils.getColor('coolGray', 500)};
  }

  overflow-y: auto;
  overflow-x: hidden;

  ${flex}
`;
