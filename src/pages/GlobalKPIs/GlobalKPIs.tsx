import React from 'react';

import {
  PageTitle,
  PageWrapper,
} from '../../common.style';
import { useResponsiveLayout } from '../../hooks/useResponsiveSidebar';

const GlobalKPIs: React.FC = () => {

  const { isDesktop } = useResponsiveLayout();


  return (
    <PageWrapper isDesktop={isDesktop}>


      <PageTitle>
        Global KPIs
      </PageTitle>

      <p>This page will show global KPIs only visible to admin users.</p>
    </PageWrapper>
  );
};

export default GlobalKPIs;