import { css } from '@emotion/react';
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
  margin-left: -12px;

  svg path {
    fill: white;
  }
`;

export const FieldsContainer = styled.div<{ withMargin?: boolean }>`
  ${grid};
  column-gap: 38px;
  grid-template-columns: 1fr 1fr;
  margin-bottom: ${(props) => (props.withMargin ? '24px' : null)};
  row-gap: 24px;
`;

export const LongFieldWrapper = styled.div`
  grid-column: 1 / 3;
`;

export const FieldWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
`;

export const RadioText = styled.span`
  align-items: center;
  display: inline-flex;
  margin-left: 8px;
  min-height: 48px;
`;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const scrollBar = css`
  scrollbar-color: #888 transparent;
  scrollbar-width: thin;
  &::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
  /* Track */
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }
  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;
