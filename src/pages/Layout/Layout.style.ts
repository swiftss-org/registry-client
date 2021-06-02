import styled from '@emotion/styled';
import { flexCenter } from '@orfium/ictinus/dist/theme/functions';
import { flex } from 'theme/functions';
import { scrollBar } from '../../common.style';

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
