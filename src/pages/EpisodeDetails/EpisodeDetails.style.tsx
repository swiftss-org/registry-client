import styled from '@emotion/styled';

import { flex } from '../../theme/functions';

export const Container = styled.div`
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.md};
`;

export const PageWrapper = styled.div`
  ${flex};
  flex-direction: column;
  height: 100%;
  width: 100%;
`;
