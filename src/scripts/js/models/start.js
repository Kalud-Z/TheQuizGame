import axios from 'axios'

export default class Start {
    constructor(query = 10) { this.query = query; }

    async getResults() {
        try {
            const res = await axios(`https://opentdb.com/api.php?amount=${this.query}&category=17`);

            this.results = res.data.results;
            console.log(this.results);
        }
        catch (err) { alert('Error')};
    }
} 











