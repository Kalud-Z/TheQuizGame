import axios from 'axios'

export default class Start {
    constructor(numOfQuestions = 10) { this.numOfQuestions = numOfQuestions; }

    async getResults() {
        try {
            const res = await axios(`https://opentdb.com/api.php?amount=${this.numOfQuestions}&category=17`);
            this.questions = res.data.results;
        }
        catch (err) { alert('Error')};
    }
} 











