import styled from '@emotion/styled';

import { scrollBar } from '../../common.style';

export const DashboardWrapper = styled.div`
  ${scrollBar};
  margin-bottom: 16px;
  overflow-y: auto;
  padding: 0px 16px 18px 16px;
  @media (max-width: 1200px) {
    height: calc(100vh - 280px);
  }
}
`;

export const DashboardText = styled.div`
  color: ${(props) => props.theme.utils.getColor('darkGray', 400)};
`;

export const DashboardTextHeader = styled.div`
  color: ${(props) => props.theme.utils.getColor('darkGray', 400)};
  font-size: 14px;
  font-weight: 400;
`;