import { css, SerializedStyles } from '@emotion/react';
/* Declare mixins in order to further DRY our code. Any reusable and indepedent =  css code bundle
  should become a mixin. Include them using the "@include" command inside a =  css selector
 */

export const well = css`
  border-radius: 6px;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.08);
  background-color: white;
`;

export const centerAbsoluteVertical = css`
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
`;

/* quick transition declaration */
export const transition = (s: number, type = 'all'): SerializedStyles => css`
  -webkit-transition: ${type} ${s}s ease-in-out;
  -moz-transition: ${type} ${s}s ease-in-out;
  -ms-transition: ${type} ${s}s ease-in-out;
  -o-transition: ${type} ${s}s ease-in-out;
  transition: ${type} ${s}s ease-in-out;
`;

/* adds a "..." after the line of the text exceeds the width of the component*/
export const lineEllipsis = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

//https://css-tricks.com/snippets/css/prevent-long-urls-from-breaking-out-of-container/
export const breakWord = css`
  overflow-wrap: break-word;
  word-wrap: break-word;
  -ms-word-break: break-all;
  word-break: break-all;
  word-break: break-word;
`;

//https://css-tricks.com/snippets/css/change-autocomplete-styles-webkit-browsers/
export const webkitBrowsersAutocomplete = css`
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover textarea:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0px 1000px #ffffff inset !important;
  }
`;
