import { elements } from './base'


export const getNumOfQuestionsInput = () => {
    let q , q_text , q_final;
    q = elements.numOfQuestionsToPlay;  // this is the select element.
    q_text = q.options[q.selectedIndex].text;
    
    q_final = parseInt(q_text);
    // console.log(q_final);
    // console.log(typeof(q_final));

    return q_final;
}


export const startQuiz = () => {
    elements.startPageContainer.classList.remove('show');
    elements.questionContainer.classList.add('show');
}
 


export const loadStartPage =  () => {
    elements.questionContainer.classList.remove('show');
    elements.resultsContainer.classList.remove('show');
    elements.startPageContainer.classList.add('show');
}









