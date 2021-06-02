import styled from '@emotion/styled';
import { scrollBar } from '../../../../common.style';

export const FormSectionHeading = styled.span`
  color: ${(props) => props.theme.utils.getColor('lightGray', 600)};
  font-weight: 700;
  font-size: 10px;
`;

export const FormHeadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
`;

export const FormContainer = styled.div`
  overflow-y: auto;
  padding: 18px;
  flex-grow: 1;
  margin-bottom: 120px;

  ${scrollBar};
`;
