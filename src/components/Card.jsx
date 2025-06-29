import './Card.css';
import PropTypes from 'prop-types';

const Card = ({ card, onLike }) => {
    return (
        <div className="card">
        <p>{card.message}</p>
        <div className="card-footer">
            <span>❤️‍🔥 {card.likes_count}</span>
            <button onClick={() => onLike(card.card_id)}>Like</button>
        </div>
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