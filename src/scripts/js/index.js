import { elements , DOMString  } from './views/base'
import Start                from './models/start'
import * as score           from './models/score'
import * as startView       from './views/startView'
import * as questionView    from './views/questionView'
import * as question        from './models/question'
import * as scoreView       from './views/scoreView'
import * as answersView       from './views/answersView'
import * as popupView       from './views/popupView'
import * as mediaQueries       from './views/media-queries'


export const state = { nextQuestionIndex: 0 };

window.q = state;


const ctrlToggleSwitch = () => {
    startView.toggleTimerSwitch();
}


const ctrlStartQuiz = async () => { 
    // we get the number of questions from the user ,  the selected Category , and the difficulty
    const numOfQuestions        = startView.getNumOfQuestionsInput();
    const selectedCategoryID    = startView.getSelectedCategoryID();
    const difficulty            = startView.getDifficulty();    
    
    // we create a new object.
    state.questionsObj = new Start(numOfQuestions, selectedCategoryID , difficulty);

    // we show the user the waiting page. till the Data comes from the API.
    questionView.loadWaitingPage();

    // we fetch the questions from the API
    try {
        await state.questionsObj.getResults();  //we wait till data comes back from the server.
    } 
    catch(err) { console.log('Error : Questions Not Found !') }
    
    if(state.questionsObj.questions.length === 0) { alert('ERROR : SERVER IS DOWN !') }

 
    // we generate the track-bar and display it
    questionView.generateAndDisplayTrackBar(numOfQuestions);

    // we determine the biggest height. and set it to all the next generated questions.
    // state.height = questionView.getQuestionContainerHeight(state.questionsObj.questions);
    let height = questionView.getQuestionContainerHeight(state.questionsObj.questions);
    questionView.adjustQuestionContainerHeight(height);


    // we start the quiz
    startView.startQuiz();
    
    // we generate the track-bar and display it
    questionView.generateAndDisplayTrackBar(numOfQuestions);

    // display the next question (in this case the first one.) . we pass the whole question object.
    questionView.displayQuestion(state.questionsObj.questions[state.nextQuestionIndex], state.nextQuestionIndex);

    // display exit button and Activate timer
    questionView.showExitButton();

    // we determine whether we play with timer or without.
    if(startView.isTimerOn()) {
        // we show and we activate the timer
        questionView.showTimerUI()
        questionView.activateTimerUI();
        question.startTimer();
    }

    // we reset the selected category
    startView.resetCategories();
};

export const ctrlGotoNextQuestion = () => {
    state.nextQuestionIndex++;

    // get the chosen answer from the user input & added it to the current question object.
    var chosenAnswer = questionView.getChosenAnswer();
    if(typeof chosenAnswer === 'undefined') { chosenAnswer = 'No Answer'; console.log('NEXTQUESZION :no asnwer is assigned.') }

    state.questionsObj.questions[state.nextQuestionIndex-1].chosen_answer = chosenAnswer;
    
    // display the next question. we pass the whole question object.
    questionView.displayQuestion(state.questionsObj.questions[state.nextQuestionIndex], state.nextQuestionIndex);
    
    // we adjust the height

    // we expose the prev-question AND exit buttons ALSO : activate question timer. in this case a track bar
    if(!startView.isTimerOn()) {
        questionView.showPrevQuestionButton(); 
    } 
    else {
        questionView.resetTimerUI();
        setTimeout(() => { questionView.activateTimerUI() }, 100);
        
        question.restartTimer();
    }
    

    questionView.showExitButton();
    
    // if it is the last question.
    if(state.nextQuestionIndex === state.questionsObj.numOfQuestions - 1) {
        questionView.showScoreButton();
        questionView.hideExitButton();
    }
        
}

const ctrlGotoPrevQuestion = () => {
    // get the chosen answer from the user input & added it to the current question object.
    const chosenAnswer = questionView.getChosenAnswer();
    state.questionsObj.questions[state.nextQuestionIndex].chosen_answer = chosenAnswer;

    // we set the index to the previous question index. 
    state.nextQuestionIndex = state.nextQuestionIndex - 1   ;

    // display the prev question. we pass the whole question object.
    questionView.displayQuestion(state.questionsObj.questions[state.nextQuestionIndex], state.nextQuestionIndex);

    // we expose the prev-question button
    questionView.showPrevQuestionButton();
    questionView.showExitButton();


    // we hide the prev question button if we are  in the first question
    if(state.nextQuestionIndex === 0) questionView.hidePrevQuestionButton();
}

const ctrlExit = () => {
    // show pop up. making u wanna exit.
    popupView.showExitPopup();
 
    // Exit popup listerns
    elements.exitPopup.addEventListener('click', e => {
        if(e.target.matches('.no')) {
            // we close the popup
            popupView.hideExitPopup();
        }
        else if(e.target.matches('.yes')) {
            // we close the popup
            popupView.hideExitPopup();

            // we start all over !
            ctrlPlayAgain();

            // we reset the timer if it is On.
            if(startView.isTimerOn()) { question.resetTimer(); }

            // we hide the buttons
            questionView.hidePrevQuestionButton();
            questionView.hideExitButton(); 
        }
    });

}

export const ctrlShowScore = () => {
        // get the chosen answer from the user input & added it to the current question object.
        var chosenAnswer = questionView.getChosenAnswer();
        if(!chosenAnswer) { chosenAnswer = 'No Answer'; }
        state.questionsObj.questions[state.nextQuestionIndex].chosen_answer = chosenAnswer;

        // we hide the prevQuestionButton , the timer
        questionView.hidePrevQuestionButton();
        questionView.hideTimerUI();

        // we reset the timer
        question.resetTimer();

        // load score page
        scoreView.loadScorePage();
        
        // get final score from score model.
        const finalScore = score.getFinalScore(state.questionsObj.questions);
        const maxScore =   state.questionsObj.numOfQuestions * score.pointsPerCorrentAnswer;
        
        // display Final score
        setTimeout(() => {
            scoreView.displayFinalScore(finalScore,maxScore);
        }, 50);

}

const ctrlPlayAgain = () => {
    state.questionsObj = {};
    state.nextQuestionIndex = 0;

    // UI RESET method.
    startView.loadStartPage();
    questionView.hideScoreButton();
    answersView.resetAnswersPage();
    questionView.resetTimerUI();

    // reset score page animation
    scoreView.scorePageScaleDown();

    // we reset the container height
    questionView.resetQuestionContainerHeight();
}

const ctrlDisplayAnswers = () => {
    answersView.loadAnswersPage();

    // we generate the answers only the first time we load the asnwers page.
    if(elements.tableBody.childElementCount === 0) {
        answersView.generateAnswers(state.questionsObj.questions);
    }

    // when we scoll we change the goback button
    changeGobackBtnOnScroll();
}

const ctrlGoBackToScore = () => {
    answersView.goBack();
}

// Event Listeners ###################################################################################################################################################
// ####################################################################################################################################################################

// click buttons Event Listeners §§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§


// listens to timer toggle switch
elements.toggleTimerSwitch.addEventListener('click', ctrlToggleSwitch);

// choose caterogy listener
elements.categoriesContainer.addEventListener('click', e => {
    if(e.target.matches('.'+DOMString.category))
    startView.selectCategory(e.target);
})

// clicking start button after choosing how many questions to play.
elements.startButton.addEventListener('click', ctrlStartQuiz);

// attached to nextQuestionButton OR prevQuestionButton OR showScoreButton OR exit button delegate event to the parent.
elements.questionContainer.addEventListener('click', e => {
    if(e.target.matches('.next-question-button')) { ctrlGotoNextQuestion(); }
    else if(e.target.matches('.score-button')) { ctrlShowScore(); }
    else if(e.target.matches(`.${DOMString.prevQuestionButton} , .${DOMString.prevQuestionButton} *`)) { ctrlGotoPrevQuestion(); }
    else if(e.target.matches(`.${DOMString.exitButton} , .${DOMString.exitButton} *`)) { ctrlExit(); }
})

// play again button
elements.playAgainButton.addEventListener('click', ctrlPlayAgain);

// display answers buttons
elements.answersButton.addEventListener('click', ctrlDisplayAnswers);

// go back button the the answers page.
elements.goBackToScoreButton.addEventListener('click' , ctrlGoBackToScore)


// Keypress Event Listeners §§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§ 

// Enter  (* start quiz . | *go next question)
window.addEventListener('keypress', event => {
    if(event.keyCode === 13) {
        // if we are in the start page ###############
        if(elements.startPageContainer.matches('.show-startPage')) { ctrlStartQuiz(); }

        // if we are in the question page ############
        else if(elements.questionContainer.matches('.show-QuestionContainer-flex')) {
            // if score button is shown.
            if(document.querySelector('.score-button').matches('.show')) { ctrlShowScore();  } //sometimes I just CANT use the elements object from base.js !!!!!!!!

            // otherwise the showScore button is shown.
            else { ctrlGotoNextQuestion();}
        }
    }    
});

// up and down arrows  (*choose an answers)
window.addEventListener('keydown', event => {
    // if up OR down is pressed.
    if([38, 40].includes(event.keyCode)) {

        // if we are in the start page. then we do our work
        if(elements.startPageContainer.matches('.show-startPage')) {
            const selectElement = elements.numOfQuestionsToPlay;
            const allOptionsLength = selectElement.childElementCount;

            if(event.keyCode === 38) { //if UP is pressed. then index decreases
                if(selectElement.selectedIndex > 0)  selectElement.selectedIndex -= 1;
            }

            if(event.keyCode === 40) { //if DOWN is pressed. then index increases
                if(selectElement.selectedIndex < allOptionsLength - 1)  selectElement.selectedIndex += 1;
            }
        }

        // if the we are in the question view. then we do our work
        if(elements.questionContainer.matches('.show-QuestionContainer-flex')) {

            const allOptions = document.querySelectorAll(`span[class^="option"]`);

            // find which one is checked
            let checkedOptionIndex = -1
            allOptions.forEach((el,i) => { if(el.parentElement.previousElementSibling.checked === true) checkedOptionIndex = i; });
              
            // if the no one is checked. we ALWAYS check the first option
            if(checkedOptionIndex === -1) allOptions[0].parentElement.previousElementSibling.checked = true;

            if(event.keyCode === 38) { //if UP is pressed.
                // if one of them is checked we check the one above it.
                if(checkedOptionIndex > 0) allOptions[checkedOptionIndex -1].parentElement.previousElementSibling.checked = true;
            }

            if(event.keyCode === 40) { //if DOWN is pressed.
                // if one of them is checked we check the one below it.
                if(checkedOptionIndex < allOptions.length) allOptions[checkedOptionIndex + 1].parentElement.previousElementSibling.checked = true;
            }

        }

    }
})

// backspace key   (*go to prev question)
window.addEventListener('keydown', event => {
    if(event.keyCode === 8) {  //if backspace key is pressed
        // if we are in the question page . AND not in the first question
        if(elements.questionContainer.matches('.show-QuestionContainer-flex') && state.nextQuestionIndex > 0) {  ctrlGotoPrevQuestion(); }
    }
});


// load and Scroll event Listeners §§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§ 


// title animation !
window.addEventListener('load', () => {
    const allLetters = elements.AppTitle__letter;
    allLetters.forEach(el => el.classList.add('display-Letter'))   
    // setTimeout(() => { elements.AppTitle.classList.add('title-change-color'); }, 1000);  //doesnt work in firefox !
})
 

// Handle Media queries 
window.addEventListener('load', () => {
    //generate the category elements. 
    const tab_land = 1200;
    const phone_small = 497;
    const windowWidth = document.documentElement.clientWidth;   // returns the width of the screen in pixels.
    if(windowWidth <= tab_land) {
        mediaQueries.rotateCategories();
    }

    // display images
    startView.displayImages();

    if(windowWidth <= phone_small) {
        mediaQueries.changeText();
    }
})


const changeGobackBtnOnScroll = () => {
    elements.answersContainer.onscroll = function() {
    
        if (elements.answersContainer.scrollTop > 45 ) {
        // we show the new button
            answersView.showGoBackToScoreButtonReplacementContainer();
            elements.goBackToScoreButtonReplacementContainer.addEventListener('click' , () => {
                answersView.hideGoBackToScoreButtonReplacementContainer();
                ctrlGoBackToScore();
            })
        } 
        else {
            // we hide the new button. and deattach the event listener from it.
            answersView.hideGoBackToScoreButtonReplacementContainer();
            elements.goBackToScoreButtonReplacementContainer.removeEventListener('click' , ctrlGoBackToScore)
        }
    
    }
}
 








