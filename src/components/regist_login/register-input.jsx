import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../../hooks/useInput';

function RegisterInput({ register }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [server, onServerChange] = useInput('server-utama'); // default server

  const onSubmitHandler = (event) => {
    event.preventDefault();
    register({ name, email, server, password });
  };

  return (
    <form onSubmit={onSubmitHandler} className='register-input'>
      <input
        type="text"
        id="name"
        value={name}
        onChange={onNameChange}
        placeholder="Input Your Name"
        required
      />
      <input
        type="email"
        id="email"
        value={email}
        onChange={onEmailChange}
        placeholder="Input Your Email"
        required
      />
      <select id="server" value={server} onChange={onServerChange} required>
        <option value="master">Server Utama</option>
        <option value="side-a">Server Side A</option>
        <option value="side-b">Server Side B</option>
      </select>
      <input
        type="password"
        id="password"
        value={password}
        onChange={onPasswordChange}
        placeholder="Input Your Password"
        required
      />
      <button type="submit">Register</button>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
