import Card from "./Card";

const CardList = ({ cards, onLike }) => {    
    if (!cards) return (<div className="card-list"></div>);
    return (
        <div className="card-list">
        {cards.map((card) => (
            <Card
            key={card.card_id}
            card={card}
            onLike={onLike}
            />
        ))}
        </div>
    );
}

export default CardList;