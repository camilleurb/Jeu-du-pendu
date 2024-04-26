import styles from '../styles/KeyboardLetter.module.css';

function KeyboardLetter(props) {

  const handleClick = () => { 
    if (!props.disabled) {
      props.checkLetter(props.letter);
    }
  };

 return (
   <div>
     <button className={styles.letter} onClick={()=>handleClick()}>{props.letter}</button>
   </div>
 );
}

export default KeyboardLetter;