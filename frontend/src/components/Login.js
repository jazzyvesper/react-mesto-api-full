import React from 'react';
import FormAuth from './FormAuth'

function Login(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
    
  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }
  
  function handleChangePassword (e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin({email, password})
    setEmail('');
    setPassword('')
  } 
  
  return (
    <FormAuth 
    onSubmit={handleSubmit} 
    title="Вход" 
    buttonName="Войти"
    onChangeEmail={handleChangeEmail} 
    onChangePassword={handleChangePassword}
    email={email}
    password={password}>
    </FormAuth>
  )
}
  
  export default Login;