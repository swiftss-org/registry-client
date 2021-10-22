import styled from '@emotion/styled';

import { scrollBar } from '../../common.style';



export const PatientsList = styled.div`
  ${scrollBar};
  margin-bottom: 56px;
  overflow-y: auto;
  padding: 0px 16px 18px 16px;
`;

export const IconButtonWrapper = styled.div`
  bottom: 2%;
  position: fixed;
  right: 4%;

  button {
    box-shadow: ${(props) => props.theme.elevation['02']};
  }

  svg,
  path {
    fill: white !important;
  }
`;

export const OptionsWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 0 20px 8px 16px;
`;
