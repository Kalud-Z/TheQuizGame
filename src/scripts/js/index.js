import Start                from './models/start'
import * as score           from './models/score'
import * as startView       from './views/startView'
import * as questionView    from './views/questionView'
import * as scoreView       from './views/scoreView'
import * as answersView       from './views/answersView'

import { elements } from './views/base'


// state.questionsObj.questions ==> Questions : array of objects 
// state.questions.questions[0]. question/correct_answer/difficulty/incorrect_answers(array of 3 strings)
const state = { nextQuestionIndex: 0 };

window.q = state;

const ctrlStartQuiz = async () => { 
    // we get the number of questions from the user
    const numOfQuestions = startView.getNumOfQuestionsInput();
    
    // we create a new object.
    state.questionsObj = new Start(numOfQuestions);
    
    // we fetch the questions from the API
    await state.questionsObj.getResults();  //we wait till data comes back from the server.
    
    // we start the quiz
    startView.startQuiz();
    
    // display the next question (in this case the first one.) . we pass the whole question object.
    questionView.displayQuestion(state.questionsObj.questions[state.nextQuestionIndex], state.nextQuestionIndex);

    state.nextQuestionIndex++; 
};

const ctrlGotoNextQuestion = () => {
    // get the chosen answer from the user input & added it to the current question object.
    const chosenAnswer = questionView.getChosenAnswer();
    state.questionsObj.questions[state.nextQuestionIndex-1].chosen_answer = chosenAnswer;

    // display the next question. we pass the whole question object.
    
    questionView.displayQuestion(state.questionsObj.questions[state.nextQuestionIndex], state.nextQuestionIndex);

    
    // if it is the last questin. display 'showScoreButton' , instead of 'nextQuestionButton'
    if(state.nextQuestionIndex === state.questionsObj.numOfQuestions - 1) { questionView.showScoreButton()}
    
    state.nextQuestionIndex++; 
}

const ctrlShowScore = () => {
    // get the chosen answer from the user input & added it to the current question object.
    const chosenAnswer = questionView.getChosenAnswer();
    state.questionsObj.questions[state.nextQuestionIndex-1].chosen_answer = chosenAnswer;

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

// Event Listeners ########################################################################
// ##########################################################################################

// clicking start button after choosing how many questions to play.
elements.startButton.addEventListener('click', ctrlStartQuiz);

// triiger : nextQuestionButton OR showScoreButton. delegate event to the parent.
elements.questionContainer.addEventListener('click', e => {
    if(e.target.matches('.next-question-button')) { ctrlGotoNextQuestion(); }
    else if(e.target.matches('.score-button')) { ctrlShowScore(); }
})

// play again button
elements.playAgainButton.addEventListener('click', ctrlPlayAgain);

// display answers buttons
elements.answersButton.addEventListener('click', ctrlDisplayAnswers);

// go back button the the answers page.
elements.goBackToScoreButton.addEventListener('click' , ctrlGoBackToScore)



// window.addEventListener('click', e => { console.log(e.target); })















