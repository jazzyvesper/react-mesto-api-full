function PopupWithForm(props) {
  
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? ('popup_opened') : ''}`} >
      <div className="popup__container">
        <button onClick={props.onClose} type="button" className="popup__close" aria-label="Закрыть форму"></button>
        <h2 className="popup__title">{props.title}</h2>
        <form name={props.name} className="popup__form"  onSubmit ={props.onSubmit} >
          {props.children}
          <button className="popup__button popup__button_active" type="submit" aria-label={props.buttonName}>{props.buttonName}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;