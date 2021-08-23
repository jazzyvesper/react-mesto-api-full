import React from 'react';
import { Link } from 'react-router-dom';
import FormAuth from './FormAuth'

function Register(props) {
    
    const [email, setEmail] = React.useState(' ');
    const [password, setPassword] = React.useState('');

    function handleChangeEmail(e) {
      setEmail(e.target.value);
    }
  
    function handleChangePassword (e) {
      setPassword(e.target.value);
    }
  
    function handleSubmit(e) {
      e.preventDefault();
      props.onRegister({email, password})
      }
  
    return (
      <FormAuth 
        title="Регистрация" 
        buttonName="Зарегистрироваться" 
        onSubmit={handleSubmit} 
        onChangeEmail={handleChangeEmail} 
        onChangePassword={handleChangePassword}
        email={email}
        password={password}
        >
        <div className="entrance__signup">
        <p>Уже зарегистрированы?</p>
        <Link to="/sign-in" className="entrance__link">Войти</Link>
      </div>
        </FormAuth>
        
    )
  }
  
  export default Register;