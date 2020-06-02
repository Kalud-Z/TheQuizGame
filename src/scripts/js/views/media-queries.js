import { elements , DOMString ,  renderLoader} from './base'


export const rotateCategories = () => {
        // we delete the original html structure and we insert the new one.
        elements.categoriesTableBody.innerHTML = '';

        const markup=`
        <tr>
            <td> <div class="category-name" id="cat-24"> Politics </div> <img src="img/politics.jpg" alt="sports" class="category__image"> </td>
            <td> <div class="category-name" id="cat-27"> Animals </div> <img src="img/animals.jpg" alt="sports" class="category__image"> </td>
        </tr>

        <tr>
            <td> <div class="category-name" id="cat-18"> Computer Science </div> <img src="img/computer-science.jpg" alt="sports" class="category__image"> </td>
            <td> <div class="category-name" id="cat-12"> Music </div> <img src="img/music.jpg" alt="sports" class="category__image"> </td>
        </tr>


        <tr>
            <td> <div class="category-name" id="cat-21"> Sports </div>  <img src="img/sports.jpg" alt="sports" class="category__image"> </td>
            <td> <div class="category-name" id="cat-11"> Movies </div> <img src="img/movies.jpg" alt="sports" class="category__image"> </td>
        </tr>
        `;

        elements.categoriesTableBody.insertAdjacentHTML('afterbegin', markup);
}


export const changeText = () => {
    document.querySelector('.start-page-container__select-number-container label').innerText = 'Questions';
}












    

















































