import styled from '@emotion/styled';

import { scrollBar } from '../../common.style';

export const TableWrapper = styled.table`
  border-collapse: collapse;
  font-family: Arial, sans-serif;
  margin-top: 1rem;
  width: 100%;
`;

export const TableHeader = styled.th<{ colspan?: number }>`
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
  ${({ colspan }) => colspan && `text-align: center;`}
`;

export const TableCell = styled.td`
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
`;

export const TableRow = styled.tr`
  &:nth-of-type(even) {
    background-color: #fafafa;
  }
`;

export const ItalicCell = styled(TableCell)`
  font-style: italic;
`;

export const TableScrollContainer = styled.div`
  max-height: 620px; 
  overflow-y: auto;
  width: 100%;
`;


export const KPIsContentWrapper = styled.div`
  ${scrollBar};
  overflow-y: auto;
  padding: 0 16px 16px 16px;
  
  @media (max-width: 1200px) {
    height: calc(100vh - 200px);
  }
`;