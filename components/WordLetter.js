import styles from '../styles/WordLetter.module.css';

function WordLetter(props) {
 return (
   <div className={styles.letterBox}>
     <p className={styles.letter}>{props.letter}</p>
   </div>
 );
}

export default WordLetter;