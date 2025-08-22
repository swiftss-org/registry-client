import styled from '@emotion/styled';
import { rem } from 'polished';

export const Container = styled.div<{
  expanded: boolean;
  isDesktop: boolean;
  isSmallDesktop: boolean;
}>`
  background-color: white;
  border-right: ${rem(1)} solid ${(props) => props.theme.palette.grey[200]};
  flex-grow: 0;
  flex-shrink: 0;
  height: 100%;
  min-height: 100%;
  overflow: hidden;
  position: ${(props) => (props.isSmallDesktop ? 'absolute' : 'relative')};
  transition: width 0.2s ease-in-out;
  width: ${(props) => (props.expanded ? rem('308px') : rem('0px'))};
  z-index: 100;
`;
