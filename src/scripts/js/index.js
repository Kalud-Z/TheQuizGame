import Start from './models/start'
import { elements } from './views/base'

// import Search from './models/Search'
// import * as searchView from './views/searchView'


const state = {};


const ctrlStartQuiz = () => { 
    // we create a new object of type start
    const questions = state.questions = new Start();
    questions.getResults();

   /*  var numOfQuestionsInput = UICtrl.NumberOfQuestionsInput();
    QuizCtrl.setNumberOfQuestions(numOfQuestionsInput);
    // debugger;
    UICtrl.startQuiz();
    questions = QuizCtrl.getQuestions();
    UICtrl.displayQuestion(questions[nextQuestionIndex],nextQuestionIndex);
    nextQuestionIndex++;
    console.log(nextQuestionIndex); */

};



// Event Listeners ########################################################################
// ##########################################################################################

// clicking start button after choosing how many questions to play.
elements.startButton.addEventListener('click', ctrlStartQuiz);








// window.addEventListener('click', e => { console.log(e.target); })















