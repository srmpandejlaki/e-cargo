import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../../hooks/useInput';

function LoginInput({ login }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const onSubmitHandler = (event) => {
    event.preventDefault();
    login({ email, password });
  };

  return (
    <form className="login-input" onSubmit={onSubmitHandler}>
      <input
        type="email"
        id="email"
        value={email}
        onChange={onEmailChange}
        placeholder="Input Your Email"
        required
      />
      <input
        type="password"
        id="password"
        value={password}
        onChange={onPasswordChange}
        placeholder="Input Your Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
