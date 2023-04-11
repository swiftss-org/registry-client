import React from 'react';

import { FieldRenderProps } from 'react-final-form';

import { Wrapper } from './Checkbox.style';

const Checkbox = ({ input, label, disabled }: FieldRenderProps<string | number, HTMLElement>) => {
  return (
    <Wrapper>
      <input
        type={'checkbox'}
        onChange={input.onChange}
        checked={input.checked}
        disabled={disabled}
      />
      <label>{label}</label>
    </Wrapper>
  );
};

export default Checkbox;
