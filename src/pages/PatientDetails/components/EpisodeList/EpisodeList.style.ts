import styled from '@emotion/styled';

export const EmptyState = styled.div`
  align-items: center;
  display: flex;
  font-size: 18px;
  height: 100%;
  justify-content: center;
  ${({ theme }) => theme.palette.grey[400]};
  opacity: 0.5;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
