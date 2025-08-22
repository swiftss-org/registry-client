import styled from '@emotion/styled';
import { rem } from 'polished';

export const IBWRapper = styled.div`
  pointer-events: none;
  > button > span > svg > path {
    fill: white;
  }
`;

export const Title = styled.div`
  font-size: ${(props) => props.theme.typography.h1.fontSize};
  font-weight: ${(props) => props.theme.typography.h1.fontWeight};
  line-height: ${rem(21)};
`;

export const Subtitle = styled.div`
  color: ${(props) => props.theme.palette.grey[600]};
  font-size: ${(props) => props.theme.typography.subtitle1.fontSize};
  font-weight: ${(props) => props.theme.typography.subtitle1.fontWeight};
  line-height: ${rem(19)};
`;
