import styled from '@emotion/styled';
import { transition } from '@orfium/ictinus/dist/theme/functions';
import { rem } from 'polished';

export const Container = styled.div<{
  expanded: boolean;
  isDesktop: boolean;
  isSmallDesktop: boolean;
}>`
  ${transition(0.2)};
  background-color: white;
  border-right: ${rem(1)} solid ${(props) => props.theme.utils.getColor('lightGray', 200)};
  flex-grow: 0;
  flex-shrink: 0;
  height: 100%;
  min-height: 100%;
  overflow: hidden;
  position: ${(props) => (props.isSmallDesktop ? 'absolute' : 'relative')};
  width: ${(props) =>
    props.expanded ? rem('308px') : props.isDesktop ? rem('112px') : rem('0px')};
  z-index: 100;
`;
