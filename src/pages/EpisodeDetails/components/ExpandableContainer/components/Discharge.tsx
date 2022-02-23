import React, { FC } from 'react';

import { TextField } from '@orfium/ictinus';

import { InternalContainer } from '../style';

const Discharge: FC<{
  isOpen: boolean;
}> = ({ isOpen }) => {
  return (
    <InternalContainer isOpen={isOpen} aria-expanded={isOpen}>
      <TextField locked label="Full Name" styleType="outlined" size="md" value={'lol'} />
    </InternalContainer>
  );
};

export default Discharge;
