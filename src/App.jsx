import { useState, useEffect } from "react";
import BoardList from "./components/BoardList";
import NewBoardForm from "./components/NewBoardForm";
import NewCardForm from "./components/NewCardForm";
import CardList from "./components/CardList";
import "./App.css";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_BACKEND_URL

function App() {
  const [boardsData, setBoardsData] = useState([]); // State to hold all boards data
  const [selectedBoard, setSelectedBoard] = useState({
    title: "Select a Board from the Board List!",
    owner: "",
  }); //State to keep track of which board is currently selected

  // Fetch boards when the component mounts
  useEffect(() => {
    axios
      .get(`${BASE_URL}/boards`)
      .then((response) => setBoardsData(response.data.boards))
      .catch((error) => console.error("Error fetching boards:", error));
  }, []);

  // Handle selecting a board
  const handleBoardSelect = (board) => {
    setSelectedBoard(board);
  };

  // Add a new board
  const createNewBoard = (newBoard) => {
    axios
      .post(`${BASE_URL}/boards`, newBoard)
      .then((response) => {
        setBoardsData([...boardsData, response.data.board]);
      })
      .catch((error) => console.error("Error creating board:", error));
  };

  // Add a new card
  const createNewCard = (newCard) => {
    axios
      .post(`${BASE_URL}/boards/${selectedBoard.id}/cards`, newCard)
      .then((response) => {
        const updatedCard = response.data.card;

        // Update boardsData array
        const updatedBoards = boardsData.map((board) => {
          if (board.id === selectedBoard.id) {
            return {
              ...board,
              cards: [...board.cards, updatedCard],
            };
          }
          return board;
        });

        setBoardsData(updatedBoards);

        // Update the selectedBoard state with new card added
        setSelectedBoard((prevBoard) => ({
          ...prevBoard,
          cards: [...prevBoard.cards, updatedCard],
        }));
      })
      .catch((error) => console.error("Error creating card:", error));
  };

  const deleteCard = (card_id) => {
  axios
    .delete(`${BASE_URL}/cards/${card_id}`)
    .then(() => {
      const updatedCards = selectedBoard.cards.filter(
        (card) => card.card_id !== card_id
      );

      const updatedBoards = boardsData.map((board) => {
        if (board.id === selectedBoard.id) {
          return { ...board, cards: updatedCards };
        }
        return board;
      });

      setBoardsData(updatedBoards);
      setSelectedBoard((prevBoard) => ({
        ...prevBoard,
        cards: updatedCards,
      }));
    })
    .catch((error) => {
      console.error("Error deleting card:", error);
    });
};

  const cardLike = (card_id) => {
    axios
      .patch(`${BASE_URL}/cards/${card_id}/like`)
      .then((response) => {
        console.log(response);
        let updatedCard = response.data.card;
        let board = boardsData.find((brd) => brd.id == updatedCard.board_id);
        let card = board.cards.find(
          (crd) => crd.card_id == updatedCard.card_id,
        );
        card.likes_count++;
        setBoardsData([...boardsData]);
      })
      .catch((error) => console.error("Error creating board:", error));
  };

  return (
    <div className="page__container">
      <div className="content__container">
        <h1>Inspiration Board</h1>
        <section className="boards__container">
          <section>
            <h2>Boards</h2>
            <BoardList
              className="boards__list"
              boards={boardsData}
              onBoardSelect={handleBoardSelect}
            />
          </section>
          <section>
            <h2>Selected Board:</h2>
            <p>
              {selectedBoard?.title} - {selectedBoard?.owner}
            </p>
          </section>
          <section className="new-board-form__container">
            <NewBoardForm createNewBoard={createNewBoard} />
          </section>
        </section>

        <section className="cards__container">
          {selectedBoard?.id && (
            <>
              <section>
                <h2>Cards for {selectedBoard.title}</h2>
                <CardList
                  cards={selectedBoard?.cards || []}
                  onLike={cardLike}
                  onDelete={deleteCard}
                />
              </section>
              <NewCardForm createNewCard={createNewCard} />
            </>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
