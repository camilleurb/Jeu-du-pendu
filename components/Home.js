import styles from '../styles/Home.module.css';
import KeyboardLetter from './KeyboardLetter';
import WordLetter from './WordLetter';
import { useState } from 'react';

function Home() {
  const [tentative, setTentative] = useState(0);
  const [lettersTried, setLettersTried] = useState([]); 

  const [randomLetters, setRandomLetters] = useState([]); 
  const [launched, setLaunched] = useState(false);


  const keyboardLetters = [
    'a','z','e','r','t','y','u','i','o','p','q','s','d','f','g','h','j','k','l','m','w','x','c','v','b','n'
  ];
  const wordsToGuess = ['Pied','react','Train','Chien','mur','console','metal','rock'];
  
  const randomWordLetter = () => {
    const randomIndex = Math.floor(Math.random() * wordsToGuess.length);
    const word = wordsToGuess[randomIndex];
    const wordLetters = word.split('').map(letter => ({ letter, found: false }));
    return wordLetters;
  };
  
  const startGame = () => {
    const lettersToGuess = randomWordLetter();
    setRandomLetters(lettersToGuess);
    setLaunched(true);
  };

  const keyboard = keyboardLetters.map((letter, i) => (
    <KeyboardLetter key={i} letter={letter} />
  ));

  
  return (
    <div className={styles.body}>
      <header className={styles.header}>JEU DU PENDU</header>
      <main className={styles.main}>
        {launched && <div className={styles.pendu}>Nombre de tentative : {tentative}</div>}
        <div className={styles.wordContainer}>
          {!launched && <button className={styles.launchBtn} onClick={startGame}>Let's Play</button>}
          {launched && randomLetters.map((item, index) => (
            <WordLetter key={index} letter={item.found ? item.letter : '_'} />
          ))}
        </div>
        {launched && <p>Lettres utilisées : {lettersTried.join(', ')}</p>}
        {launched && <div className={styles.keyboardContainer}>{keyboard}</div>}
      </main>
    </div>
  );
}

export default Home;
