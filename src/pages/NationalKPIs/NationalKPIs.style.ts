import styled from '@emotion/styled';

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
