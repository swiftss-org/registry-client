import styled from '@emotion/styled';

export const CardContainer = styled.div`
  border: 1px solid ${(props) => props.theme.palette.primary.dark};
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  padding: 16px;
  transition: all 0.1s ease-in-out;

  :hover {
    background: ${(props) => props.theme.palette.grey[200]};
  }

  &:active {
    background: ${(props) => props.theme.palette.grey[300]};
  }
`;

export const Title = styled.div`
  color: ${(props) => props.theme.palette.primary.dark};
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
`;

export const Subtitle = styled.div`
  color: ${(props) => props.theme.palette.primary.dark};
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 16px;
`;

export const IdLabel = styled.div`
  color: ${(props) => props.theme.palette.grey[400]};
  font-size: 12px;
`;

export const IdValue = styled.div`
  color: ${(props) => props.theme.palette.primary.dark};
  font-size: 14px;
  font-weight: 700;
`;
