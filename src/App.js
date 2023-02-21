import './App.css';
import Cards from './Cards';
import data from './data';
import { useState } from 'react'

function App() {
  const [cards, setCards] = useState(data);
  const [showButtons, setShowButtons] = useState(true);

  const easyGame = () => {
    shuffleCards(6);
    setShowButtons(false)
  }
  const mediumGame = () => {
    shuffleCards(10)
    setShowButtons(false)
  }
  const hardGame = () => {
    shuffleCards(20);
    setShowButtons(false)
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
        <button className='btn' onClick={easyGame}>easy</button>
        <button className='btn' onClick={mediumGame}>medium</button>
        <button className='btn' onClick={hardGame}>hard</button>
      </div>
      <Cards cards={cards} shuffleCards={shuffleCards} setShowButtons={setShowButtons}/>
    </main>
  );
}

export default App;
