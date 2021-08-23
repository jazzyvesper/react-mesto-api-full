import React from 'react';

function FormAuth(props) {
 const email = props.email;
 const password = props.password
    return (
        
        <div className="entrance__container">
          <h2 className="entrance__title">{props.title}</h2>
          <form className="entrance__form" onSubmit={props.onSubmit} >
          <input type="email" onChange={props.onChangeEmail} value={email || ''} className="entrance__item entrance__item_type_email" name="email" id="email" placeholder="Email" required/>
          <span className="email-error entrance__item-error"></span>
          <input type="text" onChange={props.onChangePassword} value={password || ''} className="entrance__item entrance__item_type_password" name="password" id="password" placeholder="Пароль" required minLength="2" maxLength="40" />
          <span className="password-error entrance__item-error"></span>
          <button className="entrance__button" type="submit" aria-label={props.buttonName}>{props.buttonName}</button>
          </form>
          {props.children}
        </div>
      
    )
  }
  
  export default FormAuth;