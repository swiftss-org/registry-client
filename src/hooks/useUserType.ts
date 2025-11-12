import { getUserStorageItem } from 'utils/storage';

export const useUserType = () => {
  const username = getUserStorageItem('username') ?? '';
  const isStaff = getUserStorageItem('is_staff') === 'true';
  const isSuperuser = getUserStorageItem('is_superuser') === 'true';
  return { username, isStaff, isSuperuser };
};