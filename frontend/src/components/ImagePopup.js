import React from 'react';

function ImagePopup(props) {
  return(
    <div className={`popup popup_type_${props.name} ${props.card ? ('popup_opened') : ''}`}>
      <figure className="popup__list">
      <button onClick={props.onClose} type="button" className="popup__close" aria-label="Закрыть форму"></button>
      <img className="popup__image" src={props.card.link} alt="Увеличенное фото" />
      <figcaption className="popup__caption">{props.card.name}</figcaption>
      </figure>
    </div>
  )
}

export default ImagePopup;