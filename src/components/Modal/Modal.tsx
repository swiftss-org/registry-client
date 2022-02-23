import React, { FC } from 'react';

import { Icon, useTheme } from '@orfium/ictinus';

import { ClosePortalType } from '../Portal';
import { CloseContainer, ComponentContainer, Wrapper } from './Modal.style';

interface Props {
  title?: string;
  handleClosePortal?: ClosePortalType;
}

const Modal: FC<Props> = ({ children, handleClosePortal }) => {
  const {
    utils: { getColor },
  } = useTheme();

  return (
    <Wrapper>
      <ComponentContainer>
        <CloseContainer onClick={(e) => handleClosePortal?.(e)} data-testid={'window-close'}>
          <Icon color={getColor('lightGray', 600)} name={'close'} size={20} />
        </CloseContainer>
        {children}
      </ComponentContainer>
    </Wrapper>
  );
};

export default Modal;
