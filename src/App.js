import './App.css';
import Cards from './Cards';
import data from './data';
import { useState } from 'react'

function App() {
  const [cards, setCards] = useState(data);
  const [showButtons, setShowButtons] = useState(true);
  const [showCards, setShowCards] = useState(false);

  const gameDifficulty = (difficulty) => {
    shuffleCards(difficulty);
    setShowButtons(false)
    setShowCards(true)
  }

  const shuffleCards = (num) => {
		const shuffledCards = [...data].slice(0, num);
		for (let i = shuffledCards.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
		}
		setCards(shuffledCards)
	}
  
  return (
    <main>
      <div className='title'>memory game</div>
      <div className={`${showButtons ? 'btn-container': 'hide'}`}>
        <button className='btn' onClick={() => gameDifficulty(6)}>easy</button>
        <button className='btn' onClick={() => gameDifficulty(10)}>medium</button>
        <button className='btn' onClick={() => gameDifficulty(20)}>hard</button>
      </div>
      <Cards cards={cards} shuffleCards={shuffleCards} setShowButtons={setShowButtons} setShowCards={setShowCards} showCards={showCards}/>
    </main>
  );
}

export default App;
