import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../../hooks/useInput';

function RegisterInput({ register }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const onSubmitHandler = (event) => {
    event.preventDefault();
    register({ name, email, password }); // Memanggil register, bukan login
  };

  return (
    <form onSubmit={onSubmitHandler} className='register-input'>
      <input type="text" id="name" value={name} onChange={onNameChange} placeholder='Input Your Name'/>
      <input type="email" id="email" value={email} onChange={onEmailChange} placeholder='Input Your Email'/>
      <input type="password" id="password" value={password} onChange={onPasswordChange} placeholder='Input Your Password'/>
      <button type="submit">Register</button>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
