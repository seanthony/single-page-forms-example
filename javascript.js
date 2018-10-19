// hiding welcome row and showing form
function hideWelcomeShowForm() {
    // this hides the initial row when the button is clicked and displays the next
    var welcomeDiv = document.querySelector('#welcome-row');
    welcomeDiv.hidden = true;
    var formDiv = document.querySelector('#voting-row');
    formDiv.hidden = false;
}

function addListenerToWelcome() {
    // adding the event listener to the welcome button
    // this done in lieu of using an onclick method hard coded into the html
    // since y'all often use templates I wanted to show how to use js to add a listener
    // because using onclick with templates can be tricky
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
    // this function validates all the form items for me
    // if there are any invalid items, the function that calls this won't let the form submit
    var formErrors = [];
    var formCorrect = [];

    // checking first form field
    var name = form.inputName.value.trim(); // i trim these fields to make sure empty spaces aren't used instead
    if (name.length === 0) {
        formErrors.push({ selector: 'inputName', text: 'Please enter a name.', class: 'is-invalid', smallClass: 'invalid-feedback' });
    } else if (name.length <= 3) {
        // this one still passes, just passes a note to the user
        formCorrect.push({ selector: 'inputName', text: 'Seems like a short name.', class: 'is-valid', smallClass: 'text-muted' })
    } else {
        formCorrect.push({ selector: 'inputName', text: 'Thank you', class: 'is-valid', smallClass: 'text-success' })
    }

    // second form field, email
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

    // the select menu for the best dog
    var dog = form.dogSelect.value;
    if (dog.length === 0) {
        // checking for the non select option
        formErrors.push({ selector: 'dogSelect', text: 'Please choose the best dog in the whole world.', class: 'is-invalid', smallClass: 'invalid-feedback' });
    } else {
        formCorrect.push({ selector: 'dogSelect', text: 'Thanks for voting!', class: 'is-valid', smallClass: 'valid-feedback' })
    }

    // checking the additional text
    var text = form.explainWhy.value.trim();
    if (text.length === 0) {
        formErrors.push({ selector: 'explainWhy', text: 'Please explain why the dog you selected above is the best dog in the world.', class: 'is-invalid', smallClass: 'invalid-feedback' });
    } else if (text.split(' ').length <= 3) {
        formErrors.push({ selector: 'explainWhy', text: "C'mon, you'll need to give more than a three word answer.", class: 'is-invalid', smallClass: 'invalid-feedback' });
    } else {
        formCorrect.push({ selector: 'explainWhy', text: " ", class: 'is-valid', smallClass: 'valid-feedback' });
    }

    // i return all the parts in a bundled object to make it easier to handle for the next function
    return { formErrors: formErrors, formCorrect: formCorrect, obj: { name: name, email: email, dog: dog, text: text } };
}

function submitForm(event) {
    event.preventDefault(); // added so the page doesn't refresh on form submit
    var form = event.target; // getting the form associated with the submit
    var inputs = document.querySelectorAll('.form-control');
    // the next two for loops clear out any residual feedback from the form validation
    for (var input of inputs) {
        let cls = ['is-valid', 'is-invalid'];
        input.classList.remove(...cls);
    }
    var helpText = document.querySelectorAll('.form-text');
    for (var smallText of helpText) {
        let cls = ['valid-feedback', 'invalid-feedback'];
        smallText.classList.remove(...cls);
    }

    // call the validation function
    var formNotes = validateVotingForm(form);

    // checking to see if there are any errors
    if (formNotes.formErrors.length === 0) {
        // no errors will go to the finishing function
        showFinal(formNotes.obj);
    } else {
        // i decided to combine the two arrays so the user could get feedback
        // on incorrect and correct fields from the same for loop
        var feedback = formNotes.formErrors.concat(formNotes.formCorrect);
        for (var obj of feedback) {
            // i set up the naming conventions in HTML to make this easier
            // to not require multiple loops
            var element = document.querySelector('#' + obj.selector);
            element.classList.add(obj.class) // puts the color around the form input
            var small = document.querySelector('small.' + obj.selector);
            small.innerHTML = obj.text; // updates the help text for the form
            small.classList.add(obj.smallClass);
        }
    }
}

function addFormListener() {
    // queues up the form submit button to trigger the right events
    var form = document.querySelector('#voting-form');
    form.addEventListener('submit', submitForm);
}

// update final text
// the last thing! aka the success screen
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

// set up the autofill button
function autoFill() {
    console.warn('auto filling form...');
    document.querySelector("#inputName").value = 'Your Name';
    document.querySelector("#inputEmail").value = 'yourname@basecampcodingacademy.org';
    document.querySelector("#explainWhy").value = 'Because she is the best dog ever, duh.';
    document.querySelector("#dogSelect").value = 'Dómi';
}

function addAutoFillListener() {
    var button = document.querySelector('#auto-fill-button');
    button.addEventListener('click', autoFill)
}

// add listeners
// i decided to bundle these so they all would run in succession on page loading (below)
// this would be like your `def main()` in python
function addListeners() {
    addListenerToWelcome();
    addFormListener();
    addAutoFillListener();
}

// when the window loads, add the event listeners
// this would be similar to `if __main__ == __name__' in python
window.addEventListener('load', addListeners);