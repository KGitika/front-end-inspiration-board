import Board from './Board.jsx';
import './BoardList.css';
import PropTypes from 'prop-types';

const BoardList = ({ boards, onBoardSelect }) => {
  console.log(boards)
  return (
    <ol className="boards__list">
      {boards.map(board => (
        <Board key={board.id} board={board} onBoardSelect={onBoardSelect} />
      ))}
    </ol>
  );
};

BoardList.propTypes = {
  boards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,      
      title: PropTypes.string.isRequired,
      owner: PropTypes.string.isRequired,
    })
  ).isRequired,
  onBoardSelect: PropTypes.func.isRequired,
};

export default BoardList;
