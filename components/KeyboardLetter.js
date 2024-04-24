import styles from '../styles/KeyboardLetter.module.css';

function KeyboardLetter(props) {

  

 return (
   <div>
     <button className={styles.letter} onClick={()=>handleClick()}>{props.letter}</button>
   </div>
 );
}

export default KeyboardLetter;