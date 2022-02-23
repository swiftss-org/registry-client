import React, { FC } from 'react';

import Tab, { TabConfig } from 'components/Tabs/components/Tab';

import { TabsContainer } from './Tabs.style';

interface Props {
  tabs: TabConfig[];
  shouldDisplayTabs?: boolean;
  matchActiveDataType: string;
  onTabClick(value: string): void;
}

const Tabs: FC<Props> = ({
  children,
  onTabClick,
  matchActiveDataType,
  tabs,
  shouldDisplayTabs = false,
}) => {
  return (
    <>
      {shouldDisplayTabs && (
        <TabsContainer role={'tablist'}>
          {tabs.map((tab) => (
            <Tab
              isActive={tab.value === matchActiveDataType}
              key={tab.value}
              tab={tab}
              onClick={() => {
                onTabClick(tab.value);
              }}
            />
          ))}
        </TabsContainer>
      )}

      {children}
    </>
  );
};

export default Tabs;
