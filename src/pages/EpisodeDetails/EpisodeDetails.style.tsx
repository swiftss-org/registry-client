import styled from '@emotion/styled';

export const Container = styled.div`
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing(4)};
`;

export const PageWrapper = styled.div<{ isDesktop: boolean }>`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: ${({ isDesktop }) => (isDesktop ? '50%' : '100%')};

  ${({ isDesktop }) =>
    isDesktop &&
    `
      justify-content: flex-start;
      
    `}
`;
