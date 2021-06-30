import styled from '@emotion/styled';

import { scrollBar } from '../../../../common.style';

export const FormSectionHeading = styled.span`
  color: ${(props) => props.theme.utils.getColor('lightGray', 600)};
  font-size: 10px;
  font-weight: 700;
`;

export const FormHeadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
`;

export const FormContainer = styled.div`
  flex-grow: 1;
  margin-bottom: 120px;
  overflow-y: auto;
  padding: 18px;

  ${scrollBar};
`;
