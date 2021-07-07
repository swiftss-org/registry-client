import styled from '@emotion/styled';

import { scrollBar } from '../../common.style';

export const PatientDirectoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh);
`;

export const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 18px;

  & > div > div {
    background: ${(props) => props.theme.utils.getColor('lightGray', 100)};
  }
`;

export const Line = styled.div`
  border-top: 1px solid #f2f2f2;
  height: 0px;
`;

export const PatientsList = styled.div`
  ${scrollBar};
  margin-bottom: 56px;
  overflow-y: auto;
  padding: 0px 18px 18px 18px;
`;
