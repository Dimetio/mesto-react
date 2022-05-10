import React from 'react';
import api from '../utils/api';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

import button from '../images/add_btn.svg';


export default function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getCards()])
      .then(([cardList]) => {
        setCards(cardList);
      })
      .catch(err => console.log(err));
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then((newCard) => {
        setCards((state) => state.filter((c) => (c._id === card._id ? "" : newCard)))
      })
  }

  return (
    <main className="main">
      <section className="profile">
        <div className="profile-info">
          <div
            onClick={onEditAvatar}
            className="avatar profile-info__avatar"
            style={{ backgroundImage: `url(${currentUser.userAvatar})` }}
          ></div>

          <div className="profile-info__content">
            <div className="profile-info__content-wrap">
              <h1 className="profile-info__name">{currentUser.userName || ''}</h1>

              <button
                onClick={onEditProfile}
                type="button"
                className="profile-info__edit"
              ></button>
            </div>

            <p className="profile-info__about">{currentUser.userDescription || ''}</p>
          </div>
        </div>

        <div onClick={onAddPlace} className="profile__add">
          <img src={button} alt="добавить" />
        </div>
      </section>

      <div className="cards">
        {
          cards.map((card) => (
            <Card
              card={card}
              key={card._id}
              onCardClick={onCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          ))
        }
      </div>
    </main>
  )
}
