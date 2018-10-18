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

// voting form
function validateVotingForm(form) {
    var formErrors = [];
    var formCorrect = [];
    var name = form.inputName.value.trim();
    if (name.length === 0) {
        formErrors.push({ selector: 'inputName', text: 'Please enter a name.', class: 'is-invalid', smallClass: 'invalid-feedback' });
    } else if (name.length < 3) {
        formCorrect.push({ selector: 'inputName', text: 'Seems like a short name.', class: '', smallClass: 'text-muted' })
    } else {
        formCorrect.push({ selector: 'inputName', text: '', class: 'is-valid', smallClass: 'text-success' })
    }

    var email = form.inputEmail.value.trim();
    if (email.length === 0) {
        formErrors.push({ selector: 'inputEmail', text: 'Please enter a valid email.', class: 'is-invalid', smallClass: 'invalid-feedback' });
    } else if (email.index('@') < 0) {
        formErrors.push({ selector: 'inputEmail', text: 'Emails must include @.', class: 'is-invalid', smallClass: 'invalid-feedback' })
    } else {
        formCorrect.push({ selector: 'inputEmail', text: '', class: 'is-valid', smallClass: 'text-success' })
    }

    return { formErrors, formCorrect };
}

function submitForm(event) {
    event.preventDefault(); // added so the page doesn't refresh on form submit
    var form = event.target;
    var formNotes = validateVotingForm(form);
    if (formNotes.formErrors.length === 0) {

    } else {
        var feedback = formNotes.formErrors.concat(formNotes.formCorrect);
        for (var obj of feedback) {
            var element = document.querySelector('#' + obj.selector);
            element.classList.add(obj.class)
            var small = document.querySelector('small.' + obj.selector);
            small.innerHTML = obj.text;
            small.classList.add(obj.smallClass);
        }
    }
}

function addFormListener() {
    var form = document.querySelector('#voting-form');
    form.addEventListener('submit', submitForm);
}

// add listeners
function addListeners() {
    addListenerToWelcome();
    addFormListener();
}

window.addEventListener('load', addListeners);