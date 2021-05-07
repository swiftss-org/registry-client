import { FC, LazyExoticComponent } from 'react';
import { AcceptedIconNames } from '@orfium/ictinus/dist/components/Icon/types';

export type PageDefaultUrls = 'defaultPublic' | 'defaultPrivate';

export type PageOption = {
  id?: string;
  title: string;
  url: () => string;
  iconName: AcceptedIconNames;
  visible: boolean;
  component?: LazyExoticComponent<FC<any>> | FC<any>;
  routes?: PageOption[];
};

export type DefaultUrlsRecord = Record<PageDefaultUrls, string>;
