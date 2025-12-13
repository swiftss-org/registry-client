import { getUserStorageItem } from 'utils/storage';

export const useUserType = () => {
  const username = getUserStorageItem('username') ?? '';
  const level = getUserStorageItem('user_level') || null;
  const levelDisplay = getUserStorageItem('user_level_display') || null;

  return {
    username,
    level,
    levelDisplay,
    hasMedicalPersonnel: Boolean(level),
  };
};