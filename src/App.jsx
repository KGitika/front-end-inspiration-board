import { useState, useEffect  } from 'react'
import BoardList from './components/BoardList';
import NewBoardForm from './components/NewBoardForm';
import CardList from './components/CardList';
import './App.css'
import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

function App() {
  const [boardsData, setBoardsData] = useState([]);  // State to hold all boards data
  const [selectedBoard, setSelectedBoard] = useState(null);    //State to keep track of which board is currently selected
  
  // Fetch boards when the component mounts
  useEffect(() => {
    axios.get(`${BASE_URL}/boards`)
      .then(response => setBoardsData(response.data.boards))
      .catch(error => console.error('Error fetching boards:', error));
  }, []);

  // Handle selecting a board
  const handleBoardSelect = (board) => {
    setSelectedBoard(board);
  };

  // Add a new board
  const createNewBoard = (newBoard) => {
    axios.post(`${BASE_URL}/boards`, newBoard)
      .then(response => {
        setBoardsData([...boardsData, response.data.board]);
      })
      .catch(error => console.error('Error creating board:', error));
  };


    const cardLike = (card_id) => {
      //console.log("like",card_id);
      axios.patch(`${BASE_URL}/cards/${card_id}/like`)
        .then(response => {
          //setBoardsData([...boardsData, response.data.board]);
          console.log(response);
          let updatedCard=response.data.card;
          let board= boardsData.find((brd)=>brd.id==updatedCard.board_id);
          let card=board.cards.find((crd)=>crd.id==updatedCard.id);
          card.likes_count++;
          setBoardsData([...boardsData]);
        })
        .catch(error => console.error('Error creating board:', error));      
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Inspiration Board</h1>
      </header>

      <NewBoardForm createNewBoard={createNewBoard} />

      {/* list of all boards and allow selecting one */}
      <BoardList 
        boards={boardsData} onBoardSelect={handleBoardSelect} 
      />

      {selectedBoard && (
        <>
          <h2>Selected Board: {selectedBoard.title}</h2>
          <CardList cards={selectedBoard.cards} onLike={cardLike} />
        </>
      )}
    </div>
  );
}

export default App
