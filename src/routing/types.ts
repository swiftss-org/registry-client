import { RouteProps } from 'react-router-dom';

export type CustomRouteProps = RouteProps & {
  component?: any;
  disabled?: boolean;
};
