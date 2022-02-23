import styled from '@emotion/styled';
import { transition } from '@orfium/ictinus/dist/theme/functions';
import { rem } from 'polished';

export const ListItem = styled.li<{ isOpen: boolean }>`
  background: ${({ theme, isOpen }) =>
    isOpen ? theme.utils.getColor('lightCoolGray', 400) : '#fff'};
  border-radius: ${({ theme }) => theme.spacing.xsm};
  border-radius: ${({ theme }) => theme.spacing.xsm};
  box-sizing: border-box;
  cursor: pointer;
  list-style: none;
  outline: ${rem(1)} solid
    ${({ theme, isOpen }) =>
      theme.utils.getColor(isOpen ? 'blue' : 'lightGray', isOpen ? 300 : 400)};
  :not(:last-of-type) {
    margin-bottom: ${({ theme }) => `${theme.spacing.md}`};
  }

  :hover {
    outline: ${rem(2)} solid ${({ theme }) => theme.utils.getColor('lightGray', 300)};
  }
  ${transition(0.1)};
  padding: ${({ theme }) => `${theme.spacing.md}`};

  section[aria-expanded='true'] {
    background-color: transparent;
    max-height: 1000px;
    overflow: auto;
    ${transition(0.2)};
  }
`;

export const Header = styled.header<{
  isOpen: boolean;
}>`
  align-items: center;
  color: ${({ theme }) => theme.utils.getColor('lightGray', 600)};
  display: flex;
  justify-content: space-between;
  > button > span > svg {
    ${transition(0.2)};

    transform: rotate(${({ isOpen }) => (isOpen ? `180deg` : 0)});
  }

  margin-bottom: ${({ isOpen }) => (isOpen ? '20px' : '0')};
  padding: ${({ isOpen }) => (isOpen ? '1px' : '0')};
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
  ${transition(0.2)};
  scrollbar-width: none;
`;
