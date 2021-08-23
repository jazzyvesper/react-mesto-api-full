import React from 'react';
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup(props) {
  const [name, setName] = React.useState('');
  const [description, setDescription ] = React.useState('')
  const currentUser = React.useContext(CurrentUserContext);
  
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]); 

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription (e) {
    setDescription(e.target.value);
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
        name,
        about: description,
    });
  }

  return (
    <PopupWithForm onSubmit={handleSubmit} name="edit" title="Редактировать профиль" buttonName="Сохранить" isOpen={props.isOpen} onClose={props.onClose}>
      <input type="text" className="popup__item popup__item_type_name" value={name || ''} onChange={handleChangeName} name="first-name" id="first-name" placeholder="Имя" required minLength="2" maxLength="40" />
      <span className="first-name-error popup__item-error"></span>
      <input type="text" className="popup__item popup__item_type_profession" value={description || ''} onChange={handleChangeDescription} name="profession" id="profession" placeholder="Вид деятельности" required minLength="2" maxLength="40" />
      <span className="profession-error popup__item-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup