import { useState } from 'react';
import PropTypes from 'prop-types';
import './NewBoardForm.css';


// Initial empty board object used to reset the form
const NEW_BOARD = {
  title: '',
  owner: '',
};

const NewBoardForm = ({ createNewBoard }) => {
  const [boardData, setBoardData] = useState(NEW_BOARD);  // State to store form input values
  const [formVisible, setFormVisible] = useState(true);  // State to store form input values

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

  function onShowHideBnt(){
    setFormVisible(!formVisible);
  }

  let form=(
    <form onSubmit={handleSubmit} className="new-board-form">
      <h2>Create a New Board</h2>
      <div>
        <label htmlFor="add-title">Title:</label>
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
        <label htmlFor="add-owner">Owner's Name:</label>
        <input
          id="add-owner"
          name="owner"
          type="text"
          value={boardData.owner}
          onChange={handleChange}
          placeholder="Enter owner name"
        />
      </div>

      <div>
        <label>Preview:</label>
        <input type="submit" value="submit" />
      </div>
    </form>
  );

  let msg=(formVisible?"Hide New Board Form":"Show New Board Form");

  let button= 
    (
      <div>
        <input
          type="button"
          value={msg}
          onClick={onShowHideBnt}
        />
      </div>
    );

    if (formVisible){
      return (
        <>
          {form}
          {button}
        </>
      );   
    }else {
      return (
        <>
          {button}
        </>
      )
    }



};

NewBoardForm.propTypes = {
  createNewBoard: PropTypes.func.isRequired,
};

export default NewBoardForm;