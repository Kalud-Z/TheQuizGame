import { elements } from './base'

const generateOptionsMarkup = allOptions => {
    let finalStr = '';
    allOptions.forEach((el,index) => {
        finalStr += `<input type="radio" name="possible-answer" value="option${index+1}" class="option-${index+1}-radio">
        <span class="option-${index+1}-text">${el}</span> <br>`;
    })

    return finalStr;
}


export const displayQuestion = (questionObj,index) => {
    elements.questionContainer.innerHTML = '';
    clearRadioButtons();

    // insert everything inside the question container
    
    const allOptions =  [...questionObj.incorrect_answers , questionObj.correct_answer];
    const optionsMarkup =  generateOptionsMarkup(allOptions);

    const markup = 
        `<h1 class="question-container__title" > Question Number ${index+1} </h1> 
        <form>
            <div class="questionAndOptionsContainer" >
            <p class="question"> ${questionObj.question} </p> ${optionsMarkup} 
            </div>
            
            <input type="button" value="Next >" class="btn next-question-button show">
            <input type="button" value="See results >" class="btn score-button">
        </form>
        `;

    elements.questionContainer.insertAdjacentHTML('afterbegin', markup); 
}


export const getChosenAnswer = () => {
    let returnVal;
    Array.from(elements.allOptions).forEach(el => { if(el.previousSibling.checked) returnVal = el.innerText; })  
    return returnVal;
}


export const showScoreButton = () => {
    // it doesnt work this waaay . whyyyy???????????????????????????????????????
    // elements.nextButton.classList.remove('show');  
    // elements.scoreButton.classList.add('show');

    document.querySelector('.next-question-button').classList.remove('show');   
    document.querySelector('.score-button').classList.add('show');   
}


export const hideScoreButton = () => {
    // it doesnt work this waaay . whyyyy???????????????????????????????????????
    // elements.nextButton.classList.add('show');
    // elements.scoreButton.classList.remove('show');

    document.querySelector('.next-question-button').classList.add('show');   
    document.querySelector('.score-button').classList.remove('show');   

}




//  HELPING FUNCTIONS ###################################################################################

const clearRadioButtons = () => {
    const optionsList = elements.allPossibleAnswers;
    // for(var i = 0 ; i < optionsList.length ; i++) {  optionsList[i].checked = false;}
    optionsList.forEach(el => el.checked = false);
}
