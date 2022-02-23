import React, { useState } from 'react';
import Router from './routes/Router';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { ReactQueryDevtools } from 'react-query/devtools';
import { darkTheme, lightTheme } from './theme';
import { ThemeProvider } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from './atoms';
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300&family=Roboto:wght@300&display=swap');
  ${reset}
  body{
    font-family: 'Noto Sans KR','Roboto', sans-serif;
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
  }
  
  a{
    text-decoration: none;
    color:inherit;
  }
  
  *{
    box-sizing: border-box;
  }
`;
function App() {
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Router />
      <ReactQueryDevtools initialIsOpen />
    </ThemeProvider>
  );
}

export default App;
