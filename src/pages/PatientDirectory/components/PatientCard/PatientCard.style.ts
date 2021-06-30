import styled from '@emotion/styled';

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 21px;
  padding: 16px 0px 17px 4px;
`;

export const Info = styled.div`
  color: ${(props) => props.theme.utils.getColor('darkGray', 600)};
  font-size: 14px;
`;

export const ChipWrapper = styled.div`
  & > div {
    color: ${(props) => props.theme.utils.getColor('lightGray', 600)};
    font-size: 12px;
    font-weight: 500;
    white-space: nowrap;
  }
`;

export const Header = styled.div`
  align-items: center;
  display: flex;
  gap: 15px;
  justify-content: space-between;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CardLabel = styled.div`
  color: ${(props) => props.theme.utils.getColor('lightGray', 400)};
  font-size: 11px;
  font-weight: 500;
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
  align-items: center;
  color: #0047ff;
  display: flex;
  font-size: 12px;
  font-weight: 500;
`;

export const CardItemsContainer = styled.div`
  display: flex;
  gap: 41px;
`;
