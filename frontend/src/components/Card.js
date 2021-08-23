import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card (props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const userlikes = props.card.likes.some(i => i._id === currentUser._id);

  //иконка корзины на своих карточках
  const cardDeleteButtonClassName = (
   `photo-card__icon photo-card__icon_type_basket ${!isOwn ? 'photo-card__icon-hidden' : ''}`
  ); 

// Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `photo-card__icon photo-card__icon_type_like ${userlikes ? 'photo-card__icon_type_like-active' : ''}`; 

  function handleClick() {
    props.onCardClick(props.card);
  }  

  function handleLikeClick () {
    props.onCardLike(props.card) 
  }

  function handleDeleteClick () {
    props.onCardDelete(props.card) }

    return (
      <article className="photo-card">
      <img onClick={handleClick} className="photo-card__image" src={props.card.link} alt={props.card.name} />
      <button onClick={handleDeleteClick} type="button" className={cardDeleteButtonClassName} aria-label="удалить"></button>
      <div className="photo-card__place">
        <h2 className="photo-card__title">{props.card.name}</h2>
        <div className="photo-card__likes">
          <button onClick={handleLikeClick} type="button" className={cardLikeButtonClassName} aria-label="лайк"></button>
          <p className="photo-card_icon_type_number-like">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
   )
    
}

export default Card