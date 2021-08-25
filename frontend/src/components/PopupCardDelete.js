import React from 'react';
import PopupWithForm from './PopupWithForm'

function PopupCardDelete(props) {

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser(props.card)
  }

  return (
    <PopupWithForm onSubmit={handleSubmit} name="delete-card" title="Вы уверены?" buttonName="Да" 
    isOpen={props.isOpen} onClose={props.onClose}>
    </PopupWithForm>
  )
}

export default PopupCardDelete