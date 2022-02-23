import styled from '@emotion/styled';
import { flexCenter } from '@orfium/ictinus/dist/theme/functions';

export const FormContainer = styled.div`
  height: 100%;
  margin-top: 10px;
  overflow-y: auto;
  padding: 1px;
`;

export const FormBottom = styled.div`
  ${flexCenter};
  justify-content: space-between;
  margin-bottom: 24px;
`;

export const ButtonContainer = styled.div`
  bottom: 32px;
  left: 32px;
  right: 32px;
`;
