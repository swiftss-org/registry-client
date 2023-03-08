import styled from '@emotion/styled';
import { grid } from '@orfium/ictinus/dist/theme/functions';

import { scrollBar } from '../../../../common.style';

export const FormHeadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
  row-gap: 12px;
`;

export const FormContainer = styled.div<{ isDesktop: boolean }>`
  flex-grow: 1;
  height: 100%;
  margin-bottom: ${({ isDesktop }) => (isDesktop ? '0' : '137px')};
  overflow-y: auto;
  padding: 18px;

  ${scrollBar};
`;

export const BirthdayFieldsContainer = styled.div<{ withMargin?: boolean }>`
  ${grid};
  column-gap: 8px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  margin-bottom: ${(props) => (props.withMargin ? '24px' : null)};
  row-gap: 8px;
`;

export const SelectWrapper = styled.div`
  & > div > div {
    max-width: unset;
  }
`;
