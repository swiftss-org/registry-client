import { Location } from 'history';
import { PathMatch } from 'react-router-dom';

export type MenuItem = {
  name: string;
  url: string;
  state?: Record<string, unknown> | null;
  visible: boolean;
  isActive?<ParamKey extends string>(
    match: PathMatch<ParamKey> | null,
    location: Location
  ): boolean;
  options: MenuItem[];
};
