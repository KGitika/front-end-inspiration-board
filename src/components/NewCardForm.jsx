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
    <section className="new-card-form__container">
      <h2>Create a New Card</h2>
      <form onSubmit={handleSubmit} className="new-card-form__form">
        <label htmlFor="add-message">Message</label>
        <input
          id="add-message"
          name="message"
          type="text"
          className="invalid-form-input"
          placeholder="Enter card message"
          value={cardData.message}
          onChange={handleChange}
        />

        <p>Preview: {cardData.message}</p>

        <input
          type="submit"
          className="new-card-form__form-submit-btn"
          value="Submit"
          disabled={isMessageEmpty}
        />
      </form>
    </section>
  );
};

NewCardForm.propTypes = {
  createNewCard: PropTypes.func.isRequired,
};

export default NewCardForm;
