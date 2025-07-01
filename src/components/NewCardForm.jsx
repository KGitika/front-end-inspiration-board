import { useState } from 'react';
import PropTypes from 'prop-types';
import './NewCardForm.css';

const NEW_CARD = {
  message: '',
};

const NewCardForm = ({ createNewCard }) => {
  const [cardData, setCardData] = useState(NEW_CARD);

  const handleSubmit = (e) => {
    e.preventDefault();
    createNewCard(cardData);
    setCardData(NEW_CARD); // Reset form
  };

  const handleChange = (e) => {
    setCardData({ ...cardData, [e.target.name]: e.target.value });
  };

  const isMessageEmpty = cardData.message.trim() === '';

  return (
    <form onSubmit={handleSubmit} className="new-card-form">
      <h2>Create a New Card</h2>

      <div>
        <label htmlFor="add-message">Message:</label>
        <input
          id="add-message"
          name="message"
          type="text"
          placeholder="Enter card message"
          value={cardData.message}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Preview:</label>
        <p className="card-preview">{cardData.message}</p>
      </div>

      <div>
        <input
          type="submit"
          value="Submit Card"
          disabled={isMessageEmpty}
        />
      </div>
    </form>
  );
};

NewCardForm.propTypes = {
  createNewCard: PropTypes.func.isRequired,
};

export default NewCardForm;

