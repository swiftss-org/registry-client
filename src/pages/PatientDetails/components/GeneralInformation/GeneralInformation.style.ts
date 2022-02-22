import styled from '@emotion/styled';

import { flex } from 'theme/functions';

export const ComponentWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

export const Container = styled.div`
  ${flex};
  flex-direction: column;
  gap: 8px;
`;
