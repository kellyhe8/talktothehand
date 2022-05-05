// import LetterInput from "./LetterInput";
import React, { useState } from "react";
import Button from '@mui/material/Button';

import LetterInput from "./LetterInput";
import HintFeature from './HintFeature';
import MediaPipe from "./MediaPipe";
import { LearnImages } from "./LettersImages";
import SpeechDetection from "./SpeechDetectionLearn";




export default function CenterLevel1ReadCol(props) {

    const alphabet = props.globalName ? props.globalName.toUpperCase().replace(/\s/g, "").split('') : "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answer, setAnswer] = useState(alphabet[currentIndex]);
    const [guess, setGuess] = useState("");
    const [guesses, setGuesses] = useState([]);
    const [won, setWon] = useState(false);
    const [score, setScore] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);

    const nextLetter = () => {
        const newIndex = (currentIndex + 1) % alphabet.length
        setCurrentIndex(newIndex)
        setAnswer(alphabet[newIndex]);
    }

    const setShowAnswerTrue = () => {
        // if showing answer, -1 point and untoggle the hint if it's on
        setScore(score - 1);
        if (props.toggled) {
          props.toggleHint();
        }
        setShowAnswer(true);
      }
    
      const checkGuess = (guess) => {
        if (!showAnswer) {
          // if they didn't just look at the answer, then check
          guess = guess.toUpperCase()
          setScore(answer.toUpperCase() === guess ? score + 1 : score);
          setWon(answer.toUpperCase() === guess || won ? true : false);
          setGuess(guess);
          setGuesses([...guesses, guess])
          return answer.toUpperCase() === guess;
        } else {
          // otherwise don't do anything
          return false;
        }
      }

      
      const reset = () => {
        if (showAnswer) {
          
        }
        setGuess("");
        setGuesses([]);
        setWon(false);
        setShowAnswer(false);
        nextLetter();
        if (props.toggled) {
          props.toggleHint();
        }
      }

    return (
        <div className="column">
        <div className="row center-col">
          <p className="line-height-dense">Say the letter aloud or select the answer below.</p>
  
          <div className="pink-background row flex-row-center">
          <h3 className="line-height-dense feedback">
            {showAnswer ? "You cheated! -1 point!" 
              : guess ? `You guessed "${guess}". ${won ? "Good job! +1 point!" : "Wrong - try again."}` 
                : "Select an answer."} 
            </h3>
  
            <div className="video-box">
              <img src={LearnImages[answer]} 
                alt="asl-letter-recognition" 
                width="500" 
                className="">
              </img>
              <p className="line-height-dense"> Score: {score} </p>
            </div>
            
            <LetterInput 
              answer={answer} 
              guesses={guesses}
              won={won}
              nextLetter={nextLetter.bind(this)} 
              reset={reset.bind(this)} 
              checkGuess={checkGuess.bind(this)}
              showAnswer={showAnswer} 
              setShowAnswerTrue={setShowAnswerTrue}
            />
  
          </div>
        </div>
        <div className=''>
          <HintFeature toggled={props.toggled} toggleHint={props.toggleHint} answer={answer}/>
          <br/>
          <SpeechDetection won={won} showAnswer={showAnswer} toggleHint={props.toggleHint} onCheckGuess={checkGuess} onNext={reset} onViewAnswer={setShowAnswerTrue}/>
          
        </div>
        
      </div>
    );
}