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


// state.questionsObj.questions ==> Questions : array of objects 
// state.questions.questions[0]. question/correct_answer/difficulty/incorrect_answers(array of 3 strings)
export const state = { nextQuestionIndex: 0 };

window.q = state;





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

    // we start the quiz
    startView.startQuiz();
    
    // we generate the track-bar and display it
    questionView.generateAndDisplayTrackBar(numOfQuestions);

    // display the next question (in this case the first one.) . we pass the whole question object.
    questionView.displayQuestion(state.questionsObj.questions[state.nextQuestionIndex], state.nextQuestionIndex);

    // display exit button and Activate timer
    questionView.showExitButton();

    // we show and we activate the timer
    questionView.showTimerUI()
    questionView.activateTimerUI();
    question.startTimer();
    

    // we reset the selected category
    startView.resetCategories();
};

export const ctrlGotoNextQuestion = () => {
    console.log('NEXT QUESTION IS CALLED')
    // we go through with the function only if  one answer is chosen.
    // if(questionView.isAnswerSelected()) {
    state.nextQuestionIndex++;

    // get the chosen answer from the user input & added it to the current question object.
    var chosenAnswer = questionView.getChosenAnswer();
    if(typeof chosenAnswer === 'undefined') { chosenAnswer = 'No Answer'; console.log('NEXTQUESZION :no asnwer is assigned.') }
    // console.log('thisi the chosen asnwer')
    // console.log(chosenAnswer);
    state.questionsObj.questions[state.nextQuestionIndex-1].chosen_answer = chosenAnswer;
    
    // display the next question. we pass the whole question object.
    questionView.displayQuestion(state.questionsObj.questions[state.nextQuestionIndex], state.nextQuestionIndex);
    
    // we expose the prev-question AND exit buttons ALSO : activate question timer. in this case a track bar
    questionView.showPrevQuestionButton(); 
    questionView.showExitButton();

    questionView.resetTimerUI();
    setTimeout(() => { questionView.activateTimerUI() }, 100);
    
    question.restartTimer();
    
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

            // we hide the buttons
            questionView.hidePrevQuestionButton();
            questionView.hideExitButton(); 
        }
    });


}

export const ctrlShowScore = () => {
        console.log('SHOW SCORE IS CALLED')
        // get the chosen answer from the user input & added it to the current question object.
        var chosenAnswer = questionView.getChosenAnswer();
        if(!chosenAnswer) { chosenAnswer = 'No Answer'; console.log('SHOW SCORE :no asnwer is assigned.') }
        // console.log('thisi the chosen asnwer')
        // console.log(chosenAnswer);
        state.questionsObj.questions[state.nextQuestionIndex].chosen_answer = chosenAnswer;

        // we hide the prevQuestionButton , the timer
        questionView.hidePrevQuestionButton();
        questionView.hideTimerUI();

        question.resetTimer();

        // load score page
        scoreView.loadScorePage();
        
        // get final score from score model.
        const finalScore = score.getFinalScore(state.questionsObj.questions);
        const maxScore =   state.questionsObj.numOfQuestions * score.pointsPerCorrentAnswer;
        
        // display Final score
        scoreView.displayFinalScore(finalScore,maxScore);

}

const ctrlPlayAgain = () => {
    state.questionsObj = {};
    state.nextQuestionIndex = 0;

    // UI RESET method.
    startView.loadStartPage();
    questionView.hideScoreButton();
    answersView.resetAnswersPage();
    questionView.resetTimerUI();
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

// choose caterogy listener
elements.categoriesContainer.addEventListener('click', e => {
    if(e.target.matches('.'+DOMString.category))
    startView.selectCategory(e.target);
})

// clicking start button after choosing how many questions to play.
elements.startButton.addEventListener('click', ctrlStartQuiz);

// attached to nextQuestionButton OR prevQuestionButton OR showScoreButton. delegate event to the parent.
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
        else if(elements.questionContainer.matches('.show')) {

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
        if(elements.questionContainer.matches('.show')) {

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
        if(elements.questionContainer.matches('.show') && state.nextQuestionIndex > 0) {  ctrlGotoPrevQuestion(); }
    }
});


// load and Scroll event Listeners §§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§ 


// title animation !
window.addEventListener('load', () => {
    const allLetters = elements.AppTitle__letter;
    allLetters.forEach((el,i) => { el.classList.add('display-Letter'); })   
    setTimeout(() => { elements.AppTitle.classList.add('title-change-color'); }, 1000);  //doesnt work in firefox !
})
 

// Display Images nicely. And , if necessary , Handle Media queries 
window.addEventListener('load', () => {
    //generate the category elements. 
    const tab_land = 1200;
    const windowWidth = document.documentElement.clientWidth;   // returns the width of the screen in pixels.
    if(windowWidth <= tab_land) {
        mediaQueries.rotateCategories();
    }

    // display images
    startView.displayImages();
})


const changeGobackBtnOnScroll = () => {

    elements.answersContainer.onscroll = function() {
        var currenScrollPos = elements.answersContainer.scrollTop
        console.log(currenScrollPos);
    
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
 





/* 
window.addEventListener('click', el => {
   console.log(el.target)
})
 */
























