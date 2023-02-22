import './App.css';
import Cards from './Cards';
import { useState, useRef, useEffect } from 'react';
import { useGameContext } from './context';

const getTopScore = () => {
  let topScore;

  const hardScore = localStorage.getItem('hard_score');
  if (hardScore) topScore = hardScore;
  if (!hardScore) {
    const mediumScore = localStorage.getItem('medium_score');
    if (mediumScore) topScore = mediumScore;
    if (!mediumScore) {
      const easyScore = localStorage.getItem('easy_score');
      if (easyScore) {
        topScore = easyScore;
      } else topScore = 0;
    }
  }
  return topScore;
}

function App() {
  const { 
    shuffleCards, 
    displayButtons, 
    hideButtons,
    showCards,
    startTimer,
    isTimerRunning,
    formatTime,
    setMatchedCards,
    showButtons,
    hideCards,
    matchedCards,
    cards,
    stopTimer,
  } = useGameContext();

  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [winState, setWinState] = useState(false);
  const [topScore, setTopScore] = useState(getTopScore());
  const [difficulty, setDifficulty] = useState('');
	const intervalId = useRef(null);

  useEffect(() => {
		if (matchedCards.length === cards.length) {
			setWinState(true);
			clearInterval(intervalId.current);
			stopTimer()
      const storedTime = localStorage.getItem(difficulty+'_score');
      if (secondsElapsed < storedTime || !storedTime) {
        setTopScore(secondsElapsed);
        localStorage.setItem(difficulty+'_score', JSON.stringify(secondsElapsed))
      }
		}
	}, [matchedCards, cards.length])

  useEffect(() => {
		if (isTimerRunning) {
			intervalId.current = setInterval(() => {
				setSecondsElapsed((prevSeconds) => prevSeconds + 1);
			}, 1000)
		}
		return () => clearInterval(intervalId.current)
	}, [isTimerRunning]);


  const gameDifficulty = (difficulty) => {
    setDifficulty(difficulty)
    if (difficulty === 'easy') {
      shuffleCards(6);
    }
    if (difficulty === 'medium') {
      shuffleCards(10);
    }
    if (difficulty === 'hard') {
      shuffleCards(20);
    }
    
    hideButtons();
    showCards();
    startTimer();
    let topScore = 0;
    const storedTime = JSON.parse(localStorage.getItem(difficulty+'_score'));
    if (storedTime) {
      topScore = storedTime;
    }

    setTopScore(topScore)
  }

  const newGame = () => {
		setWinState(false);
		setMatchedCards([]);
		shuffleCards();
		showButtons();
		hideCards();
    setSecondsElapsed(0);
	}
  
  return (
    <main>
      <div className='time-container'>
        <div className='best-time'>best: {formatTime(topScore)}</div>
        <div className='timer'>time: {formatTime(secondsElapsed)}</div>
      </div>
      <div className='title'>memory game</div>
      <div className={`${displayButtons ? 'btn-container': 'hide'}`}>
        <button className='btn' onClick={() => gameDifficulty('easy')}>easy</button>
        <button className='btn' onClick={() => gameDifficulty('medium')}>medium</button>
        <button className='btn' onClick={() => gameDifficulty('hard')}>hard</button>
      </div>
      <Cards intervalId={intervalId}/>
      <div className={`${winState ? 'show' : 'hide'}`}>
				<p className='win-message'>you won!</p>
				<button className='btn' onClick={newGame}>play again?</button>
			</div>
    </main>
  );
}

export default App;
