import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const PageWrapper = styled.div<{ isDesktop: boolean }>`
  display: flex;
  flex-direction: column;
  height: ${({ isDesktop }) => (isDesktop ? '100%' : 'calc(100vh)')};
  justify-content: center;
  width: ${({ isDesktop }) => (isDesktop ? '50%' : '100%')};

  ${({ isDesktop }) =>
    isDesktop &&
    `
      justify-content: flex-start;

    `}
`;

export const CheckBoxContainer = styled.div<{ error?: boolean; checked?: boolean }>`
  margin-left: -12px;
`;
export const CheckBoxWrapper = styled.div<{ error?: boolean; checked?: boolean }>`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  position: relative;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const FieldsContainer = styled.div<{ withMargin?: boolean }>`
  column-gap: 8px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: ${(props) => (props.withMargin ? '24px' : null)};
  row-gap: 8px;
`;

export const LongFieldWrapper = styled.div`
  grid-column: 1 / 3;
`;

export const FieldWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type='number'] {
    -moz-appearance: textfield;
  }
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

export const PageTitle = styled.div`
  color: ${(props) => props.theme.palette.grey[400]};
  display: flex;
  font-size: 24px;
  font-weight: 700;
  gap: 16px;
  padding: 16px;
`;

export const PageSubtitle = styled.div`
  color: ${(props) => props.theme.palette.grey[400]};
  display: flex;
  font-size: 18px;
  font-weight: 400;
  gap: 16px;
  padding: 16px;
`;

export const SectionTitle = styled.div`
  color: ${(props) => props.theme.palette.primary.dark};
  font-size: 18px;
  font-weight: 500;
`;

export const ButtonContainer = styled.div<{ isDesktop: boolean }>`
  background: ${(props) => props.theme.palette.grey[300]};
  border-top: 1px solid ${(props) => props.theme.palette.grey[200]};
  bottom: 0;
  box-sizing: border-box;
  padding: 16px;
  position: ${({ isDesktop }) => (isDesktop ? 'relative' : 'fixed')};
  width: 100%;
`;
