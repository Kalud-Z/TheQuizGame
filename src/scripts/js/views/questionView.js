import { elements , DOMString ,  renderLoader} from './base'


// we create all questions. and return the biggest height.
export const getQuestionContainerHeight = (allQuestions) => {
    const numOfQuestions = allQuestions.length;
    var allHeights = [];

    // *we generate all the questions. keep them hidden though.
    for(var i = 0 ; i < numOfQuestions ; i++){
        displayQuestion(allQuestions[i],i);
        // we add the temp class. so we can read its heights
        elements.questionContainer.classList.add('temp_style_for_question_container');
        var height = elements.questionContainer.offsetHeight; 

        // we add the height to the array.
        allHeights.push(height);
    }

    const biggestHeight = Math.max(...allHeights) 
    elements.questionContainer.classList.remove('temp_style_for_question_container');

    return biggestHeight;
}

export const generateAndDisplayTrackBar =  numOfQuestions => {
    //first we delete the trackbar if it exists.

    const trackBar = document.querySelector('.'+DOMString.trackBar); 
    if(trackBar) { 
        trackBar.parentElement.removeChild(trackBar);
    }

    
    let trackBarChildren = '';
    for(let i = 0 ; i < numOfQuestions ; i++) {  trackBarChildren += `<div class="questions-track-bar__child" id="trackBarChild-${i}">&nbsp;</div>` }

    const markup = `<div class="questions-track-bar"> ${trackBarChildren} </div>`
    
    elements.questionContainer.insertAdjacentHTML('afterbegin', markup);

    // adjust length of the chidren.
    // when it is a dynamically generated element. you have to write a new query each time you wanna use it. 
    document.querySelectorAll('.'+DOMString.trackBarChild).forEach(el => el.style.flex = '1');    
}

export const isAnswerSelected = () => getChosenAnswer()


export const displayQuestion = (questionObj,index) => {
    removeAllChildrenExpectFirstTwo(elements.questionContainer);  //because the first two elements are buttons.
    clearRadioButtons();  //this one is not necessary.

    const allOptions =  [...questionObj.incorrect_answers , questionObj.correct_answer];
    
    //we pass the chosen answer . so if we open an already answered question. we would know which option to check.
    const  optionsMarkup = generateOptionsMarkup(allOptions, questionObj.chosen_answer);

    const markup = 
        `<button class="prev-question-button"> <svg> <use href="./img/symbol-defs.svg#icon-circle-left"></use> </svg> </button>
        <button class="exit-button"> <svg> <use href="./img/symbol-defs.svg#icon-cancel-circle"></use> </svg> </button>  
        <h1 class="question-container__title" > Question Number ${index+1} </h1> 
        <form>
            <div class="questionAndOptionsContainer" >
            <p class="question"> ${questionObj.question} </p> ${optionsMarkup} 
            </div>
            
            <input type="button" value="Next >" class="btn next-question-button show">
            <input type="button" value="See results >" class="btn score-button">
        </form>
        `;

    // insert everything after the track-bar
    document.querySelector(`.${DOMString.trackBar}`).insertAdjacentHTML('afterend', markup); 
    
    // we slide the question and the options to their proper position.
    setTimeout(() => {
        document.querySelector('.'+DOMString.theQuestion).style.transform = "translateX(0)";
        
        const allRadioGroups = document.querySelectorAll('.form__radio-group');
        Array.from(allRadioGroups).forEach(el => {
            el.style.transform = "translateX(0)";
        })

    }, 50);

    // update track bar : we make the current bar child highlighted.
    updateTrackBar(index);        
}

export const adjustQuestionContainerHeight = height => {
    elements.questionContainer.style.height =  `${height}px`;
}

export const showQuestionContainer = () => {
    elements.questionContainer.classList.add('show-QuestionContainer-flex');
}

export const hideQuestionContainer = () => {
    elements.questionContainer.classList.remove('show-QuestionContainer-flex');
}

// timer track bar functions
export const resetTimerUI = () => {
    // we remove it from the DOM

    document.querySelector('.'+DOMString.questionTimer).parentElement.removeChild(document.querySelector('.'+DOMString.questionTimer));

    const markup = `<div class="foreground"></div>`;

    // we reinsert the timer to the DOM.        
    elements.questionTimerContainer.insertAdjacentHTML('beforeend', markup);

}

export const showTimerUI = () => {
    elements.questionTimerContainer.classList.add('turn-visible')
}

export const activateTimerUI = () => {
    document.querySelector('.'+DOMString.questionTimer).classList.add('start-timer');
}

export const hideTimerUI = () => {
    // console.log('remove timer is called')
    elements.questionTimerContainer.classList.remove('turn-visible');
}



















export const getChosenAnswer = () => {
    let returnVal;
    const allOptions = document.querySelectorAll(`span[class^="option"]`); // i had to rewrite the query. whyy ????

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


export const showPrevQuestionButton = () => {
    // document.querySelector('.prev-question-button').classList.add('turn-visible');  
    document.querySelector('.'+DOMString.prevQuestionButton).classList.add('show');   // is this how we select a dynamically generated element ???
}

export const hidePrevQuestionButton = () => {
    // document.querySelector('.prev-question-button').classList.add('turn-visible');  
    document.querySelector('.'+DOMString.prevQuestionButton).classList.remove('show');   // is this how we select a dynamically generated element ???
}



export const showExitButton = () => {
    document.querySelector('.'+DOMString.exitButton).classList.add('show');   // is this how we select a dynamically generated element ???
}


export const hideExitButton = () => {
    document.querySelector('.'+DOMString.exitButton).classList.remove('show');   // is this how we select a dynamically generated element ???
}



export const loadWaitingPage = () => {
    elements.startPageContainer.classList.remove('show-startPage');
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


const generateOptionsMarkup = (allOptions , chosenAnswerStr) => {
    const newAllOptions = shuffleArray(allOptions);

    let finalStr = '';
    newAllOptions.forEach((el,index) => {
        finalStr += `
        <div class="form__radio-group">
            <input type="radio" name="possible-answer" value="option${index+1}" class="form__radio-input" id="option-${index+1}" ${ el === chosenAnswerStr ? 'checked' : '' }>
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


// remove all child nodes except the first. Parameter : the target parent node.
const removeAllChildrenExpectFirstTwo = parentElement => {
    while(parentElement.children.length > 2) {
        parentElement.removeChild(parentElement.children[2]);
    }
}

// update track bar.
const updateTrackBar = index => {
    document.querySelector(`#trackBarChild-${index}`).classList.add('fill-bar');
}






















