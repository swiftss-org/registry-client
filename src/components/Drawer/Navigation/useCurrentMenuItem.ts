import { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';

import { MenuItem } from '../types';

const useCurrentMenuItem = (menuItems: MenuItem[]) => {
  const [currentMenuItem, setCurrentMenuItem] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const current = menuItems.find((item) => location.pathname.includes(item.url));
    if (current) {
      setCurrentMenuItem(current.url);
    }
  }, [location, menuItems]);

  return currentMenuItem;
};

export default useCurrentMenuItem;
