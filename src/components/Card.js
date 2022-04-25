import React from 'react';

import iTrash from '../images/trash.svg';

export default function Card({ card, onCardClick }) {
  const [islike, setIsLike] = React.useState(false);

  function handleCardClick() {
    onCardClick(card);
  }

  function likeClick() {
    setIsLike(!islike);
  }

  return (
    <div className="card">
      <img
        src={iTrash}
        alt="корзина"
        className="card__img-trash"
      />

      <div 
        className="card__img-overlay"
        onClick={handleCardClick}
      >
        <img
          className="card__img"
          src={card.link}
          alt={card.name}
        />
      </div>

      <div className="card__content-wrap">
        <h3 className="card__title">{card.name}</h3>
        <div className="card__like-wrapper">
          <button
            type="button"
            className={`card__like ${islike && "card__like_active"}`}
            onClick={likeClick}
          ></button>
          <span className="card__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </div>
  )
}
