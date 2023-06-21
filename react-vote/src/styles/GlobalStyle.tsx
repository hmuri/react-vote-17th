import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

  @font-face {
      font-family: 'Pretendard-Regular';
      src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
      font-weight: 400;
      font-style: normal;
  }  

  *, *::before, *::after {
      box-sizing: border-box;
  }

  body {
    font-family: 'Pretendard-Regular';
    line-height: 1.5;
  }

  button{
    font-family: 'Pretendard-Regular';
    line-height: 1.5;
    font-size: 28px;
    color: #FFFFFF;
  }

  textarea{
    font-family: 'Pretendard-Regular';
    line-height: 1.5;
    font-size: 24px;
    resize: none;
    &::placeholder{
      color: rgba(33, 33, 33, 0.3);
    }
    :focus{
      outline:none;
    }
  }
`;
