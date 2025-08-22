import React, { FC, useState } from 'react';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { Header, ListItem } from './style';
import { DischargeAPI, EpisodesAPI, FollowUpAPI } from '../../../../models/apiTypes';

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
          {isDone && !toggle && <CheckCircleIcon color="success" />}
        </div>

        {toggle ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </Header>

      <div onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
        <Component isOpen={toggle} episode={episode} discharge={discharge} followUp={followUp} />
      </div>
    </ListItem>
  );
};

export default ExpandableContainer;
