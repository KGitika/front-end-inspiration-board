import Card from "./Card";

const CardList = ({ cards, onLike }) => {
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