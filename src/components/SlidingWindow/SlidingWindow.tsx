import React, { FC } from 'react';

import { Icon, useTheme } from '@orfium/ictinus';
import { useAnimationClass } from 'hooks/useAnimationClass/useAnimationClass';

import { ClosePortalType } from '../Portal';
import {
  CloseContainer,
  ComponentContainer,
  PaddedContent,
  Title,
  Wrapper,
} from './SlidingWindow.style';

interface Props {
  title?: string;
  handleClosePortal?: ClosePortalType;
}

const SlidingWindow: FC<Props> = ({ children, title, handleClosePortal }) => {
  const { ref: slideRef } = useAnimationClass('sliding-window-animation');
  const { ref: fadeRef } = useAnimationClass('overlay-fade-animation');

  const {
    utils: { getColor },
  } = useTheme();

  return (
    <Wrapper ref={fadeRef}>
      <ComponentContainer ref={slideRef}>
        <PaddedContent>
          <CloseContainer onClick={(e) => handleClosePortal?.(e)} data-testid={'window-close'}>
            {title && <Title>{title}</Title>}
            <Icon color={getColor('lightGray', 600)} name={'close'} size={20} />
          </CloseContainer>
          {children}
        </PaddedContent>
      </ComponentContainer>
    </Wrapper>
  );
};

export default SlidingWindow;
