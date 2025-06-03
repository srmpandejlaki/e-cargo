import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import NavBar from './components/nav-bar';
import { ThemeProvider } from './contexts/themeContext';
import { LocaleProvider } from './contexts/localeContext';
import { getUserLogged, putAccessToken } from './utils/index';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authedUser: null,
      initializing: true,
      theme: localStorage.getItem('theme') || 'light',
      toggleTheme: () => {
        this.setState((prevState) => {
          const newTheme = prevState.theme === 'light' ? 'dark' : 'light';
          localStorage.setItem('theme', newTheme);
          return { theme: newTheme };
        });
      },
      localeContext: {
        locale: 'id',
        toggleLocale: () => {
          this.setState((prevState) => ({
            localeContext: {
              ...prevState.localeContext,
              locale: prevState.localeContext.locale === 'id' ? 'en' : 'id'
            }
          }));
        }
      }
    };

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  async componentDidMount() {
    try {
      const { data } = await getUserLogged();
      this.setState({ authedUser: data, initializing: false });
    } catch (error) {
      this.setState({ initializing: false });
    }

    document.documentElement.setAttribute('data-theme', this.state.theme);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.theme !== this.state.theme) {
      document.documentElement.setAttribute('data-theme', this.state.theme);
    }
  }

  async onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    try {
      const { data } = await getUserLogged();
      this.setState({ authedUser: data });
    } catch (error) {
      console.error('Failed to fetch user after login', error);
    }
  }

  onLogout() {
    this.setState({ authedUser: null });
    putAccessToken('');
  }

  render() {
    if (this.state.initializing) {
      return <p>Loading...</p>;
    }

    if (this.state.authedUser === null) {
      return (
        <LocaleProvider value={this.state.localeContext}>
          <div className="main">
            <header className="header">
              <h1>E-Cargo</h1>
            </header>
            <main>
              <Routes>
                <Route path="/*" element={<LoginPage loginSuccess={this.onLoginSuccess} />} />
                <Route path="/register" element={<RegisterPage />} />
              </Routes>
            </main>
          </div>
        </LocaleProvider>
      );
    }

    return (
      <LocaleProvider value={this.state.localeContext}>
        <ThemeProvider value={this.state}>
          <div className="main">
            <header>
              <section className="header">
                <h1>E-Cargo</h1>
                <NavBar logout={this.onLogout} />
              </section>
              <p className="text">
                {this.state.localeContext.locale === 'id'
                  ? 'Selamat Datang di E-Cargo'
                  : 'Welcome to the E-Cargo.'}
              </p>
            </header>
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </LocaleProvider>
    );
  }
}

export default App;
