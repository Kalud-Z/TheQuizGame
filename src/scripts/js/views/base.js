// Stuff reused accross different modules

export const elements = {
    container:                      document.querySelector('.container'),
    numOfQuestionsToPlay:           document.querySelector('.number-of-questions-to-play'),
    startButton:                    document.querySelector('.start-button'),
    numOfQuestionsInput:            document.querySelector('.number-of-questions-to-play'),
    startPageContainer:             document.querySelector('.start-page-container'),
    questionContainer:              document.querySelector('.question-container'),
    questionNumberDisplay:          document.querySelector('.question-container__title'),
    allPossibleAnswers:             document.getElementsByName('possible-answer'),
    prevQuestionButton:             document.querySelector('.prev-question-button'),
    nextButton:                     document.querySelector('.next-question-button'),
    scoreButton:                    document.querySelector('.score-button'),
    questionAndOptionsContainer:    document.querySelector('.questionAndOptionsContainer'),
    theQuestion:                    document.querySelector('.question'),
    option_1_text:                  document.querySelector('.option-1-text'),
    option_2_text:                  document.querySelector('.option-2-text'),
    option_3_text:                  document.querySelector('.option-3-text'),
    allOptions:                     document.querySelectorAll(`span[class^="option"]`), //select all span , whose classes start with ..

    resultsContainer:               document.querySelector('.results-container'),
    scoreOutput:                    document.querySelector('.results-container__score'),
    playAgainButton:                document.querySelector('.play-again-button'),
    answersContainer:               document.querySelector('.answers-container'),
    tableBody:                      document.querySelector('.table__body'),
    answersButton:                  document.querySelector('.answers-button'),
    goBackToScoreButton:            document.querySelector('.go-back-button')
}

export const DOMString = {   
    prevQuestionButton : 'prev-question-button'
}

export const renderLoader = parent => {
    const loader = ` <div class="loader"> <svg> <use href="./img/symbol-defs.svg#icon-spinner"></use> </svg> </div> `;
    parent.insertAdjacentHTML('beforeend', loader);
}

export const clearLoader = () => {
    const loader = document.querySelector('.loader');
    if(loader) { loader.parentElement.removeChild(loader); }
}

