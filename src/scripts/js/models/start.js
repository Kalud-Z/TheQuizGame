import axios from 'axios'

export default class Start {
    constructor(numOfQuestions = 10, selectedCategoryID) {
        this.numOfQuestions = numOfQuestions;
        this.categoryID = selectedCategoryID;
    }

    async getResults() {
        try {
            const res = await axios(`https://opentdb.com/api.php?amount=${this.numOfQuestions}&category=${this.categoryID}`);
            this.questions = res.data.results;
            console.log('this is the result from the API')
            console.log(res);
        }
        catch (err) { alert('Error')};
    }
} 











