import styled from '@emotion/styled';
import { grid } from '@orfium/ictinus/dist/theme/functions';
import { flex } from './theme/functions';

export const PageWrapper = styled.div`
  ${flex};
  flex-direction: column;
  height: calc(100vh);
  width: 100%;
`;

export const CheckBoxContainer = styled.div<{ error?: boolean; checked?: boolean }>`
  && * {
    color: black;
  }

  //checked checkbox color
  label:after {
    box-shadow: 2px 0 0 black, 4px 0 0 black, 4px -2px 0 black, 4px -4px 0 black, 4px -6px 0 black,
      4px -8px 0 black, 4px -10px 0 black !important;
    background-color: black !important;
  }

  label:before {
    box-shadow: inset 0px 0px 0px 0.125rem
      ${(props) =>
        props.checked
          ? props.theme.utils.getColor('lightGray', 400)
          : props.theme.utils.getColor('lightGray', 400)} !important;
    background-color: ${(props) =>
      props.checked ? props.theme.utils.getColor('lightGray', 400) : 'inherit'} !important;
  }

  span {
    color: white;
    white-space: pre-line;
  }

  svg path {
    fill: black;
  }
`;

export const FieldsContainer = styled.div<{ withMargin?: boolean }>`
  ${grid};
  grid-template-columns: 1fr 1fr;
  column-gap: 38px;
  row-gap: 24px;
  margin-bottom: ${(props) => (props.withMargin ? '24px' : null)};
`;

export const LongFieldWrapper = styled.div`
  grid-column: 1 / 3;
`;

export const FieldWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
`;

export const RadioText = styled.span`
  min-height: 48px;
  display: inline-flex;
  align-items: center;
  margin-left: 8px;
`;
