import React, { FC } from 'react';

import { Icon } from '@mui/material';

import { ClosePortalType } from '../Portal';
import { CloseContainer, ComponentContainer, Wrapper } from './Modal.style';

interface Props {
  title?: string;
  handleClosePortal?: ClosePortalType;
  children: React.ReactNode;
}

const Modal: FC<Props> = ({ children, handleClosePortal }) => {
  return (
    <Wrapper>
      <ComponentContainer>
        <CloseContainer onClick={(e) => handleClosePortal?.(e)} data-testid={'window-close'}>
          <Icon>close</Icon>
        </CloseContainer>
        {children}
      </ComponentContainer>
    </Wrapper>
  );
};

export default Modal;