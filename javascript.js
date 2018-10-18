// hiding welcome row and showing form
function hideWelcomeShowForm() {
    var welcomeDiv = document.querySelector('#welcome-row');
    welcomeDiv.hidden = true;
    var formDiv = document.querySelector('#voting-row');
    formDiv.hidden = false;
}

function addListenerToWelcome() {
    var button = document.querySelector('#welcome-button');
    button.addEventListener('click', hideWelcomeShowForm);
}



function addListeners() {
    addListenerToWelcome();
}

window.addEventListener('load', addListeners);