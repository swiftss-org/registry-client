import { css } from '@emotion/react';
/* Declare mixins in order to further DRY our code. Any reusable and indepedent =  css code bundle
  should become a mixin. Include them using the "@include" command inside a =  css selector
 */

/* adds a "..." after the line of the text exceeds the width of the component*/
export const lineEllipsis = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

//https://css-tricks.com/snippets/css/prevent-long-urls-from-breaking-out-of-container/
export const breakWord = css`
  -ms-word-break: break-all;
  overflow-wrap: break-word;
  word-break: break-word;
  word-break: break-all;
  word-wrap: break-word;
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
  -moz-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  justify-content: center;
`;

export const flexCenterVertical = css`
  ${flex};
  -moz-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
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
