import styled from '@emotion/styled';
import { rem } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  left: 0;
  overflow-y: auto;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 150;

  :before {
    background-color: ${(props) => props.theme.palette.primary.dark};
    content: ' ';
    height: 100%;
    opacity: 0.75;
    position: absolute;
    width: 100%;
  }
`;

export const ComponentContainer = styled.div`
  background-color: white;
  border-radius: 16px 16px 0px 0px;
  height: 100%;
  overflow-y: auto;
  position: fixed;
  top: 35%;
  width: 100%;
  z-index: 16;
`;

export const PaddedContent = styled.div`
  padding-top: ${rem(72)};
`;

export const CloseContainer = styled.div`
  cursor: pointer;
  position: absolute;
  right: ${(props) => props.theme.spacing(6)};
  top: ${(props) => props.theme.spacing(6)};
`;

export const Title = styled.div`
  color: ${(props) => props.theme.palette.grey[400]};
  font-size: 20px;
  font-weight: 700;
  left: 16px;
  position: fixed;
`;
