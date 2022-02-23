import React from 'react';

import { Button, IconButton } from '@orfium/ictinus';

import Modal from '../Modal';
import { Portal } from '../Portal';
import { IBWRapper, Subtitle, Title } from './ConfirmationModal.style';

interface Props {
  onClose: () => void;
  title: string;
  subtitle?: string;
  onClick: () => void;
  buttonText: string;
}

const ConfirmationModal: React.FC<Props> = ({ onClose, title, subtitle, buttonText, onClick }) => {
  return (
    <Portal baseComponent={Modal} onClose={onClose}>
      <IBWRapper>
        <IconButton
          name={'warning'}
          iconSize={36}
          type={'warning'}
          color={'orange-400'}
          size={48}
        />
      </IBWRapper>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
      <Button onClick={onClick} buttonType={'button'} type={'primary'} filled={false}>
        {buttonText}
      </Button>
    </Portal>
  );
};

export default ConfirmationModal;
