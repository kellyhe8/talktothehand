import React, { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export default function SpeechDetection(props) {
  const [guess, setGuess] = useState('')
  const commands = [
    {
      command: [
      'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
      callback: ({command}) => props.onCheckGuess(command),
    },
    {
      command: "the letter *",
      callback: (letter) => props.onCheckGuess(letter)
    },
    {
      command: ["skip"],
      callback: () => {
        if (!props.won && !props.showAnswer) {
          props.onNext();
        } else {
          console.log("can't skip");
        }
      },
    },
    {
      command: ["next"],
      callback: () => {
        if (props.won || props.showAnswer) {
          props.onNext();
        } else {
          console.log("can't go next");
        }
      },
    },
    {
      command: ["answer", "view answer", "see answer", "show answer"],
      callback: () => {
        if (!props.won && !props.showAnswer) {
          props.onViewAnswer()
        } else {
          console.log("can't view answer");
        }
      }
    },
    {
      command: ["hint", "show hint", "hide hint"],
      callback: () => {
        props.toggleHint();
      }
    }

  ]

  const {
    transcript,
    listening,
    resetTranscript,
    isMicrophoneAvailable,
    browserSupportsSpeechRecognition,
    browserSupportsContinuousListening
  } = useSpeechRecognition({ commands });


  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  if (browserSupportsContinuousListening) {
    SpeechRecognition.startListening({ continuous: true })
    // console.log(listening);
    // console.log(isMicrophoneAvailable);
    // console.log("hi");
  } else {
    // Fallback behaviour
  }

  return (
    <div className='row'>
      <Button onClick={resetTranscript} variant="outlined" size="small">Reset Mic</Button>
      <p className='line-height-dense'>Microphone: <b>{listening ? 'ON' : 'OFF'}</b></p>
      <p className='line-height-dense'>{`"${transcript}"`}</p>
      {/* <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button> */}
      
      
    </div>
  );
};
