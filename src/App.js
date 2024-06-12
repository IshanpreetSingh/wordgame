import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [word, setWord] = useState('');
  const [rating, setRating] = useState('');
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [tries, setTries] = useState(0);
  const [correctWord, setCorrectWord] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/word')
      .then(response => response.json())
      .then(data => {
        setWord(data.word);
        setRating(data.rating);
      });
  }, []);

  const handleGuess = () => {
    if (guess.length !== 5) {
      setMessage('Guess must be exactly 5 letters.');
      return;
    }
  }


  return (
    <div className="App">
      <h1>Word Guessing Game</h1>
      <div className="game-info">
        <p>Rating: {rating}</p>
      </div>
      <div className="game-board">
        {Array.from({ length: 5 }).map((_, idx) => (
          <div className="letter-box" key={idx}>
            {guess[idx] || ''}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        maxLength={5}
      />
      <button onClick={handleGuess}>Submit Guess</button>
      {message && <p>{message}</p>}
      {correctWord && <p>The correct word was: {correctWord}</p>}
    </div>
  );
}

export default App;
