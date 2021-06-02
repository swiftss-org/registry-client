import styled from '@emotion/styled';
import { scrollBar } from '../../common.style';

export const PatientDirectoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh);
`;

export const SearchWrapper = styled.div`
  padding: 18px;

  & > div > div {
    background: ${(props) => props.theme.utils.getColor('lightGray', 100)};
  }
`;

export const Line = styled.div`
  height: 0px;
  border-top: 1px solid #f2f2f2;
`;

export const PatientsList = styled.div`
  ${scrollBar};
  overflow-y: auto;
  margin-bottom: 56px;
  padding: 18px;
`;
