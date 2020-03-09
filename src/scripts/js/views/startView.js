import { elements , clearLoader, DOMString } from './base'


export const displayImages = () => {
     // it displays the coupons when we first load the page.
        const allImages = document.querySelectorAll('.'+DOMString.catergoryImage)

        for(let i = 0 ; i < allImages.length ; i++) {
            (function() {
                    setTimeout(function(){  // display coupons one after the other ==> Nice Animation
                    const allImages = document.querySelectorAll('.'+DOMString.catergoryImage)
                    allImages[i].classList.add('showImage');
                } ,222 * i); //you need to wait a lil bit.
            })(i);
         }
}

export const getSelectedCategoryID = () => {
    let idStr , id;
    document.querySelectorAll('.'+DOMString.category).forEach(el => {
        if(el.matches('.chosen-cat')) idStr = el.id
    })
    id = idStr.slice(4);
    return id;
}


export const getDifficulty = () => {
    let selectElement , selectElement_value;
    selectElement = elements.difficulty;  // this is the select element.
    selectElement_value = selectElement.options[selectElement.selectedIndex].value;

    return selectElement_value;
}


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


export const resetCategories = () => {
    document.querySelectorAll('.'+DOMString.category).forEach(el => el.classList.remove('chosen-cat'));
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









