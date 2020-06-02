import { elements } from './base'
import * as questionView    from './questionView'

export const loadAnswersPage = () => {
    elements.questionContainer.classList.remove('.show');
    elements.resultsContainer.classList.remove('show');
    elements.startPageContainer.classList.remove('show');
    elements.answersContainer.classList.add('show');
    elements.container.classList.add('full-height');
} 

export const generateAnswers = questions => {
    let html , status, choseAnswerClass;

        questions.forEach((el,index) => {

            if(el.chosen_answer !== el.correct_answer) {
                status = '&#10060;';
                choseAnswerClass = 'chosen-answer-is-incorrect';
            } 
            else {
                status = '&#10004;';
                choseAnswerClass = 'chosen-answer-is-correct';
            }

            html = `
                <tr>
                <td> ${index+1} </td>
                <td> ${el.question} </td>
                <td class="table-correct-answer"> ${el.correct_answer} </td>
                <td class=${choseAnswerClass}> ${el.chosen_answer} </td>
                <td> ${status} </td>
                </tr>`;
                
            //insert HTML into the DOM
            elements.tableBody.insertAdjacentHTML('beforeend' , html);  // inserted as a last child of the element. 
        })
}


export const goBack = () => {
    questionView.hideQuestionContainer();
    elements.resultsContainer.classList.add('show');
    elements.startPageContainer.classList.remove('show');
    elements.answersContainer.classList.remove('show');
    elements.container.classList.remove('full-height');
}

export const resetAnswersPage = () => {
    elements.tableBody.innerHTML = '';
}

export const showGoBackToScoreButtonReplacementContainer = () => {
    elements.goBackToScoreButtonReplacementContainer.classList.add('turn-visible')
}

export const hideGoBackToScoreButtonReplacementContainer = () => {
    elements.goBackToScoreButtonReplacementContainer.classList.remove('turn-visible')
}


