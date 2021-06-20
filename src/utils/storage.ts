export const setUserStorageItem = (key: string, token: string, session?: boolean): void => {
  if (session) {
    sessionStorage.setItem(key, token);
  } else {
    localStorage.setItem(key, token);
  }
};

export const getUserStorageItem = (key: string): string | null => {
  return localStorage.getItem(key) || sessionStorage.getItem(key);
};

export const clearUserStorageItem = (key: string): void => {
  localStorage.removeItem(key);
  sessionStorage.removeItem(key);
};

export const clearUserStorage = (): void => {
  localStorage.clear();
  sessionStorage.clear();
};
