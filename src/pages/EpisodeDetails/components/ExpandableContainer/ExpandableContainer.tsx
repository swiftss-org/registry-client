import React, { FC, useState } from 'react';

import { Icon, useTheme } from '@orfium/ictinus';

import { DischargeAPI, EpisodesAPI } from '../../../../models/apiTypes';
import { Header, ListItem } from './style';

const ExpandableContainer: FC<{
  component: React.FunctionComponent<{
    isOpen: boolean;
    onClick?: () => void;
    episode?: EpisodesAPI;
    discharge?: DischargeAPI;
  }>;
  title: string;
  episode?: EpisodesAPI;
  discharge?: DischargeAPI;
}> = ({ component: Component, title, episode }) => {
  const [toggle, setToggle] = useState(false);
  const {
    utils: { getColor },
  } = useTheme();

  return (
    <ListItem
      isOpen={toggle}
      onClick={() => {
        setToggle((prevState) => !prevState);
      }}
    >
      <Header isOpen={toggle}>
        {title}
        <Icon
          name={toggle ? 'chevronLargeUp' : 'chevronLargeDown'}
          color={getColor('lightGray', 500)}
        />
      </Header>

      <div onClick={(e: any) => e.stopPropagation()}>
        <Component isOpen={toggle} episode={episode} />
      </div>
    </ListItem>
  );
};

export default ExpandableContainer;
