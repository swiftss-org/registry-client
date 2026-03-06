import styled from '@emotion/styled';

export const AppWrapper = styled.div<{ isDesktop: boolean }>`
  background-color: white;
  color: black;
  font-family: 'Roboto', sans-serif;
  height: calc(100vh);
  overflow: hidden;
  position: relative;
  width: 100%;
`;

export const TopBar = styled.div`
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  color: black;
  display: flex;
  flex-direction: row;
  font-weight: 700;
  height: 64px;
  padding: 0 16px;
  position: sticky;
  width: 100%;
`;

export const IconWrapper = styled.div`
  cursor: pointer;
  z-index: 10;
`;
