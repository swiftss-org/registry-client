import { css } from '@emotion/react';
/* Declare mixins in order to further DRY our code. Any reusable and indepedent =  css code bundle
  should become a mixin. Include them using the "@include" command inside a =  css selector
 */

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

export const flex = css`
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
`;

/* centers flex content */
export const flexCenter = css`
  ${flex};
  -webkit-align-items: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  justify-content: center;
`;

export const flexCenterVertical = css`
  ${flex};
  -webkit-align-items: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  align-items: center;
`;

export const customScrollbars = css`
  scrollbar-color: #888 transparent;
  scrollbar-width: thin;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
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

/**Split divs inside a div vertically */
export const flexDivsVertical = css`
  ${flex};
  & > div {
    flex: 1 0 auto;
  }
`;
