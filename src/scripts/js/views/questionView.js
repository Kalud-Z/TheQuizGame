import { elements , renderLoader} from './base'



export const displayQuestion = (questionObj,index) => {
    elements.questionContainer.innerHTML = '';
    clearRadioButtons();

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

    // insert everything inside the question container
    elements.questionContainer.insertAdjacentHTML('afterbegin', markup); 
}


export const getChosenAnswer = () => {
    let returnVal;
    const allOptions = document.querySelectorAll(`span[class^="option"]`); // i had to rewrite the query. whyy ????
    
    console.log('this is all the optins')
    console.log(allOptions);

    allOptions.forEach( el => {if(el.parentElement.previousElementSibling.checked) returnVal = el.innerText;} )  
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

export const loadWaitingPage = () => {
    elements.startPageContainer.classList.remove('show');
    renderLoader(elements.container);
}



//  HELPING FUNCTIONS ###################################################################################

const clearRadioButtons = () => {
    const optionsList = elements.allPossibleAnswers;
    // for(var i = 0 ; i < optionsList.length ; i++) {  optionsList[i].checked = false;}
    optionsList.forEach(el => el.checked = false);
}


const shuffleArray = array => {
    var i = array.length,
        j = 0,
        temp;

    while (i--) {
        j = Math.floor(Math.random() * (i+1));

        // swap randomly chosen element with current element
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    return array;
}


const generateOptionsMarkup = allOptions => {

    const newAllOptions = shuffleArray(allOptions);

    let finalStr = '';
    newAllOptions.forEach((el,index) => {
        finalStr += `
        <div class="form__radio-group">
            <input type="radio" name="possible-answer" value="option${index+1}" class="form__radio-input" id="option-${index+1}">
            <label for="option-${index+1}" class="form__radio-label">
                <span class="form__radio-button"></span>
                <span class="option-${index+1}-text">${el}</span>
            </label>
        </div>
        `


/* 

         `<input type="radio" name="possible-answer" value="option${index+1}" class="option-${index+1}-radio">
          <span class="option-${index+1}-text">${el}</span> <br>`; */
    })

    return finalStr;
}





















