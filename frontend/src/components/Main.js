import React from 'react';
import Card from './Card'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
      <main className="content">
      <section className="profile">
        <button onClick={props.onEditAvatar} type="button" className="profile__avatar-button"></button>
        <img className="profile__image" src={currentUser.avatar} alt="Кусто" />
        <div className="profile__text">
          <div className="profile__column">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button onClick={props.onEditProfile}  type="button" className="profile__edit-button" aria-label="Изменить данные" />
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button onClick={props.onAddPlace} type="button" className="profile__add-button" aria-label="Добавить фото" />
      </section>
      <section className="photo-grid"> 
      {props.cards.map((card) => (
      <Card card={card} key={card._id} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />
      ))}
      </section>
    </main>
  )
}

export default Main;