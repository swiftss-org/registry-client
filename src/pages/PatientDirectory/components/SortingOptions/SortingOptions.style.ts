import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

export const Title = styled.div`
  color: ${(props) => props.theme.utils.getColor('darkGray', 400)};
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 16px;
`;

export const RadioWithLabel = styled.div`
  align-items: center;
  display: flex;
  gap: 8px;
`;

export const RadioGroupContainer = styled.div`
  margin-bottom: 16px;
`;
