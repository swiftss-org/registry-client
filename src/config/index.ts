import { PageOption } from './types';
import { lazy } from 'react';

export const pageOptions: PageOption[] = [
  {
    title: 'Menu Item',
    url: () => '/landing-page',
    visible: true,
    iconName: 'assetMatching',
  },
  {
    title: 'Demo page',
    url: () => '/demo-page',
    component: lazy(() => import('pages/HelloPage/HelloPage')),
    visible: true,
    iconName: 'entities',
  },
];
