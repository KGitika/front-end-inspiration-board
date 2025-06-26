import './Board.css';
import PropTypes from 'prop-types';

const Board = ({ board, onBoardSelect }) => {
  return (
    <li onClick={() => onBoardSelect(board)}>
      <div>{board.title}</div>
    </li>
  );
};

Board.propTypes = {
  board: PropTypes.shape({
    id: PropTypes.number.isRequired,     
    title: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
  }).isRequired,
  onBoardSelect: PropTypes.func.isRequired,
};

export default Board;