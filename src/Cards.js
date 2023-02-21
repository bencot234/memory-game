import { useState, useEffect } from 'react'
import data from './data'


const Cards = () => {
	const [cards, setCards] = useState(data);
	const [flippedCards, setFlippedCards] = useState([]);
	const [matchedCards, setMatchedCards] = useState([]);
	const [winState, setWinState] = useState(false);

	const shuffleCards = () => {
		const shuffledCards = [...cards]
		for (let i = shuffledCards.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
		}
		setCards(shuffledCards)
	}

	useEffect(() => {
		shuffleCards()
	}, []);

	const handleClick = (id, color) => {
		if (flippedCards.length === 2) {
			return;
		}
		setFlippedCards((prevFlippedCards) => [...prevFlippedCards, { id, color}])
	}

	useEffect(() => {
		if (matchedCards.length === cards.length) {
			setWinState(true);
		}
	}, [matchedCards])

	useEffect(() => {
		if (flippedCards.length === 2) {
			const [card1, card2] = flippedCards;
			if (card1.color === card2.color) {
				setMatchedCards((prevMatchedCards) => [...prevMatchedCards, card1.id, card2.id])
				setFlippedCards([]);
			} else {
				setTimeout(() => {
					setFlippedCards([]);
				}, 1000)
			}
		}
	}, [flippedCards])

	const newGame = () => {
		setWinState(false);
		setMatchedCards([]);
		shuffleCards();
	}

  return (
		<>
			<div className='card-container'>
				{cards.map(card => {
					const {id, color} = card;
					const isCardFlipped = flippedCards.some((flippedCard) => flippedCard.id === card.id);
					const isCardMatched = matchedCards.includes(card.id);
				
					return <button
							key={id}
							className={`card ${isCardFlipped || isCardMatched ? color : 'gray'}`}
							onClick={() => handleClick(id, color)}
						>
						</button>
				})}
			</div>
			<div className={`${winState ? 'show' : 'hide'}`}>
				<p>you won!</p>
				<button onClick={newGame}>play again?</button>
			</div>
		</>
  )
}

export default Cards
