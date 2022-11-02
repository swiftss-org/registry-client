import styled from '@emotion/styled';

import { flex } from '../../theme/functions';

export const Container = styled.div`
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.md};
`;

export const PageWrapper = styled.div<{ isDesktop: boolean }>`
  ${flex};
  flex-direction: column;
  height: 100%;
  width: ${({ isDesktop }) => (isDesktop ? '50%' : '100%')};

  ${({ isDesktop }) =>
    isDesktop &&
    `
      justify-content: flex-start;
      
    `}
`;
