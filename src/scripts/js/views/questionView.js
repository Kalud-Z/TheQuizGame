import { elements } from './base'


export const displayQuestion = (questionObj,index) => {
    clearRadioButtons();
    elements.questionNumberDisplay.innerText  = 'Question Number ' + (index+1); 
    // elements.theQuestion.innerText            = questionObj.question;
    console.log('this is the quesion from the API')
    console.log(questionObj.question);
    
    elements.theQuestion.textContent            = questionObj.question;
    elements.option_1_text.innerText          = questionObj.incorrect_answers[0];
    elements.option_2_text.innerText          = questionObj.correct_answer;
    elements.option_3_text.innerText          = questionObj.incorrect_answers[1];
}


const clearRadioButtons = () => {
    const optionsList = elements.allPossibleAnswers;
    // for(var i = 0 ; i < optionsList.length ; i++) {  optionsList[i].checked = false;}
    optionsList.forEach(el => el.checked = false);
}


export const getChosenAnswer = () => {
    let returnVal;
    Array.from(elements.allOptions).forEach(el => { if(el.previousSibling.checked) returnVal = el.innerText; })  
    return returnVal;
}


export const showScoreButton = () => {
    elements.nextButton.classList.remove('show');
    elements.scoreButton.classList.add('show');
}


export const hideScoreButton = () => {
    elements.nextButton.classList.add('show');
    elements.scoreButton.classList.remove('show');
}

