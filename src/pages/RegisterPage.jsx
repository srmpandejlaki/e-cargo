import React from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterInput from "../components/regist_login/register-input";
import { register } from "../utils/index";

function RegisterPage() {
  const navigate = useNavigate();
 
  async function onRegisterHandler(user) {
    const { error } = await register(user);
    if (!error) {
      navigate('/');
    }
  }

  return (
    <section className='register-page'>
      <h2>Take it easy budy ...</h2>
      <RegisterInput register={onRegisterHandler} />
      <p>Back to <Link to="/">Login</Link></p>
    </section>
  )
}

export default RegisterPage;