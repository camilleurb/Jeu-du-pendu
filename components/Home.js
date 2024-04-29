import styles from '../styles/Home.module.css';
import KeyboardLetter from './KeyboardLetter';
import WordLetter from './WordLetter';
import { useState, useEffect } from 'react';
import { Modal, Button } from 'antd';

function Home() {
  const [tentative, setTentative] = useState(9);
  const [lettersTried, setLettersTried] = useState([]); 
  const [randomLetters, setRandomLetters] = useState([]); 
  const [launched, setLaunched] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false); 
  const [wordToGuess, setWordToGuess] = useState('');

  useEffect(() => {
    fetch('https://trouve-mot.fr/api/sizemax/7')
      .then(response => response.json())
      .then(data => {
        setWordToGuess(data[0].name)
      })
  }, []);

  useEffect(() => {
    if (isGameWon) {
      setIsModalOpen(false);
    }
  }, [isGameWon]);

  const keyboardLetters = [
    'a','z','e','r','t','y','u','i','o','p','q','s','d','f','g','h','j','k','l','m','w','x','c','v','b','n'
  ];
  
  const randomWordLetter = () => {
    const wordLetters = wordToGuess.split('').map(letter => ({ letter, found: false }));
    return wordLetters;
  };
  
  const startGame = () => {
    setRandomLetters(randomWordLetter());
    setLaunched(true);
  };

  const gameWinned = () => {
    const allLettersFound = randomLetters.every(item => item.found === true);
    if (allLettersFound) {
      setIsGameWon(true);
    }
  };

  useEffect(() => {
    gameWinned();
  }, [randomLetters]);

  const checkLetter = (letter) => {
    const isLetterInWord = randomLetters.some(item => item.letter === letter);
    if (!isLetterInWord) {
      setTentative(prevTentative => prevTentative - 1);
      setLettersTried(prevLetter => prevLetter + ' ' + letter);
    };
    
    const updatedLetters = randomLetters.map(item => {
      if (item.letter === letter) {
        return { ...item, found: true };
      } else {
        return item;
      }
    });
    setRandomLetters(updatedLetters);
  };

  const newGame = () => {
    if (tentative === 0) {
      setTimeout(() => {
        setIsModalOpen(true);
      }, 1000)
    } 
  };

  newGame();

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsGameWon(false); 
    setLaunched(false);
    setLettersTried([]);
    setTentative(9);
  };

  const disabled = tentative === 0;
  const keyboard = keyboardLetters.map((letter, i) => (
    <KeyboardLetter key={i} letter={letter} checkLetter={checkLetter} disabled={disabled}/>
  ));

  const letters = randomLetters.map((item, index) => {
    return <WordLetter key={index} letter={item.letter} found={item.found} />;
  });

  const wordToDisplay = [];
  randomLetters.map((e) => {
    wordToDisplay.push(e.letter)
  });


  return (
    <div className={styles.body}>
      <header className={styles.header}>JEU DU PENDU</header>
      <main className={styles.main}>
        <Modal 
          title="C'est perdu :("
          className={styles.modal}
          open={isModalOpen}
          onCancel={handleModalClose}
          footer={[
            <Button key="playAgain!" onClick={handleModalClose}>Rejouer</Button>
          ]}
        >
          Le mot était : {wordToDisplay.join('')}
        </Modal>
        <Modal 
          title="C'est gagné ! :)"
          className={styles.modal}
          open={isGameWon}
          onCancel={handleModalClose}
          footer={[
            <Button key="playAgain!" onClick={handleModalClose}>Rejouer</Button>
          ]}
        >
          Bien joué(e) champion(ne)
        </Modal>
        {launched && <div className={styles.pendu}>Tentative(s) restante(s) : {tentative}</div>}
        <div className={styles.wordContainer}>
          {!launched && <button className={styles.launchBtn} onClick={startGame}>Jouons!</button>}
          {launched && letters}
        </div>
        {launched && <p className={styles.triedLetters}>Lettres utilisées : {lettersTried}</p>}
        {launched && <div className={styles.keyboardContainer}>{keyboard}</div>}
      </main>
    </div>
  );
}

export default Home;
