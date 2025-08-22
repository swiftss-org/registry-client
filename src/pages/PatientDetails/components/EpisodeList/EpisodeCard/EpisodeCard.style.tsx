import styled from '@emotion/styled';

export const Container = styled.div`
  border: 1px solid transparent;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 16px;
`;

export const Heading = styled.div`
  color: ${({ theme }) => theme.palette.primary.dark};
  font-size: 16px;
  font-weight: 500;
`;
export const Subheading = styled.div`
  color: ${({ theme }) => theme.palette.grey[400]};
  font-size: 14px;
  font-weight: 400;
`;
