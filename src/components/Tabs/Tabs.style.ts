import styled from '@emotion/styled';
import { flex } from '@orfium/ictinus/dist/theme/functions';
import { rem } from 'polished';

export const TabWrapper = styled.button<{ isActive: boolean }>`
  background: transparent;
  border: none;
  color: ${({
    theme: {
      utils: { getColor },
    },
    isActive,
  }) => (isActive ? getColor('primary', 500, 'normal') : getColor('lightGray', 600))};

  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.fontSizes[18]};
  font-weight: ${({ theme, isActive }) => theme.typography.weights[isActive ? 'bold' : 'regular']};
  margin-right: ${rem(42)};
  margin-top: ${({ theme }) => theme.spacing.sm};
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
      border-bottom: 2px solid ${theme.utils.getColor('primary', 400, 'normal')};
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
  ${flex};
  align-items: start;
  justify-content: start;
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
  padding: 0 0 ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  width: 100%;
  > li {
    list-style: none;
  }
`;
