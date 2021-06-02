import styled from '@emotion/styled';

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
  // for Firefox
  scrollbar-width: thin;

  // for Chrome
  ::-webkit-scrollbar {
    width: 8px;
    background: transparent !important;
  }

  ::-webkit-scrollbar-track {
    background: transparent !important;
  }

  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.utils.getColor('coolGray', 400)};
    border-radius: 32px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${(props) => props.theme.utils.getColor('coolGray', 500)};
  }

  overflow-y: auto;
  margin-bottom: 56px;
  padding: 18px;
`;
