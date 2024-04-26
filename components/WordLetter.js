import styles from '../styles/WordLetter.module.css';

function WordLetter(props) {
  let letterStyle = {};
    if (!props.found) {
      letterStyle = {'opacity': '0'};
    }
 return (
   <div className={styles.letterBox}>
     <p className={styles.letter} style={letterStyle}>{props.letter}</p>
   </div>
 );
}

export default WordLetter;