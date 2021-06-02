import styled from '@emotion/styled';

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
`;
