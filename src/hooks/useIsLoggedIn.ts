import { __TOKEN__ } from '../utils/constants';
import { getUserStorageItem } from '../utils/storage';

export const useIsLoggedIn = () => {
  return { isLoggedIn: !!getUserStorageItem(__TOKEN__) };
};
