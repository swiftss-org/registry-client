import styled from '@emotion/styled';
import { rem } from 'polished';

export const IBWRapper = styled.div`
  pointer-events: none;
  > button > span > svg > path {
    fill: white;
  }
`;

export const Title = styled.div`
  font-size: ${(props) => props.theme.typography.fontSizes[18]};
  font-weight: ${(props) => props.theme.typography.weights.medium};
  line-height: ${rem(21)};
`;

export const Subtitle = styled.div`
  color: ${(props) => props.theme.utils.getColor('lightGray', 600)};
  font-size: ${(props) => props.theme.typography.fontSizes[16]};
  font-weight: ${(props) => props.theme.typography.weights.regular};
  line-height: ${rem(19)};
`;
