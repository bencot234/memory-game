import { useEffect } from 'react'
import { useGameContext } from './context';

const Cards = () => {
	const {
		cards,
		displayCards,
		flippedCards,
		matchedCards,
		setFlippedCards,
		setMatchedCards,
	} = useGameContext();

	const handleClick = (id, color) => {
		if (flippedCards.length === 2) {
			return;
		}
		setFlippedCards([...flippedCards, { id, color}])
	}

	useEffect(() => {
		if (flippedCards.length === 2) {
			const [card1, card2] = flippedCards;
			if (card1.color === card2.color) {
				setMatchedCards([...matchedCards, card1.id, card2.id])
				setFlippedCards([]);
			} else {
				setTimeout(() => {
					setFlippedCards([]);
				}, 1000)
			}
		}
	}, [flippedCards])



  return (
	<div className={`${displayCards ? 'card-container' : 'hide'}`}>
		{cards.map(card => {
			const {id, color} = card;
			const isCardFlipped = flippedCards.some((flippedCard) => flippedCard.id === card.id);
			const isCardMatched = matchedCards.includes(card.id);

			return <div
					key={id}
					className={`card ${isCardFlipped || isCardMatched ? color : 'gray'}`}
					onClick={() => handleClick(id, color)}
				>
				</div>
		})}
	</div>
  )
}

export default Cards
