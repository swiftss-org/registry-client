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
      variant={"filled"}
      placeholder={placeholder}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      onChange={(event: ChangeEvent<HTMLInputElement>) => onSearch(event.target.value)}
    />
  );
};

export default SearchField;
