const form = document.querySelector('form');
const username = document.getElementById('username');
const fullName = document.getElementById('fullName'); // مطمئن شو ID در HTML همین است
const email = document.getElementById('email');
const password = document.getElementById('password');
const submitBtn = document.querySelector('button[type="submit"]');

// تابع کمکی برای نمایش خطا یا موفقیت
const setValidationClass = (element, isValid) => {
    if (isValid) {
        element.classList.add('success');
        element.classList.remove('error');
    } else {
        element.classList.add('error');
        element.classList.remove('success');
    }
    checkFormValidity();
};

// 1. اعتبارسنجی نام کاربری (3-15 کاراکتر، حروف و عدد)
username.addEventListener('input', () => {
    const isValid = /^[a-zA-Z0-9]{3,15}$/.test(username.value);
    setValidationClass(username, isValid);
});

// 2. اعتبارسنجی نام کامل (حروف و فاصله، حداقل دو بخش)
fullName.addEventListener('input', () => {
    const nameParts = fullName.value.trim().split(' ');
    const isValid = /^[a-zA-Z\s]+$/.test(fullName.value) && nameParts.length >= 2 && nameParts[1] !== "";
    setValidationClass(fullName, isValid);
});

// 3. اعتبارسنجی ایمیل (فرمت استاندارد)
email.addEventListener('input', () => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
    setValidationClass(email, isValid);
});

// 4. اعتبارسنجی رمز عبور (بخش حساس پروژه)
password.addEventListener('input', () => {
    const val = password.value;
    const hasMinLength = val.length >= 8;
    const hasNumOrSymbol = /[\d!@#$%^&*]/.test(val);
    const notContainsName = !val.includes(fullName.value) || fullName.value === "";
    const notContainsEmail = !val.includes(email.value.split('@')[0]) || email.value === "";

    const isValid = hasMinLength && hasNumOrSymbol && notContainsName && notContainsEmail;
    setValidationClass(password, isValid);
});

// فعال/غیرفعال سازی دکمه ثبت نام
function checkFormValidity() {
    const inputs = [username, fullName, email, password];
    const allValid = inputs.every(input => input.classList.contains('success'));
    submitBtn.disabled = !allValid;
}

// مدیریت ثبت فرم و کنسول لاگ
form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log({
        username: username.value,
        fullName: fullName.value,
        email: email.value,
        password: "****" // رعایت امنیت در کنسول
    });
    alert("ثبت‌نام با موفقیت انجام شد!");
    form.reset();
    inputs.forEach(input => input.classList.remove('success'));
});
