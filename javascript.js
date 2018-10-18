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
function validEmail(email) {
    // this is just a little function to check to see if it meets some basic conditions of an email
    // in reality, i would use some more widely used library to do this for me.
    var parts = email.split('@');
    if (parts.length != 2) {
        return false;
    } else if (parts[0].length < 2 || parts[1].length < 5) {
        return false;
    }

    var end = parts[1].split('.');
    if (end.length != 2) {
        return false;
    }

    return true;
}

function validateVotingForm(form) {
    var formErrors = [];
    var formCorrect = [];
    var name = form.inputName.value.trim();
    if (name.length === 0) {
        formErrors.push({ selector: 'inputName', text: 'Please enter a name.', class: 'is-invalid', smallClass: 'invalid-feedback' });
    } else if (name.length <= 3) {
        formCorrect.push({ selector: 'inputName', text: 'Seems like a short name.', class: 'is-valid', smallClass: 'text-muted' })
    } else {
        formCorrect.push({ selector: 'inputName', text: 'Thank you', class: 'is-valid', smallClass: 'text-success' })
    }

    var email = form.inputEmail.value.trim();
    if (email.length === 0) {
        formErrors.push({ selector: 'inputEmail', text: 'Please enter a valid email.', class: 'is-invalid', smallClass: 'invalid-feedback' });
    } else if (email.indexOf('@') < 0) {
        formErrors.push({ selector: 'inputEmail', text: 'Emails must include @.', class: 'is-invalid', smallClass: 'invalid-feedback' })
    } else if (email.length < 5) {
        formErrors.push({ selector: 'inputEmail', text: 'Email is too short.', class: 'is-invalid', smallClass: 'invalid-feedback' })
    } else if (!validEmail(email)) {
        formErrors.push({ selector: 'inputEmail', text: 'Who you trying to fool with that fake email?', class: 'is-invalid', smallClass: 'invalid-feedback' })
    } else {
        formCorrect.push({ selector: 'inputEmail', text: "We promise we won't share your email.", class: 'is-valid', smallClass: 'valid-feedback' })
    }

    var dog = form.dogSelect.value;
    if (dog.length === 0) {
        formErrors.push({ selector: 'dogSelect', text: 'Please choose the best dog in the whole world.', class: 'is-invalid', smallClass: 'invalid-feedback' });
    } else {
        formCorrect.push({ selector: 'dogSelect', text: 'Thanks for voting!', class: 'is-valid', smallClass: 'valid-feedback' })
    }

    var text = form.explainWhy.value.trim();
    if (text.length === 0) {
        formErrors.push({ selector: 'explainWhy', text: 'Please explain why the dog you selected above is the best dog in the world.', class: 'is-invalid', smallClass: 'invalid-feedback' });
    } else if (text.split(' ').length <= 3) {
        formErrors.push({ selector: 'explainWhy', text: "C'mon, you'll need to give more than a three word answer.", class: 'is-invalid', smallClass: 'invalid-feedback' });
    } else {
        formCorrect.push({ selector: 'explainWhy', text: " ", class: 'is-valid', smallClass: 'valid-feedback' });
    }

    return { formErrors: formErrors, formCorrect: formCorrect, obj: { name: name, email: email, dog: dog, text: text } };
}

function submitForm(event) {
    event.preventDefault(); // added so the page doesn't refresh on form submit
    var form = event.target;
    var inputs = document.querySelectorAll('.form-control');
    for (var input of inputs) {
        let cls = ['is-valid', 'is-invalid'];
        input.classList.remove(...cls);
    }
    var helpText = document.querySelectorAll('.form-text');
    for (var smallText of helpText) {
        let cls = ['valid-feedback', 'invalid-feedback'];
        smallText.classList.remove(...cls);
    }
    var formNotes = validateVotingForm(form);
    if (formNotes.formErrors.length === 0) {
        showFinal(formNotes.obj);
    } else {
        console.log(formNotes.formErrors);
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

// update final text
function showFinal(obj) {
    for (var key in obj) {
        var val = obj[key];
        var selector = '#' + key;
        var element = document.querySelector(selector);
        element.innerHTML = val;
    }
    var rowToHide = document.querySelector('#voting-row');
    rowToHide.hidden = true;
    var rowToShow = document.querySelector('#final-row');
    rowToShow.hidden = false;
}

// add listeners
function addListeners() {
    addListenerToWelcome();
    addFormListener();
}

window.addEventListener('load', addListeners);