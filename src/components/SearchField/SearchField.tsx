import React, { FC, FormEvent } from 'react';

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
      onInput={(event: FormEvent<HTMLInputElement>) => onSearch(event?.currentTarget?.value)}
    />
  );
};

export default SearchField;
