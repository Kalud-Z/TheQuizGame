import { elements } from './base'



export const loadScorePage = () => {
    elements.questionContainer.classList.remove('show');
    elements.resultsContainer.classList.add('show');
}

export const displayFinalScore = (finalScore , maxScore) => {
    elements.scoreOutput.innerText =  finalScore + '/' + maxScore;
}