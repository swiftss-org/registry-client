import styled from '@emotion/styled';
import { flexCenter } from '@orfium/ictinus/dist/theme/functions';

export const FormContainer = styled.div`
  margin-top: 10px;
`;

export const FormBottom = styled.div`
  ${flexCenter};
  justify-content: space-between;
  margin-bottom: 24px;
`;

export const ButtonContainer = styled.div`
  width: 100%;

  && button {
    text-align: center;
    width: 100%;

    span {
      justify-content: center;
      font-weight: 700;
      font-size: 16px;
    }
  }
`;
