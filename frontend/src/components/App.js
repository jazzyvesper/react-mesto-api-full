import React from 'react';
import Header from './Header'
import Main from './Main'
import Login from './Login'
import Footer from './Footer'
import ImagePopup from './ImagePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup  from './AddPlacePopup'
import PopupCardDelete  from './PopupCardDelete'
import EditProfilePopup from './EditProfilePopup'
import api from '../utils/api.js'
import { Route, Redirect, Switch, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute'
import Register from './Register';
import InfoTooltip from './InfoTooltip'
import * as auth from '../utils/auth.js';
import succesImgErr from '../images/succesErr.svg';
import succesImgOk from '../images/succesOk.svg';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [isCardDeleteOpen, setIsCardDeleteOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState(null)
  const [currentUser, setCurrentUser] = React.useState({})
  const [cards, setCards] = React.useState([]);
  const [selectedCardDel,setSelectedCardDel] = React.useState(false)
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [isSacces, setIsSacces] = React.useState(false)
  const [succesOk, setSuccesOk] =React.useState(false);
  const history = useHistory(); 
  const [email, setEmail] = React.useState('');
  const succesTextOk = {
    title: 'Вы успешно зарегистрировались!',
    icon: succesImgOk}
  const succesTextErr = {
    title: 'Что-то пошло не так! Попробуйте ещё раз.',
    icon: succesImgErr}

   //Получение данных с сервера
  React.useEffect(() => {
    Promise.all([api.getinfo(), api.getCards()])
    .then(([userData, cardlist]) => {
      setCurrentUser(userData);
      setCards(cardlist)
    })
    .catch(err => console.log(`Ошибка при загрузке профиля: ${err}`))
  }, [])

   
  //Получение токена при какждом мониторовании
  React.useEffect(()=>{
    tokenCheck()
  })

  //Регистрация пользователя
  function onRegister({email,password}) {
    auth.register(email, password)
    .then((res) => {
      if(res){
        handleSubmitClick(succesTextOk)
        history.push('/sign-in') 
      }
    })
    .catch(err => {
      handleSubmitClick(succesTextErr)
    });
  }

  //Вход в профиль
  function onLogin({email,password}){
    auth.authorize(email, password)
    .then((data) => {
      if (data.token){
        localStorage.setItem('token', data.token);
        setLoggedIn(true)
        history.push('/my-profile')
        return data;
      }
    })
    .catch(err => {
      handleSubmitClick(succesTextErr)
    });
  }

  //Выход из ЛК
  function onSignOut(){
    localStorage.removeItem('token');
    history.push('/sign-in');
    setLoggedIn(false)
  }

  //Получение данных пользователя, email
  function tokenCheck() {
    const token = localStorage.getItem('token');
    if (token){
      auth.getContent(token).then((res) => {
        if (res){
          setEmail(res.data.email)
        }
        setLoggedIn(true)
        history.push('/my-profile')
      })
      .catch(err => console.log(`ошибка при загрузке: ${err}`))  
    }
  }
  
  function handleCardClick (card) {
    setSelectedCard(card)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleUpdateAvatar (data) {
    api.changeAvatar(data)
    .then((userData) => {
      setCurrentUser(userData); 
      closeAllPopups();
    })
    .catch(err => console.log(`Ошибка при изменении аватара: ${err}`))
  }

  function handleSubmitClick(data) {
    setIsSacces(true)
    setSuccesOk(data)
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsCardDeleteOpen(false)
    setSelectedCard(null);
    setIsSacces(false)
  }  
  
  function handleCardDeleteOpen(card) {
    setIsCardDeleteOpen(true)
    setSelectedCardDel(card)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  } 
  
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  
  //Обновление информации пользователя
  function handleUpdateUser (data) {
    api.changeInfo(data)
    .then((userData) => {
      setCurrentUser(userData); 
      closeAllPopups()
    })
    .catch(err => console.log(`Ошибка при изменении данных: ${err}`))
  }

  //Добавление новых карточек
  function handleAddPlaceSubmit(data) {
    api.createNewCard(data)
    .then((newCard) => {
      setCards([newCard, ...cards]); 
      closeAllPopups()
    })
    .catch(err => console.log(`Ошибка при добавлении карточки: ${err}`))
  } 
  
  //удаление карточки 
  function handleCardDelete (card) {
    api.deleteCard(card._id)
    .then(() => {
      setCards(()=> cards.filter((c) => c._id !== card._id))
      closeAllPopups()
    })
    .catch(err => console.log(`Ошибка при загрузке профиля: ${err}`))
  }
  
  // постановка лайка
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch(err => console.log(`Ошибка при постановке лайка: ${err}`))
  }
  return (      
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Header token={email} loggedIn={loggedIn} onSignOut={onSignOut} />
      <Switch>
        <Route exact path="/">
        {loggedIn ? <Redirect to="/my-profile" /> : <Redirect to="/sign-in" />}
      </Route> 
        <Route path="/sign-up">
        <Register onRegister={onRegister} />
        </Route>
        <Route path="/sign-in">
        <Login 
          onLogin={onLogin} 
          onSuccesText={handleSubmitClick}/>
        </Route>
        <ProtectedRoute
          path="/my-profile"
          loggedIn={loggedIn}
          component={Main}
          onCardLike={handleCardLike} 
          cards={cards} 
          onCardDelete={handleCardDeleteOpen} 
          onCardClick={handleCardClick} 
          onEditProfile={handleEditProfileClick} 
          onAddPlace={handleAddPlaceClick} 
          onEditAvatar={handleEditAvatarClick} 
        />
      </Switch>
    <Footer />
    <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}/>
    <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
    <AddPlacePopup onAddPlace={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
    <ImagePopup name="image" card={selectedCard !==null && selectedCard} onClose={closeAllPopups} />
    <InfoTooltip data={succesOk !==null && succesOk} name="succes" isOpen={isSacces} onClose={closeAllPopups}/>
    <PopupCardDelete 
      card={selectedCardDel !==null && selectedCardDel} 
      onUpdateUser={handleCardDelete} 
      isOpen={isCardDeleteOpen} 
      onClose={closeAllPopups} />
  </div>
    </CurrentUserContext.Provider>
  );
}

export default App;