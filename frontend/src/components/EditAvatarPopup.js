import React from 'react';
import PopupWithForm from './PopupWithForm'

function EditAvatarPopup (props) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
    e.target.reset();
  } 


  return (
    <PopupWithForm 
      onSubmit={handleSubmit} 
      name="new-avatar" 
      title="Обновить аватар" 
      buttonName="Сохранить" 
      isOpen={props.isOpen} 
      onClose={props.onClose}>
      <input 
        type="url" 
        ref={avatarRef} 
        className="popup__item popup__item_type_link" 
        name="avatarlink" 
        id="avatar-link" 
        placeholder="Ссылка на картинку" required />
      <span className="avatar-link-error popup__item-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup