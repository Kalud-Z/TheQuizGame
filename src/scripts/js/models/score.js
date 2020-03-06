import { elements } from '../views/base'

export const pointsPerCorrentAnswer = 10;

// calculate score : 1 correct answer = 10 points.
export const getFinalScore = (questions) => {
    let sum = 0;
    questions.forEach(el => { if(el.chosen_answer === el.correct_answer) sum += pointsPerCorrentAnswer})
    return sum;
};