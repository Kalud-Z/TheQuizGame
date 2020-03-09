import { elements } from './base'



export const loadScorePage = () => {
    elements.questionContainer.classList.remove('show');
    elements.resultsContainer.classList.add('show');
}

export const displayFinalScore = (finalScore , maxScore) => {
    const finalScoreInPercentage = (finalScore * 100) / maxScore;

    var counter = 0;
    const func = () => {
        elements.scoreOutput.innerText =  counter + '%';
        counter++;
    }

    setDeceleratingTimeout(func, 1 , finalScoreInPercentage);
}



// HELPING FUNCTIONS #################################################################################
const setDeceleratingTimeout = (callback, factor, times) =>
{
    var internalCallback = function(tick, counter) {
        return function() {
            var limit;
            if (--tick >= 0) {
                if(times >= 50 && times <= 100) { limit = (20 * times)/100 ; } else { limit = (25 * times)/100 }
                if(tick < limit) { counter = counter + 10 } else { counter++ }
                console.log(counter);
                window.setTimeout(internalCallback, counter * factor );
                callback();
            }
        }
    }(times, 0);

    window.setTimeout(internalCallback, factor);
};
 
