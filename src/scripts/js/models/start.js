import axios from 'axios'

export default class Start {
    constructor(numOfQuestions = 10, selectedCategoryID , difficulty = 'easy') {
        this.numOfQuestions = numOfQuestions;
        this.categoryID     = selectedCategoryID;
        this.difficulty     = difficulty;
    }

    async getResults() {
        try {
            const res = await axios(`https://opentdb.com/api.php?mount=${this.numOfQuestions}&category=${this.categoryID}&difficulty=${this.difficulty}`);
            this.questions = res.data.results;
            // console.log('this is the result from the API')
            // console.log(res);
        }
        catch(err) { alert('Error')};
    }
} 











