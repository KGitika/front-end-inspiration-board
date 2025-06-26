import { useState } from 'react';
import PropTypes from 'prop-types';

const NewBoardForm = ({ createNewBoard }) => {
  // Initialize form state
  const [boardData, setBoardData] = useState({
    title: '',
    owner: '',
  });

  // Update state on input change
  const handleChange = (e) => {
    setBoardData({ ...boardData, [e.target.name]: e.target.value });
  };

  return (
    <form>
      <h2>Create a New Board</h2>
      <input
        name="title"
        type="text"
        placeholder="Board Title"
        value={boardData.title}
        onChange={handleChange}
      />
      <input
        name="owner"
        type="text"
        placeholder="Owner Name"
        value={boardData.owner}
        onChange={handleChange}
      />
    </form>
  );
};

NewBoardForm.propTypes = {
  createNewBoard: PropTypes.func.isRequired,
};

export default NewBoardForm;