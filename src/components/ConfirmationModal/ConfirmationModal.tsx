import React from 'react';

import WarningIcon from '@mui/icons-material/Warning';
import { Button, IconButton } from '@mui/material';

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
        <IconButton color={"warning"} size={"large"}>
          <WarningIcon fontSize="large" />
        </IconButton>
      </IBWRapper>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
      <Button onClick={onClick} variant={"outlined"} color={"primary"}>
        {buttonText}
      </Button>
    </Portal>
  );
};

export default ConfirmationModal;