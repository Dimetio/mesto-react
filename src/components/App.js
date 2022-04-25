import React, { useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState('');

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
    console.log('avatar')
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
    console.log('profile')
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
    console.log('place')
  }

  function handleCardClick(card) {
    setSelectedCard(card)
    console.log('selected-card')
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard('');
  }

  return (
    <div className="page">
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

      <PopupWithForm
        name="popup-edit"
        title="Ретактировать профиль"
        buttonText="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <label className="popup__label">
          <input
            name="name"
            type="text"
            id="name-input"
            className="popup__input popup__input_name"
            placeholder="Имя"
            required
            minLength="2"
            maxLength="40"
          />
          <span className="popup__input-error name-input-error"></span>
        </label>

        <label className="popup__label">
          <input
            name="about"
            type="text"
            id="about-input"
            className="popup__input popup__input_about"
            placeholder="О себе"
            required
            minLength="2"
            maxLength="200"
          />
          <span className="popup__input-error about-input-error"></span>
        </label>
      </PopupWithForm>

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
    </div>
  );
}

export default App;