import styled from '@emotion/styled';

export const CardContainer = styled.div`
  border: 1px solid ${(props) => props.theme.utils.getColor('blue', 200)};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  padding: 16px;

  &:active {
    background: ${(props) => props.theme.utils.getColor('lightCoolGray', 400)};
    transition: 0.2s all ease;
  }
`;

export const Title = styled.div`
  color: ${(props) => props.theme.utils.getColor('blue', 400)};
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
`;

export const Subtitle = styled.div`
  color: ${(props) => props.theme.utils.getColor('blue', 400)};
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 16px;
`;

export const IdLabel = styled.div`
  color: ${(props) => props.theme.utils.getColor('darkGray', 400)};
  font-size: 12px;
`;

export const IdValue = styled.div`
  color: ${(props) => props.theme.utils.getColor('blue', 400)};
  font-size: 14px;
  font-weight: 700;
`;

export const ChipWrapper = styled.div`
  & > div {
    font-size: 10px;
    font-weight: 500;
    white-space: nowrap;
  }
`;
