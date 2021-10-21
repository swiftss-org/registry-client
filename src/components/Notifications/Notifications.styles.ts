import styled from '@emotion/styled';
import { NotificationTypes } from '@orfium/ictinus/dist/components/Notification/Notification';

export const NotificationStyle = styled.div<{ type: NotificationTypes }>`
  div:first-of-type:first-of-type {
    div:first-of-type {
      svg {
        fill: ${(props) =>
          props.type === 'error' ? props.theme.utils.getColor('red', 200) : ''} !important;
        path {
          fill: ${(props) =>
            props.type === 'error' ? props.theme.utils.getColor('red', 200) : ''} !important;
        }
      }
    }
  }
  div {
    background: #343645;
    border-color: ${(props) =>
      props.type === 'error' ? props.theme.utils.getColor('red', 200) : ''} !important;
  }

  & > div {
    height: auto;
    min-height: 56px;

    & > div:nth-of-type(1) {
      align-items: stretch;

      & > div:nth-of-type(1) {
        margin-top: 13px;
      }

      & > div:nth-of-type(2) {
        margin: 16px 0;
      }
    }

    & > div:nth-of-type(2) {
      align-items: stretch;
      margin-top: 13px;
    }
  }
`;

export const NotificationWrapper = styled.div`
  border-radius: 8px;
  scroll-margin: 40px;
`;
