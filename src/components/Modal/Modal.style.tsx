import styled from '@emotion/styled';
import { rem } from 'polished';

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  overflow-y: auto;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 15;

  :before {
    background-color: ${(props) => props.theme.utils.getColor('blue', 700)};
    content: ' ';
    height: 100%;
    opacity: 0.75;
    position: absolute;
    width: 100%;
  }
`;

export const ComponentContainer = styled.div`
  align-items: center;
  background-color: white;
  border-radius: ${rem(16)};
  display: flex;
  flex-direction: column;
  gap: ${rem(18)};
  min-height: 30%;
  overflow-y: auto;
  padding: ${rem(28)} ${rem(24)};
  position: relative;
  text-align: center;
  width: 75%;
  z-index: 16;
`;

export const CloseContainer = styled.div`
  cursor: pointer;
  position: absolute;
  right: ${rem(20)};
  top: ${rem(20)};
`;
