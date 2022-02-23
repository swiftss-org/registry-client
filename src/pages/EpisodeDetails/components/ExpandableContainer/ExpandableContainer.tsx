import React, { FC, useState } from 'react';

import { Icon, useTheme } from '@orfium/ictinus';

import { DischargeAPI, EpisodesAPI, FollowUpAPI } from '../../../../models/apiTypes';
import { Header, ListItem } from './style';

const ExpandableContainer: FC<{
  component: React.FunctionComponent<{
    isOpen: boolean;
    onClick?: () => void;
    episode?: EpisodesAPI;
    discharge?: DischargeAPI;
    followUp?: FollowUpAPI;
  }>;
  title: string;
  episode?: EpisodesAPI;
  discharge?: DischargeAPI;
  followUp?: FollowUpAPI;
  isDone?: boolean;
}> = ({ component: Component, title, episode, discharge, followUp, isDone = false }) => {
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
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          {title}{' '}
          {isDone && !toggle && <Icon name={'checkmark'} size={20} color={'green'} variant={400} />}
        </div>

        <Icon
          name={toggle ? 'chevronLargeUp' : 'chevronLargeDown'}
          color={getColor('lightGray', 500)}
        />
      </Header>

      <div onClick={(e: any) => e.stopPropagation()}>
        <Component isOpen={toggle} episode={episode} discharge={discharge} followUp={followUp} />
      </div>
    </ListItem>
  );
};

export default ExpandableContainer;
