// #########################################################################################################################
// QUIZ CONTROLLER ########################################################################################################
var QuizController = (function() {

    var theQuiz = function(question , possibeAnswers , correctAnswer) {
        this.question       = question;
        this.possibeAnswers = possibeAnswers;
        this.correctAnswer  = correctAnswer;
        this.chosenAnswer   = 0;
        this.score = 0;
    }

    theQuiz.prototype.addChosenAnswer = function(index) {
        this.chosenAnswer = index;
    }
    
    theQuiz.prototype.calcScoreEach = function(index) {
        if(this.chosenAnswer === this.correctAnswer) { this.score = 25; }
        else { this.score = 0; }
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
    quiz3.possibeAnswers = ['no' , 'yes','Hell yeah'];
    quiz3.correctAnswer = 2;
    
    var allQuestions = [quiz1 , quiz2 , quiz3];

    var calcTotalScore = function() {
        var sum = 0;

        for(var i = 0; i < allQuestions.length ; i++) {
            allQuestions[i].calcScoreEach();
        }
        
        for(var i = 0; i < allQuestions.length ; i++) {
            sum = sum + allQuestions[i].score;
        }

        console.log(sum);
        return sum;
    };

    var calcMaximumScore = function() {
       return allQuestions.length * 25 ; 
    }

    return {
        getQuestions: function() {
            return allQuestions;
        },

        getMaxScore: function() {
            return calcMaximumScore();
        },


        getFinalScore: function() {
            return calcTotalScore();
            // console.log(allQuestions);
        }
    }

    

})();



// ######################################################################################################################
// UI ####################################################################################################################
var UIController = (function() {

    var DOMStrings = {
            startButton: document.querySelector('.start-button'),
            numOfQuestionsInput: document.querySelector('.number-of-questions-to-play'),
            startPageContainer: document.querySelector('.start-page-container'),
            questionContainer: document.querySelector('.question-container'),
            allPossibleAnswer: document.getElementsByName('possible-answer'),
            nextButton: document.querySelector('.next-question-button'),
            scoreButton: document.querySelector('.score-button'),
            theQuestion: document.querySelector('.question'),
            option_1_text: document.querySelector('.option-1-text'),
            option_2_text: document.querySelector('.option-2-text'),
            option_3_text: document.querySelector('.option-3-text'),
            resultsContainer: document.querySelector('.results-container'),
            scoreOutput: document.querySelector('.results-score')
    };

    var clearRadioButtons = function() {
        var optionsList = DOMStrings.allPossibleAnswer;
        for(var i = 0 ; i < optionsList.length ; i++) {
            optionsList[i].checked = false;
        }
    }





    return {
        getDOMStrings: function(){
            return DOMStrings;
        },

        
        selectedAnswersIndex: function() {
            var optionsList = DOMStrings.allPossibleAnswer;
            var checkedItem;
            for(var i = 0 ; i < optionsList.length ; i++) {
                if(optionsList[i].checked)
                {
                    checkedItem = i;
                }
            }
            return checkedItem;
        },
    
        startQuiz: function() {
            DOMStrings.startPageContainer.classList.remove('show');
            DOMStrings.questionContainer.classList.add('show');
        },

        displayQuestion: function(quiz){
            clearRadioButtons();
            DOMStrings.theQuestion.innerText = quiz.question;
            DOMStrings.option_1_text.innerText    = quiz.possibeAnswers[0];
            DOMStrings.option_2_text.innerText    = quiz.possibeAnswers[1];
            DOMStrings.option_3_text.innerText    = quiz.possibeAnswers[2];
        },

        showScoreButton: function(){
            DOMStrings.nextButton.classList.remove('show');
            DOMStrings.scoreButton.classList.add('show');
        },

        showScorePage: function() {
            DOMStrings.questionContainer.classList.remove('show');
            DOMStrings.resultsContainer.classList.add('show');
        },

        displayFinalScore: function(finalScore , maxScore) {
            DOMStrings.scoreOutput.innerText =  finalScore + '/' + maxScore;
        }
    };

})();




// ######################################################################################################################
//  GLOBAL APP CONTROLLER ###############################################################################################
var controller = (function(QuizCtrl , UICtrl) {
    var nextQuestionIndex = 0;
    var questions = QuizCtrl.getQuestions();

    var setupEventListeners = function() {
        var DOM = UICtrl.getDOMStrings();
        DOM.startButton.addEventListener('click', ctrlStartQuiz);
        DOM.nextButton.addEventListener('click', gotoNextQuestion);
        DOM.scoreButton.addEventListener('click', ctrlShowScore);
    };


    var ctrlStartQuiz = function() { 
        // console.log(UICtrl.getNumberOfQuestionToPlay());
        // console.log(questions);
        UICtrl.startQuiz();
        UICtrl.displayQuestion(questions[nextQuestionIndex]);
        nextQuestionIndex++;
    };

    var ctrlAddChosenAnswer = function() {
         var answerIndex = UICtrl.selectedAnswersIndex();
         questions[nextQuestionIndex-1].addChosenAnswer(answerIndex);
    };

    var gotoNextQuestion = function(){
        // if all questions displayed, go to the score page.
        if(nextQuestionIndex === questions.length-1) {
             UICtrl.showScoreButton();
        }

        //add the chosen answer to the current question object.
        ctrlAddChosenAnswer();

        //display next question
        UICtrl.displayQuestion(questions[nextQuestionIndex]);
        // console.log(questions);

        nextQuestionIndex++;
    };

    var ctrlShowScore = function() {
        //add the chosen answer to the current question object.
        ctrlAddChosenAnswer();

        UICtrl.showScorePage();
        
        console.log(questions);

        var finalScore = QuizCtrl.getFinalScore();
        var maxScore = QuizCtrl.getMaxScore();
        
        UICtrl.displayFinalScore(finalScore,maxScore);
    };



    return {
        init: function() {
            console.log('the app started');
            setupEventListeners();
        }
    }

})(QuizController,UIController);


controller.init();



/* 

var getSelectedOption = function(sel) {
    var opt;
    for ( var i = 0, len = sel.options.length; i < len; i++ ) {
        opt = sel.options[i];
        if ( opt.selected === true ) {
            break;
        }
    }
    return opt;
}

var numberOfQuestionToPlay = getSelectedOption(DOMStrings.numOfQuestionsInput);
 */





























































































