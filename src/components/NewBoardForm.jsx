import { useState } from "react";
import PropTypes from "prop-types";

const NEW_BOARD = {
  title: "",
  owner: "",
};

const NewBoardForm = ({ createNewBoard }) => {
  const [boardData, setBoardData] = useState(NEW_BOARD);
  const [formVisible, setFormVisible] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    createNewBoard(boardData);
    console.log("Submitting board:", boardData);
    setBoardData(NEW_BOARD);
  };

  const handleChange = (e) => {
    setBoardData({ ...boardData, [e.target.name]: e.target.value });
  };

  const onShowHideBtn = () => {
    setFormVisible(!formVisible);
  };

  const isFormValid =
    boardData.title.trim() !== "" && boardData.owner.trim() !== "";

  return (
    <section className="new-board-form__container">
      <h2>Create a New Board</h2>
      {formVisible && (
        <form className="new-board-form__form" onSubmit={handleSubmit}>
          <label htmlFor="add-title">Title</label>
          <input
            id="add-title"
            name="title"
            type="text"
            className="invalid-form-input"
            placeholder="Board Title"
            value={boardData.title}
            onChange={handleChange}
          />

          <label htmlFor="add-owner">Owner's Name</label>
          <input
            id="add-owner"
            name="owner"
            type="text"
            className="invalid-form-input"
            placeholder="Enter owner name"
            value={boardData.owner}
            onChange={handleChange}
          />

          <p>
            Preview: {boardData.title} - {boardData.owner}
          </p>

          <input
            type="submit"
            className="new-board-form__form-submit-btn"
            disabled={!isFormValid}
            value="Submit"
          />
        </form>
      )}

      <span
        className="new-board-form__toggle-btn"
        onClick={onShowHideBtn}
        role="button"
        style={{ cursor: "pointer" }}
      >
        {formVisible ? "Hide New Board Form" : "Show New Board Form"}
      </span>
    </section>
  );
};

NewBoardForm.propTypes = {
  createNewBoard: PropTypes.func.isRequired,
};

export default NewBoardForm;
