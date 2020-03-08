import { elements , clearLoader } from './base'


export const getNumOfQuestionsInput = () => {
    let q , q_text , q_final;
    q = elements.numOfQuestionsToPlay;  // this is the select element.
    q_text = q.options[q.selectedIndex].text;
    
    q_final = parseInt(q_text);


    return q_final;
}

const activatePlayBtn = () => {
    elements.startButton.classList.add('start-button-activated');
}

const deactivatePlayBtn = () => {
    elements.startButton.classList.remove('start-button-activated');
}


export const selectCategory = clickedCategory => {
    resetCategories();

    // add the chosen-cat class to the clicked cat
    clickedCategory.classList.add('chosen-cat');

    // we make the start-button active
    activatePlayBtn();
} 

export const getSelectedCategoryID = () => {
    let idStr , id;
    elements.catergories.forEach(el => {
        if(el.matches('.chosen-cat')) idStr = el.id
    })
    id = idStr.slice(4);
    return id;
}

export const resetCategories = () => {
    elements.catergories.forEach(el => el.classList.remove('chosen-cat'));
}


export const startQuiz = () => {
    clearLoader();
    elements.questionContainer.classList.add('show');
}
 

export const loadStartPage =  () => {
    elements.questionContainer.classList.remove('show');
    elements.resultsContainer.classList.remove('show');
    elements.startPageContainer.classList.add('show-startPage');
    deactivatePlayBtn();
}









