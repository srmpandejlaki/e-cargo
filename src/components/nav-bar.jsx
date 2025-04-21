import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaHome } from 'react-icons/fa';
import { ThemeConsumer } from '../contexts/themeContext';
import { LocaleConsumer } from '../contexts/localeContext';
import { FaMoon, FaSun } from 'react-icons/fa';
 
function NavBar({ logout }) {
  return (
    <LocaleConsumer>
      {
        ({ locale, toggleLocale}) => {
          return (
             <nav className="nav-bar">
              <button onClick={toggleLocale}>{locale === 'id' ? 'en' : 'id'}</button>
              <ThemeConsumer>
                {({ theme, toggleTheme }) => {
                  return <button onClick={toggleTheme}>{theme === 'light' ? <FaMoon /> : <FaSun />}</button>;
                }}
              </ThemeConsumer>
              <Link to="/"><FaHome size={24} /></Link>
              <button onClick={logout}>Logout</button>
            </nav>
          )
        }
      }
    </LocaleConsumer>
  );
}

NavBar.propTypes = {
  logout: PropTypes.func.isRequired,
};
 
export default NavBar;