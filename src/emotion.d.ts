declare module '@emotion/styled' {
  import { CreateStyled } from '@emotion/styled';
  import { Theme as IctinusTheme } from '@orfium/ictinus';
  export * from '@emotion/styled/types/index';
  const customStyled: CreateStyled<IctinusTheme>;
  export default customStyled;
}
