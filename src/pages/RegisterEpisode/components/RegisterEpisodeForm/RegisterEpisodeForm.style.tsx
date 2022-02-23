import styled from '@emotion/styled';

import { scrollBar } from '../../../../common.style';
import { flex } from '../../../../theme/functions';

export const FormHeadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
  row-gap: 12px;
`;

export const FormContainer = styled.div`
  flex-grow: 1;
  height: 100%;
  margin-bottom: 137px;
  overflow-y: auto;
  padding: 18px;

  ${scrollBar};
`;

export const SelectWrapper = styled.div`
  & > div > div {
    max-width: unset;
  }
`;

export const ArrayContainer = styled.div`
  ${flex};
  gap: 12px;
  justify-content: space-between;
`;
