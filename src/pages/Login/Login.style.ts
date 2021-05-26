import styled from '@emotion/styled';

import { flex } from '../../theme/functions';

export const PageWrapper = styled.div`
  ${flex};
  flex-direction: column;
  padding: 30px;
`;

export const TextContainer = styled.div`
  display: flex;
  align-items: start;
  flex-direction: column;
  margin-top: 100px;
`;

export const Title = styled.span`
  font-size: 24px;
  font-weight: 700;
`;

export const Subtitle = styled.span`
  font-size: 16px;
  font-weight: 400;
  margin-top: 8px;
`;
