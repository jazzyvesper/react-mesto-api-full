import React from 'react';
import logo from '../images/logo.svg';
import { NavLink, useLocation } from 'react-router-dom';

function Header(props) {
  const location = useLocation()
  const[navClick, setNavclick]= React.useState('')
  
  function handleClick(){
    setNavclick(true)
  }

  function handleClickClose(){
    setNavclick(false)
  }
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип" /> 
      {props.loggedIn && !navClick ?
        <div onClick={handleClick} className="header__drop-down"></div> : (props.loggedIn && navClick) ?
        <button onClick={handleClickClose} type="button" className="header__drop-close" aria-label="Закрыть"></button> : ''
        }
      {location.pathname ==='/my-profile' ? 
        <div className={`header__user-params ${ navClick && ('header__tab_active')}`}>
          <p className="header__email">{props.token}</p>
          <button onClick={props.onSignOut} className="header__go-out">Выйти</button>
        </div> :
        <nav className="header__menu">
          <NavLink to="/sign-in" activeClassName="header__active-link" className="header__sign-in">Войти</NavLink>
          <NavLink to="/sign-up" activeClassName="header__active-link" className="header__sign-up">Регистрация</NavLink>
        </nav>
      }  
    </header>
  );
}

export default Header;