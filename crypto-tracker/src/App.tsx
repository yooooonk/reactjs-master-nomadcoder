import React from 'react';
import Router from './routes/Router';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { ReactQueryDevtools } from 'react-query/devtools';

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
  return (
    <>
      <GlobalStyle />
      <Router />
      <ReactQueryDevtools initialIsOpen />
    </>
  );
}

export default App;
