import React, { FC } from 'react';

import { TabWrapper } from 'components/Tabs/Tabs.style';

export type TabConfig = {
  label: string;
  value: string;
};

interface Props {
  tab: TabConfig;
  onClick: () => void;
  isActive: boolean;
}

const Tab: FC<Props> = ({ tab, onClick, isActive }) => {
  const { label } = tab;

  return (
    <li role="presentation">
      <TabWrapper
        isActive={isActive}
        aria-selected={isActive ? 'true' : 'false'}
        role="tab"
        tabIndex={0}
        onClick={onClick}
      >
        {label}
      </TabWrapper>
    </li>
  );
};

export default Tab;
