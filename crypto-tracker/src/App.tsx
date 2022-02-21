import React from 'react';
import Router from './routes/Router';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300&family=Roboto:wght@300&display=swap');
  ${reset}
  body{
    font-family: 'Noto Sans KR','Roboto', sans-serif;
  }
  
  a{
    text-decoration: none;
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
    </>
  );
}

export default App;
