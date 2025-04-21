import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DetailPageWrapper from './pages/DetailPage';
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import NavBar from './components/nav-bar';
import { ThemeProvider } from './contexts/themeContext'
import { LocaleProvider } from './contexts/localeContext'

import { getUserLogged, putAccessToken } from './utils/index';

class App extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      authedUser: null,
      theme: localStorage.getItem('theme') || 'light',
      toggleTheme: () => {
        this.setState((prevState) => {
          const newTheme = prevState.theme === 'light' ? 'dark' : 'light';
          localStorage.setItem('theme', newTheme);
 
          return {
            theme: newTheme
          };
        });
      },
      localeContext: {
        locale: 'id',
        toggleLocale: () => {
          this.setState((prevState) => {
            return {
              localeContext: {
                ...prevState.localeContext,
                locale: prevState.localeContext.locale === 'id' ? 'en' : 'id'
              }
            }
          })
        }
      }
    };

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  async onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    this.setState(() => {
      return {
        authedUser: data,
        initializing: true,
      };
    });
  }

  async componentDidMount() {
    const { data } = await getUserLogged();
    this.setState(() => {
      return {
        authedUser: data,
        initializing: false,
      };
    });
    
    document.documentElement.setAttribute('data-theme', this.state.theme);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.theme !== this.state.theme) {
      document.documentElement.setAttribute('data-theme', this.state.theme);
    }
  }

  onLogout() {
    this.setState(() => {
      return {
        authedUser: null
      }
    });
    putAccessToken('');
  }
 
  render() {
    if (this.state.initializing) {
      return null;
    }
 
    if (this.state.authedUser === null) {
      return (
        <LocaleProvider value={this.state.localeContext}>
          <div className='main'>
            <header className='header'>
              <h1>DiPerNot</h1>
            </header>
            <main>
              <Routes>
                <Route path="/*" element={<LoginPage loginSuccess={this.onLoginSuccess} />} />
                <Route path="/register" element={<RegisterPage />} />
              </Routes>
            </main>
          </div>
        </LocaleProvider>
      )
    }
 
    return (
      <LocaleProvider value={this.state.localeContext}>
        <ThemeProvider value={this.state}>
          <div className='main'>
            <header>
              <section className='header'>
                <h1>DiPerNot</h1>
                  <NavBar logout={this.onLogout} />
              </section>
              <p className='text'>{this.state.localeContext.locale === 'id' ? 
                'Welcome to the Digital Personal Notes Chest. Always Save All Your Memories Here' : 
                'Selamat Datang di Digital Personal Notes Chest. Simpanlah Semua Kenangan Anda di Sini'}
              </p>
            </header>
            <main>
              <Routes>
                <Route exact path='/' element={<HomePage />} />
                <Route path='/note/:id' element={<DetailPageWrapper />} />
                <Route path='*' element={<NotFoundPage />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </LocaleProvider>
    );
  }
}

export default App;
