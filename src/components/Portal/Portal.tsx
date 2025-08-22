import React, { FC, PropsWithChildren } from 'react';

import ReactDOM from 'react-dom';

export type ClosePortalType = (e: React.MouseEvent<HTMLDivElement>) => void;

interface Props {
  /** The base component that will be rendered, along with any passed children */
  baseComponent: React.ComponentType<{
    title?: string;
    handleClosePortal?: ClosePortalType;
    children: React.ReactNode;
  }>;
  /** The title prop of the component */
  title?: string;
  /** The callback that will run when the component is closed **/
  onClose: () => void;
  /** The callback that will run in the Portal's lifecycle hook **/
  onDidMount?: () => void;
}

const handlePortalOverflow = (overflowType: 'hidden' | 'unset') => {
  document.body.style.overflow = overflowType;
};

const Portal: FC<PropsWithChildren<Props>> = ({ baseComponent: Component, children, onDidMount, title, onClose }) => {
  React.useEffect(() => {
    onDidMount?.();
    handlePortalOverflow('hidden');

    return () => {
      handlePortalOverflow('unset');
    };
  }, [onDidMount]);

  return ReactDOM.createPortal(
    <Component
      handleClosePortal={(e) => {
        e.stopPropagation();
        handlePortalOverflow('hidden');
        onClose();
      }}
      title={title}
    >
      {children}
    </Component>,
    document.getElementById('portal-root') as HTMLDivElement
  );
};

export default Portal;
