import React, { useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });

  const [currentUser, setCurrentUser] = useState({});

  React.useEffect(() => {
    api.getUserInfo()
      .then(userInfo => {
        console.log(userInfo)
        setCurrentUser(userInfo)
      })
      .catch(err => console.log(err));
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ name: '', link: '' });
  }

  function handleUpdateUser(data) {
    return api.setUserInfo(data)
      .then(res => {
        setCurrentUser(res)
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />

        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
        />

        <Footer
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups} 
          onUpdateUser={handleUpdateUser}
        />

        <PopupWithForm
          name="popup-add"
          title="Новое место"
          buttonText="Создать"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        >
          <label className="popup__label">
            <input
              name="name"
              type="text"
              id="title-input"
              className="popup__input popup__input_title"
              placeholder="Название"
              required
              minLength="2"
              maxLength="30"
            />

            <span className="popup__input-error title-input-error"></span>
          </label>

          <label className="popup__label">
            <input
              name="link"
              type="url"
              id="link-input"
              className="popup__input popup__input_link"
              placeholder="Ссылка на картинку"
              required
            />

            <span className="popup__input-error link-input-error"></span>
          </label>
        </PopupWithForm>

        <PopupWithForm
          name="popup-avatar"
          title="Обновить аватар"
          buttonText="Сохранить"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        >
          <label className="popup__label">
            <input
              name="avatar"
              type="url"
              id="avatar-input"
              className="popup__input popup__input_avatar"
              placeholder="Ссылка на картинку"
              required
            />

            <span className="popup__input-error avatar-input-error"></span>
          </label>
        </PopupWithForm>

        <PopupWithForm
          name="popup-delete"
          title="Вы уверены?"
          buttonText="Да"
          //isOpen={}
          onClose={closeAllPopups}
        >

        </PopupWithForm>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
