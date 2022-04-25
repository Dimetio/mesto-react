import React from 'react';
import api from '../utils/api';
import Card from './Card';

import button from '../images/add_btn.svg';


export default function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
  const [userName, setUserName] = React.useState("Dubinin Dmitry");
  const [userDescription, setUserDescription] = React.useState("Developer");
  const [userAvatar, setUserAvatar] = React.useState();
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([userData, cardList]) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);

        setCards(cardList);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile-info">
          <div
            onClick={onEditAvatar}
            className="avatar profile-info__avatar"
            style={{ backgroundImage: `url(${userAvatar})` }}
          ></div>

          <div className="profile-info__content">
            <div className="profile-info__content-wrap">
              <h1 className="profile-info__name">{userName}</h1>

              <button
                onClick={onEditProfile}
                type="button"
                className="profile-info__edit"
              ></button>
            </div>

            <p className="profile-info__about">{userDescription}</p>
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
            />
          ))
        }
      </div>
    </main>
  )
}
