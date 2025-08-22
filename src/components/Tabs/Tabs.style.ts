import styled from '@emotion/styled';
import { rem } from 'polished';

export const TabWrapper = styled.button<{ isActive: boolean }>`
  background: transparent;
  border: none;
  color: ${({
    theme: {
      palette
    },
    isActive,
  }) => (isActive ? palette.primary.dark : palette.grey[600])};

  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  font-weight: ${({ theme, isActive }) => isActive ? theme.typography.h1.fontWeight : theme.typography.body1.fontWeight};
  margin-right: ${rem(42)};
  margin-top: ${({ theme }) => theme.spacing(2)};
  padding: 0;
  position: relative;
  transition: color 1s;

  ${({ theme, isActive }) =>
    isActive
      ? `:after {
      content: ' ';
      position: absolute;
      top: ${rem(26)};
      left: 0;
      width: 100%;
      border-bottom: 2px solid ${theme.palette.primary.dark};
      animation-name: load;
      animation-duration: 1s;
    }`
      : ``} {
  }

  @keyframes load {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
`;

export const TabsContainer = styled.ul`
  align-items: start;
  display: flex;
  justify-content: start;
  margin: 0 0 ${({ theme }) => theme.spacing(4)} 0;
  padding: 0 0 ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(4)};
  width: 100%;
  > li {
    list-style: none;
  }
`;
