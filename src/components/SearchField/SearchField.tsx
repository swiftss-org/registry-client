import React, { FC, ChangeEvent } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import { TextField, InputAdornment } from '@mui/material';

interface Props {
  placeholder: string;
  onSearch: (term: string) => void;
}

const SearchField: FC<Props> = ({ onSearch, placeholder }) => {
  return (
    <TextField
      data-testid="search-field"
      variant="outlined"
      placeholder={placeholder}
      size="small"
      sx={{
        width: '100%',
        maxWidth: '400px',
        '& .MuiOutlinedInput-root': {
          borderRadius: 1,
          backgroundColor: '#f1f3f4',
          transition: 'all 0.2s ease-in-out',
          '& fieldset': {
            border: '1px solid #e0e0e0',
          },
          '&:hover': {
            backgroundColor: '#ecedee',
            '& fieldset': {
              borderColor: '#bdbdbd !important',
            },
          },
          '&.Mui-focused': {
            backgroundColor: '#ffffff',
            boxShadow: '0 1px 6px rgba(32,33,36,0.28)',
            '& fieldset': {
              borderColor: 'primary.main',
              borderWidth: '1px !important',
            },
          },
        },
        '& .MuiInputBase-input': {
          padding: '10px 14px',
        }
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: 'text.secondary', ml: 1 }} />
          </InputAdornment>
        ),
      }}
      onChange={(event: ChangeEvent<HTMLInputElement>) => onSearch(event.target.value)}
    />
  );
};

export default SearchField;
