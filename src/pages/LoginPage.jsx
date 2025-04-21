import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LoginInput from '../components/regist_login/login-input';
import { login } from '../utils/index';
 
function LoginPage({ loginSuccess }) {
  async function onLogin({ email, password }) {
    const { error, data } = await login({ email, password });
 
    if (!error) {
      loginSuccess(data);
    }
  }
 
  return (
    <section className='login-page'>
      <h2>Please Login to continue ...</h2>
      <LoginInput login={onLogin} />
      <p>Don't have an account yet? <Link to="/register">Sign Up now</Link></p>
    </section>
  );
}
 
LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
}
 
export default LoginPage;