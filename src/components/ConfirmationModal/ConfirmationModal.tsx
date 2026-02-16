import React from 'react';

import CloseIcon from '@mui/icons-material/Close';
import WarningIcon from '@mui/icons-material/Warning';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Typography,
} from '@mui/material';

interface Props {
  onClose: () => void;
  title: string;
  subtitle?: string;
  onClick: () => void;
  buttonText: string;
}

/**
 * A reusable confirmation modal using MUI Dialog element.
 * Follows the updated design system with minimal custom styling.
 * 
 * @param props The component props
 */
const ConfirmationModal: React.FC<Props> = ({ onClose, title, subtitle, buttonText, onClick }) => {
  return (
    <Dialog
      open={true}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        sx: {
          borderRadius: 2,
          p: 1,
          textAlign: 'center',
          position: 'relative',
        },
      }}
    >
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
        data-testid="window-close"
      >
        <CloseIcon />
      </IconButton>

      <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
        <Box
          sx={{
            bgcolor: 'warning.main',
            borderRadius: '50%',
            width: 64,
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2,
          }}
        >
          <WarningIcon sx={{ fontSize: 40, color: 'white' }} />
        </Box>

        <Typography variant="h5" component="h2" fontWeight={700} sx={{ mb: 1 }}>
          {title}
        </Typography>

        {subtitle && (
          <Typography variant="body1" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </DialogContent>

      <DialogActions sx={{ flexDirection: 'column', gap: 1, px: 3, pb: 3 }}>
        <Button
          fullWidth
          onClick={onClick}
          variant="contained"
          color="primary"
          sx={{
            py: 1.5,
            borderRadius: '28px',
            textTransform: 'none',
            fontWeight: 600,
          }}
        >
          {buttonText}
        </Button>
        <Button
          fullWidth
          onClick={onClose}
          variant="text"
          color="inherit"
          sx={{
            py: 1,
            borderRadius: '28px',
            textTransform: 'none',
            fontWeight: 500,
            color: 'text.secondary',
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;