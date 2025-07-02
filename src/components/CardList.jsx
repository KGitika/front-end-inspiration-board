import Card from "./Card";
import PropTypes from 'prop-types';
import './Card.css';

const CardList = ({ cards, onLike }) => {
  if (!cards || cards.length === 0) {
    return <div className="card-items__container">No cards yet!</div>;
  }

  return (
    <div className="card-items__container">
      {cards.map((card) => (
        <Card
          key={card.card_id}
          card={card}
          onLike={onLike}
        />
      ))}
    </div>
  );
};

CardList.propTypes = {
  cards: PropTypes.array.isRequired,
  onLike: PropTypes.func.isRequired,
};

export default CardList;
