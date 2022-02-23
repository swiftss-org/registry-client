import styled from '@emotion/styled';

import { flex } from '../../../../../theme/functions';

export const FieldContainer = styled.div`
  flex-direction: column;
  ${flex};
  gap: 16px;
  margin-bottom: 24px;
  margin-top: 8px;
`;

export const FieldWrapper = styled.div`
  box-sizing: border-box;
  padding: 1px;
  width: 100%;
`;
