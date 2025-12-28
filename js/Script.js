// اطمینان از لود شدن کامل DOM
document.addEventListener('DOMContentLoaded', () => {
    const firstName = document.getElementById('First-Name');
    const lastName = document.getElementById('Last-Name');
    const email = document.getElementById('Email');
    const password = document.getElementById('Password');
    const submitBtn = document.querySelector('.create-btn');

    function validate(element, condition) {
        if (condition) {
            element.style.border = "2px solid #28a745"; // سبز
            element.classList.add('valid');
            element.classList.remove('invalid');
        } else {
            element.style.border = "2px solid #dc3545"; // قرمز
            element.classList.add('invalid');
            element.classList.remove('valid');
        }
        
        // چک کردن برای فعال شدن دکمه ثبت نام
        const allValid = document.querySelectorAll('.valid').length === 4;
        submitBtn.disabled = !allValid;
        submitBtn.style.opacity = allValid ? "1" : "0.5";
    }

    // اعتبارسنجی بر اساس قوانین فایل پروژه
    firstName.addEventListener('input', () => {
        const isOK = firstName.value.length >= 3 && firstName.value.length <= 15;
        validate(firstName, isOK);
    });

    lastName.addEventListener('input', () => {
        const isOK = lastName.value.trim().includes(' ') && /^[a-zA-Z\s]+$/.test(lastName.value);
        validate(lastName, isOK);
    });

    email.addEventListener('input', () => {
        const isOK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
        validate(email, isOK);
    });

    password.addEventListener('input', () => {
        const val = password.value;
        const isLong = val.length >= 8;
        const hasSpecial = /[\d!@#$%^&*]/.test(val);
        const noName = !val.includes(lastName.value) || lastName.value === "";
        validate(password, isLong && hasSpecial && noName);
    });
});
