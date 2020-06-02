import { elements } from './base'


export const showExitPopup = () => {
    // we show the popup container
    elements.popupContainer.classList.add('show-popupContainer');
    // we blur the background.
    elements.container.style.filter = "blur(5px)";

    // we show the popup itsef
    elements.exitPopup.classList.add('show-popup');
}



export const hideExitPopup = () => {
    // we hide the popup itsef
    elements.exitPopup.classList.remove('show-popup');

     // we hide the popup container
     elements.popupContainer.classList.remove('show-popupContainer');
     // we unblur the background.
     elements.container.style.filter = "blur(0px)";
}

