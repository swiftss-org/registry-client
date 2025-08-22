import styled from '@emotion/styled';
import { rem } from 'polished';

export const ComponentWrapper = styled.div`
  box-sizing: border-box;
  height: ${rem(411)};
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing(4)};
`;
