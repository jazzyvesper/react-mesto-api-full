import React from 'react';

function InfoTooltip (props) {

  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? ('popup_opened') : ''}`} >
      <div className="popup__container">   
        <button onClick={props.onClose} type="button" className="popup__close" aria-label="Закрыть форму"></button>
        <img className="popup__icon" src={props.data.icon} alt="иконка подтверждения" />
        <h2 className="popup__title">{props.data.title}</h2>
      </div>
    </div>
  )
}

export default InfoTooltip 