// #########################################################################################################################
// QUIZ CONTROLLER ########################################################################################################
var QuizController = (function() {

    var theQuiz = function(question , possibeAnswers , correctAnswer) {
        this.question       = question;
        this.possibeAnswers = possibeAnswers;
        this.correctAnswer  = correctAnswer;
    }
    
    var quiz1 = new theQuiz();
    quiz1.question = 'What is the coolest programming language in the world ?';
    quiz1.possibeAnswers = ['Java' , 'Pascal' , 'JavaScript'];
    quiz1.correctAnswer = 2;
    
    var quiz2 = new theQuiz();
    quiz2.question = 'Who is your fav teacher in the world ?';
    quiz2.possibeAnswers = ['Eli the computer guy' , 'Jonas' , 'Jesus'];
    quiz2.correctAnswer = 1;
    
    var quiz3 = new theQuiz();
    quiz3.question = 'Are you a badass programmer ?';
    quiz3.possibeAnswers = ['no' , 'yes'];
    quiz3.correctAnswer = 1;
    
    var allQuestions = [quiz1 , quiz2 , quiz3];

    return {
        getQuestions: function() {
            return allQuestions;
        }
    }

    

})();



// ######################################################################################################################
// UI ####################################################################################################################
var UIController = (function() {

    var DOMStrings = {
            startButton: document.querySelector('.start-button'),
            startPageContainer: document.querySelector('.start-page-container'),
            questionContainer: document.querySelector('.question-container'),
            nextButton: document.querySelector('.next-question-button'),
            theQuestion: document.querySelector('.question'),
            option_1_text: document.querySelector('.option-1-text'),
            option_2_text: document.querySelector('.option-2-text'),
            option_3_text: document.querySelector('.option-3-text')
    };


    
    return {
        getDOMStrings: function(){
            return DOMStrings;
        },

        startQuiz: function() {
            DOMStrings.startPageContainer.classList.remove('show');
            DOMStrings.questionContainer.classList.add('show');
        },

        displayQuestion: function(quiz){
            DOMStrings.theQuestion.innerText = quiz.question;
            DOMStrings.option_1_text.innerText    = quiz.possibeAnswers[0];
            DOMStrings.option_2_text.innerText    = quiz.possibeAnswers[1];
            DOMStrings.option_3_text.innerText    = quiz.possibeAnswers[2];
        }
    };

})();




// ######################################################################################################################
//  GLOBAL APP CONTROLLER ###############################################################################################
var controller = (function(QuizCtrl , UICtrl) {
    
    var setupEventListeners = function() {
        var DOM = UICtrl.getDOMStrings();
        DOM.startButton.addEventListener('click', ctrlStartQuiz);
        DOM.nextButton.addEventListener('click', gotoNextQuestion);
    };


    var ctrlStartQuiz = function() { 
        var questions = QuizCtrl.getQuestions();
        console.log(questions);
        UICtrl.startQuiz();
        UICtrl.displayQuestion(questions[0]);
    }

    var gotoNextQuestion = function(){
        
    }


    return {
        init: function() {
            console.log('the app started');
            setupEventListeners();
        }
    }

})(QuizController,UIController);


controller.init();












































































































