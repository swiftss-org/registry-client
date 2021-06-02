import styled from '@emotion/styled';

export const PatientDirectoryContainer = styled.div``;

export const SearchWrapper = styled.div`
  & > div > div {
    background: ${(props) => props.theme.utils.getColor('lightGray', 100)};
  }
`;

export const Line = styled.div`
  height: 0px;
  border-top: 1px solid #f2f2f2;
`;
