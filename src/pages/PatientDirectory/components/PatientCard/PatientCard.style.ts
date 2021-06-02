import styled from '@emotion/styled';

export const CardContainer = styled.div`
  padding: 16px 0px 17px 4px;
  display: flex;
  flex-direction: column;
  gap: 21px;
`;

export const Info = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.utils.getColor('darkGray', 600)};
`;

export const ChipWrapper = styled.div`
  & > div {
    color: ${(props) => props.theme.utils.getColor('lightGray', 600)};
    font-weight: 500;
    white-space: nowrap;
    font-size: 12px;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CardLabel = styled.div`
  color: ${(props) => props.theme.utils.getColor('lightGray', 400)};
  font-weight: 500;
  font-size: 11px;
`;

export const CardValue = styled.div`
  color: ${(props) => props.theme.utils.getColor('lightGray', 600)};
  font-size: 10px;
`;

export const CardItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const ViewMore = styled.div`
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
  color: #0047ff;
`;

export const CardItemsContainer = styled.div`
  display: flex;
  gap: 41px;
`;
