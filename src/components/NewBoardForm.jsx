import { useState } from 'react';
import PropTypes from 'prop-types';

// Initial empty board object used to reset the form
const NEW_BOARD = {
  title: '',
  owner: '',
};

const NewBoardForm = ({ createNewBoard }) => {
  const [boardData, setBoardData] = useState(NEW_BOARD);  // State to store form input values

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();  

    // Pass the board data to parent
    createNewBoard(boardData);

    console.log('Submitting board:', boardData);

    // Reset form
    setBoardData(NEW_BOARD);
  };


  // Update state on input change
  const handleChange = (e) => {
    setBoardData({ ...boardData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a New Board</h2>
      <div>
        <label htmlFor="add-title">Board Title:</label>
        <input
          id="add-title"
          name="title"
          type="text"
          placeholder="Board Title"
          value={boardData.title}
          onChange={handleChange}
        />
      </div>
      
      <div>
        <label htmlFor="add-owner">Owner Name:</label>
        <input
          id="add-owner"
          name="owner"
          type="text"
          value={boardData.owner}
          onChange={handleChange}
          placeholder="Enter owner name"
        />
      </div>

      <input type="submit" value="Add Board" />
    </form>
  );
};

NewBoardForm.propTypes = {
  createNewBoard: PropTypes.func.isRequired,
};

export default NewBoardForm;