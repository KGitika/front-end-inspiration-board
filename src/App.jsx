import { useState } from 'react'
import BoardList from './components/BoardList';
import NewBoardForm from './components/NewBoardForm';
import CardList from './components/CardList';

import './App.css'

function App() {
  const [boardsData, setBoardsData] = useState([]);  // State to hold all boards data
  const [selectedBoard, setSelectedBoard] = useState(null);    //State to keep track of which board is currently selected

  return (
    <div className="App">
      <header className="App-header">
        <h1>Inspiration Board</h1>
      </header>

      {/* list of all boards and allow selecting one */}
      <BoardList 
        boards={boardsData} 
        onBoardSelect={setSelectedBoard} 
      />
    </div>
  );
}

export default App
