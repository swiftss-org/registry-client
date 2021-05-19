/** @jsxImportSource @emotion/react */
import React from 'react';

import { Main } from './Layout.style';

interface Props {
  /** Component to load */
  component?: React.FC;
}

const Layout: React.FC<Props> = (props: Props) => {
  return <Main css={{ flexDirection: 'column' }}>{props.component && <props.component />}</Main>;
};

export default Layout;
