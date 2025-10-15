import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import SearchPage from './components/SearchPage';
import BookingPage from './components/BookingPage';
import PaymentPage from './components/PaymentPage';

const theme = {
  colors: {
    primary: '#007bff',
    primaryHover: '#0056b3',
    secondary: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107',
    light: '#f8f9fa',
    dark: '#343a40',
    white: '#ffffff',
    gray: '#6c757d',
    lightGray: '#e9ecef'
  },
  fonts: {
    primary: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px'
  }
};

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${props => props.theme.fonts.primary};
    background-color: ${props => props.theme.colors.light};
    color: ${props => props.theme.colors.dark};
    line-height: 1.6;
  }

  button {
    font-family: inherit;
  }

  input, textarea, select {
    font-family: inherit;
  }
`;

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const Header = styled.header`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 1rem 0;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
`;

const HeaderContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
`;

const Logo = styled.h1`
  color: white;
  font-size: 1.8rem;
  font-weight: 700;
  
  span {
    color: #ffc107;
  }
`;

const Main = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Container>
          <Header>
            <HeaderContainer>
              <Logo>
                Bus<span>Tickets</span> Polska
              </Logo>
            </HeaderContainer>
          </Header>
          <Main>
            <Routes>
              <Route path="/" element={<SearchPage />} />
              <Route path="/booking" element={<BookingPage />} />
              <Route path="/payment" element={<PaymentPage />} />
            </Routes>
          </Main>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;