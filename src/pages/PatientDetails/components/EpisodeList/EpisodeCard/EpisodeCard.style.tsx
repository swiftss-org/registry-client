import styled from '@emotion/styled';
import { elevation } from '@orfium/ictinus';

import { flex } from 'theme/functions';

export const Container = styled.div`
  border: 1px solid transparent;
  border-radius: 4px;
  box-shadow: ${elevation.default['01']};
  ${flex};
  justify-content: space-between;
  padding: 16px;
`;

export const TextWrapper = styled.div`
  ${flex};
  flex-direction: column;
  gap: 4px;
  margin-bottom: 16px;
`;

export const Heading = styled.div`
  color: ${({ theme }) => theme.utils.getColor('blue', 500)};
  font-size: 16px;
  font-weight: 500;
`;
export const Subheading = styled.div`
  color: ${({ theme }) => theme.utils.getColor('darkGray', 400)};
  font-size: 14px;
  font-weight: 400;
`;
