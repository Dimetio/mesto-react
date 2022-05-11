import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({avatar:avatarRef.current.value})
  }

  return (
    <PopupWithForm
      name="popup-avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          ref={avatarRef}
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
  )
}
