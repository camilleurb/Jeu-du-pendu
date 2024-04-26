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
  const [wordToGuess, setWordToGuess] = useState ('');

  useEffect(()=>{
    fetch('https://trouve-mot.fr/api/sizemax/7')
    .then(response=>response.json())
    .then(data => {
      setWordToGuess(data[0].name)
    })
  }, []);

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


  const checkLetter = (letter) => {
    setLettersTried(prevLetter => prevLetter + ' ' + letter);
    const updatedLetters = randomLetters.map(item => {
      if (item.letter === letter) {
        return { ...item, found: true };
      } else {
        return item;
      }
    });
    setRandomLetters(updatedLetters);
    setTentative(tentative - 1);
    
  };


  const newGame = () => {
    if (tentative === 0) {
      setTimeout(()=>{
        setIsModalOpen(true);
      },1000)
    }
  };

  newGame();

  const handleModalClose = () => {
    setIsModalOpen(false);
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
          visible={isModalOpen}
          onCancel={handleModalClose}
          footer={[
            <Button key="playAgain!" onClick={handleModalClose}>Rejouer</Button>
          ]}
        >
          Le mot était : {wordToDisplay.join('')}
        </Modal>
        {launched && <div className={styles.pendu}>Nombre de tentative : {tentative}</div>}
        <div className={styles.wordContainer}>
          {!launched && <button className={styles.launchBtn} onClick={startGame}>Let's Play</button>}
          {launched && letters}
        </div>
        {launched && <p>Lettres utilisées : {lettersTried}</p>}
        {launched && <div className={styles.keyboardContainer}>{keyboard}</div>}
      </main>
    </div>
  );
}

export default Home;
