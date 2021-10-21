import React, { FC, FormEvent } from 'react';

import { Icon, TextField } from '@orfium/ictinus';

interface Props {
  placeholder: string;
  onSearch: (term: string) => void;
}

const SearchField: FC<Props> = ({ onSearch, placeholder }) => {
  return (
    <TextField
      data-testid="search-field"
      styleType={'filled'}
      placeholder={placeholder}
      leftIcon={<Icon name={'search'} color={'black'} />}
      onInput={(event: FormEvent<HTMLInputElement>) => onSearch(event?.currentTarget?.value)}
    />
  );
};

export default SearchField;
