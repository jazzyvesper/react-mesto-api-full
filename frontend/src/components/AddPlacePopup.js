import React from 'react';
import PopupWithForm from './PopupWithForm'

function AddPlacePopup (props) {
  const [place, setPlace] = React.useState('');
  const [link, setLink ] = React.useState('')

  React.useEffect(()=> {
    setPlace('');
    setLink('')
  },  [props.isOpen])

  function handleAddPlace(e) {
    setPlace(e.target.value);
  }

  function handleAddLink (e) {
    setLink(e.target.value);
  }

  function handleAddPlaceSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: place,
      link 
    });
    
  }
  
  return (
    <PopupWithForm onSubmit={handleAddPlaceSubmit} name="add-card" title="Новое место" buttonName="Создать" isOpen={props.isOpen} onClose={props.onClose}>
      <input value={place || ''} onChange={handleAddPlace} type="text" className="popup__item popup__item_type_place" name="name" id="place-name" placeholder="Название" required minLength="2" maxLength="30" />
      <span className="place-name-error popup__item-error"></span>
      <input value={link || ''} onChange={handleAddLink} type="url" className="popup__item popup__item_type_link" name="link" id="place-link" placeholder="Ссылка на картинку" required />
      <span className="place-link-error popup__item-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup 