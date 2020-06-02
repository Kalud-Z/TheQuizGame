import { elements } from './base'
import * as questionView    from './questionView'

export const scorePageScaleUp = () => {
    elements.resultsContainer.classList.add('score-page-scaleUp');
}

export const scorePageScaleDown = () => {
    elements.resultsContainer.classList.remove('score-page-scaleUp');
}


export const loadScorePage = () => {
    questionView.hideQuestionContainer();

    elements.resultsContainer.classList.add('show');
    setTimeout(() => {
        // elements.resultsContainer.style.transform = "scale(1)"; 
        scorePageScaleUp();
    }, 10);
}


export const displayFinalScore = (finalScore , maxScore) => {
    const finalScoreInPercentage = Math.ceil((finalScore * 100) / maxScore); 

    if(finalScoreInPercentage === 0) {
        elements.scoreOutput.innerText =  0 + '%';
    } 
    else {
        var counter = 1;
        const func = () => {
            elements.scoreOutput.innerText =  counter.toString() + '%';
            counter++;
        }
    
        setDeceleratingTimeout(func, 1 , finalScoreInPercentage);     
    }
   
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
                window.setTimeout(internalCallback, counter * factor );
                callback();
            }
        }
    }(times, 0);

    window.setTimeout(internalCallback, factor);
};
 
