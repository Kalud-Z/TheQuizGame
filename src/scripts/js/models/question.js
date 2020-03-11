//TODO : refactor. the method of this module to take the stuff from the main controller as arguments ! 

import { elements } from '../views/base'

import { state ,  ctrlShowScore , ctrlGotoNextQuestion } from '../index'  



let counter = 0;
let interval = null;

const timerMain = () => {
    counter++;
    
    console.log(counter);

    if(counter === 7) {
        restartTimer();
        if(state.nextQuestionIndex === state.questionsObj.numOfQuestions-1) { 
            ctrlShowScore();
            resetTimer();
        }
        else { ctrlGotoNextQuestion(); }
    }
}


export const  startTimer = () => {  // you call this one to start the timer.
        interval = window.setInterval(timerMain, 1000);
        console.log('startTimer is called')
}

export const  restartTimer = () => {
    resetTimer();
    startTimer();
}


export const resetTimer = () => {  //you call this one to only reset the timer
    window.clearInterval(interval);
    counter = 0;
}

