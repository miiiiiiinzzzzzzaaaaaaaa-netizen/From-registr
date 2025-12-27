const form = document.getElementById('registrationForm');
const username = document.getElementById('username');
const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const password = document.getElementById('password');
const submitBtn = document.getElementById('submitBtn');

function validateForm() {
    const isUValid = checkUsername();
    const isNValid = checkFullName();
    const isEValid = checkEmail();
    const isPValid = checkPassword();

    submitBtn.disabled = !(isUValid && isNValid && isEValid && isPValid);
}

function checkUsername() {
    const val = username.value.trim();
    const regex = /^[a-zA-Z0-9]+$/;
    let error = "";

    if (val.length < 3 || val.length > 15) error =;
    else if (!regex.test(val)) error =;

    return showResult(username, 'usernameError', error);
}

function checkFullName() {
    const val = fullName.value.trim();
    const parts = val.split(' ').filter(p => p.length > 0);
    const regex = /^[a-zA-Z\s]+$/;
    let error = "";

    if (!regex.test(val)) error =
    else if (parts.length < 2) error =;

    return showResult(fullName, 'fullNameError', error);
}

function checkEmail() {
    const val = email.value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let error = regex.test(val) ? "" :
    return showResult(email, 'emailError', error);
}

function checkPassword() {
    const val = password.value;
    const nameVal = fullName.value.toLowerCase();
    const emailPrefix = email.value.split('@')[0].toLowerCase();
    let error = "";

    if (val.length < 8) error =;
    else if (!/[0-9!@#$%^&*]/.test(val)) error =;
    else if (nameVal && val.toLowerCase().includes(nameVal)) error =;
    else if (emailPrefix && val.toLowerCase().includes(emailPrefix)) error =;

    return showResult(password, 'passwordError', error);
}

function showResult(input, errorId, errorMsg) {
    const errorSpan = document.getElementById(errorId);
    if (errorMsg) {
        errorSpan.innerText = errorMsg;
        input.classList.add('invalid');
        input.classList.remove('valid');
        return false;
    } else {
        errorSpan.innerText = "";
        input.classList.remove('invalid');
        input.classList.add('valid');
        return true;
    }
}

[username, fullName, email, password].forEach(el => {
    el.addEventListener('input', validateForm);
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("اطلاعات ثبت شد:", {
        user: username.value,
        name: fullName.value,
        email: email.value
    });
    document.getElementById('successMessage').style.display = 'block';
    form.reset();
    submitBtn.disabled = true;
});
