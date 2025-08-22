import styled from '@emotion/styled';
import { rem } from 'polished';

export const ListItem = styled.li<{ isOpen: boolean }>`
  background: ${({ theme, isOpen }) =>
    isOpen ? theme.palette.grey[300] : '#fff'};
  border-radius: ${({ theme }) => theme.spacing(2)};
  box-sizing: border-box;
  cursor: pointer;
  list-style: none;
  outline: ${rem(1)} solid
    ${({ theme, isOpen }) => isOpen ? theme.palette.primary.dark : theme.palette.grey[300]};
  padding: ${({ theme }) => `${theme.spacing(4)}`};
  transition: all 0.1s ease-in-out;

  :hover {
    outline: ${rem(2)} solid ${({ theme }) => theme.palette.grey[300]};
  }
  :not(:last-of-type) {
    margin-bottom: ${({ theme }) => `${theme.spacing(4)}`};
  }

  section[aria-expanded='true'] {
    background-color: transparent;
    max-height: 1000px;
    overflow: auto;
    transition: max-height 0.2s ease-in-out;
  }
`;

export const Header = styled.header<{
  isOpen: boolean;
}>`
  align-items: center;
  color: ${({ theme }) => theme.palette.grey[400]};
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ isOpen }) => (isOpen ? '20px' : '0')};
  padding: ${({ isOpen }) => (isOpen ? '1px' : '0')};
  transition: all 0.1s ease-in-out;
  > button > span > svg {
    transform: rotate(${({ isOpen }) => (isOpen ? `180deg` : 0)});
    transition: all 0.1s ease-in-out;
  }
`;

export const InternalContainer = styled.section<{
  isOpen: boolean;
}>`
  -ms-overflow-style: none;
  max-height: 0;
  overflow: hidden;
  padding: ${({ isOpen }) => (isOpen ? '1px' : '0')};
  ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  transition: margin-bottom 0.2s ease-in-out;
`;
