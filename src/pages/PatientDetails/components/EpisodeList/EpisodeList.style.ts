import styled from '@emotion/styled';

import { flex, flexCenterVertical } from 'theme/functions';

export const EmptyState = styled.div`
  color: ${flexCenterVertical};
  font-size: 18px;
  height: 100%;
  justify-content: center;
  ${({ theme }) => theme.utils.getColor('darkGray', 400)};
  opacity: 0.5;
`;

export const Container = styled.div`
  ${flex};
  flex-direction: column;
  gap: 16px;
`;
