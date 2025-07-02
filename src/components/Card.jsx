import './Card.css';
import PropTypes from 'prop-types';

const Card = ({ card, onLike }) => {
  return (
    <div className="card-item">
      <p className="card-item__message">{card.message}</p>
      <ul className="card-item__controls">
        <li><p>{card.likes_count} 💕</p></li>
        <li><p onClick={() => onLike(card.card_id)} style={{ cursor: "pointer" }}>+1</p></li>
        {/* Optional Delete:
        <li><p className="card-item__delete">Delete</p></li>
        */}
      </ul>
    </div>
  );
};

Card.propTypes = {
  card: PropTypes.shape({
    card_id: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
    likes_count: PropTypes.number.isRequired,
  }).isRequired,
  onLike: PropTypes.func.isRequired,
};

export default Card;
