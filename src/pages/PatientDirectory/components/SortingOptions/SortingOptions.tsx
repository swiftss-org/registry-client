import React from 'react';

import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { SortingOptionsType } from 'pages/PatientDirectory/types';

type Props = {
  title: string;
  sortingOption: SortingOptionsType;
  onSortingOptionChange: (option: SortingOptionsType) => void;
  onClose: () => void;
};

/**
 * A dialog for selecting sorting options in the Patient Directory.
 * Refactored to use standard MUI Dialog for consistency and accessibility.
 * 
 * @param props The component props
 */
const SortingOptions: React.FC<Props> = ({
  title,
  onClose,
  sortingOption,
  onSortingOptionChange,
}) => {
  return (
    <Dialog
      open={true}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        sx: {
          borderRadius: 2,
          position: 'relative',
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, fontWeight: 700 }}>
        {title}
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
      </DialogTitle>

      <DialogContent sx={{ p: 2 }}>
        <RadioGroup
          value={sortingOption}
          name="sortingOptions"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onSortingOptionChange(e.target.value as SortingOptionsType)
          }
        >
          <Box sx={{ mb: 2 }}>
            <Typography variant="overline" sx={{ color: 'text.secondary', fontWeight: 700 }}>
              Name
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 1 }}>
              <FormControlLabel
                value="full_name"
                control={<Radio size="small" data-testid="sort-name-asc" />}
                label="Name A-Z"
              />
              <FormControlLabel
                value="-full_name"
                control={<Radio size="small" data-testid="sort-name-desc" />}
                label="Name Z-A"
              />
            </Box>
          </Box>

          <Box>
            <Typography variant="overline" sx={{ color: 'text.secondary', fontWeight: 700 }}>
              Date
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 1 }}>
              <FormControlLabel
                value="-created_at"
                control={<Radio size="small" data-testid="sort-date-desc" />}
                label="Newest to oldest"
              />
              <FormControlLabel
                value="created_at"
                control={<Radio size="small" data-testid="sort-date-asc" />}
                label="Oldest to newest"
              />
            </Box>
          </Box>
        </RadioGroup>
      </DialogContent>
    </Dialog>
  );
};

export default SortingOptions;

