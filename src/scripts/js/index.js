import { elements , DOMString  } from './views/base'
import Start                from './models/start'
import * as score           from './models/score'
import * as startView       from './views/startView'
import * as questionView    from './views/questionView'
import * as scoreView       from './views/scoreView'
import * as answersView       from './views/answersView'
import * as mediaQueries       from './views/media-queries'



// state.questionsObj.questions ==> Questions : array of objects 
// state.questions.questions[0]. question/correct_answer/difficulty/incorrect_answers(array of 3 strings)
const state = { nextQuestionIndex: 0 };

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
    
    // we start the quiz
    startView.startQuiz();
    
    // we generate the track-bar and display it
    questionView.generateAndDisplayTrackBar(numOfQuestions);

    // display the next question (in this case the first one.) . we pass the whole question object.
    questionView.displayQuestion(state.questionsObj.questions[state.nextQuestionIndex], state.nextQuestionIndex);

    // we reset the selected category
    startView.resetCategories();
};

const ctrlGotoNextQuestion = () => {
    // we go through with the function only if the one answer is chosen.
    if(questionView.isAnswerSelected()) {
        state.nextQuestionIndex++;

        // get the chosen answer from the user input & added it to the current question object.
        const chosenAnswer = questionView.getChosenAnswer();
        state.questionsObj.questions[state.nextQuestionIndex-1].chosen_answer = chosenAnswer;
        
        // display the next question. we pass the whole question object.
        questionView.displayQuestion(state.questionsObj.questions[state.nextQuestionIndex], state.nextQuestionIndex);
        
        // we expose the prev-question button
        questionView.showPrevQuestionButton(); 
        
        // if it is the last questin. display 'showScoreButton' , instead of 'nextQuestionButton'
        if(state.nextQuestionIndex === state.questionsObj.numOfQuestions - 1) { questionView.showScoreButton()}
    }

    else {
        alert('ATTENTION : NO ANSWER IS SELECTED !!!!')
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

    // we hide the prev question button if we are  in the first question
    if(state.nextQuestionIndex === 0) questionView.hidePrevQuestionButton();
}

const ctrlShowScore = () => {
    // we go through with the function only if one answer is selected for the last question
    if(questionView.isAnswerSelected()) {
        // get the chosen answer from the user input & added it to the current question object.
        const chosenAnswer = questionView.getChosenAnswer();
        state.questionsObj.questions[state.nextQuestionIndex].chosen_answer = chosenAnswer;

        // we hide the prevQuestionButton
        questionView.hidePrevQuestionButton();

        // load score page
        scoreView.loadScorePage();
        
        // get final score from score model.
        const finalScore = score.getFinalScore(state.questionsObj.questions);
        const maxScore =   state.questionsObj.numOfQuestions * score.pointsPerCorrentAnswer;
        
        // display Final score
        scoreView.displayFinalScore(finalScore,maxScore);
    } 
    else {
        alert('ATTENTION : NO ANSWER IS SELECTED !!!!')
    }

    
}

const ctrlPlayAgain = () => {
    state.questionsObj = {};
    state.nextQuestionIndex = 0;

    // UI RESET method.
    startView.loadStartPage();
    questionView.hideScoreButton();
    answersView.resetAnswersPage();
}

const ctrlDisplayAnswers = () => {
    answersView.loadAnswersPage();

    // we generate the answers only the first time we load the asnwers page.
    if(elements.tableBody.childElementCount === 0) {
        answersView.generateAnswers(state.questionsObj.questions);
    }
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





/* 
window.addEventListener('click', el => {
   console.log(el.target)
})
 */










