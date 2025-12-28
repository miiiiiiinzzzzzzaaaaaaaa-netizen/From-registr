document.addEventListener('DOMContentLoaded', () => {
    // ۱. انتخاب دقیق المان‌ها بر اساس کدی که در HTML زدی
    const firstName = document.getElementById('First-Name');
    const lastName = document.getElementById('Last-Name');
    const email = document.getElementById('Email');
    const password = document.getElementById('Password');
    const submitBtn = document.querySelector('.create-btn');

    // تابع برای اعمال رنگ قرمز و سبز (بدون نیاز به تغییر CSS)
    function applyValidationStyle(element, isValid) {
        if (isValid) {
            element.style.border = "2px solid #28a745"; // رنگ سبز
            element.style.backgroundColor = "#f0fff4";
            element.classList.add('valid-field');
            element.classList.remove('invalid-field');
        } else {
            element.style.border = "2px solid #dc3545"; // رنگ قرمز
            element.style.backgroundColor = "#fff5f5";
            element.classList.add('invalid-field');
            element.classList.remove('valid-field');
        }
        checkAllFields();
    }

    // ۲. اعتبارسنجی Username (فیلد First-Name تو)
    firstName.addEventListener('input', () => {
        const isValid = firstName.value.length >= 3 && firstName.value.length <= 15;
        applyValidationStyle(firstName, isValid);
    });

    // ۳. اعتبارسنجی Full Name (فیلد Last-Name تو - باید دو بخش باشه)
    lastName.addEventListener('input', () => {
        const value = lastName.value.trim();
        const isValid = value.includes(' ') && value.length > 5;
        applyValidationStyle(lastName, isValid);
    });

    // ۴. اعتبارسنجی Email
    email.addEventListener('input', () => {
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
        applyValidationStyle(email, isValid);
    });

    // ۵. اعتبارسنجی Password (حداقل ۸ کاراکتر + شامل عدد یا سمبل)
    password.addEventListener('input', () => {
        const val = password.value;
        const hasMinLength = val.length >= 8;
        const hasSymbolOrNum = /[\d!@#$%^&*]/.test(val);
        // شرط پروژه: پسورد نباید شامل نام کاربر باشد
        const notContainsName = !val.toLowerCase().includes(lastName.value.toLowerCase()) || lastName.value === "";

        applyValidationStyle(password, hasMinLength && hasSymbolOrNum && notContainsName);
    });

    // ۶. بررسی نهایی برای فعال کردن دکمه
    function checkAllFields() {
        const allValid = document.querySelectorAll('.valid-field').length === 4;
        submitBtn.disabled = !allValid;
        submitBtn.style.opacity = allValid ? "1" : "0.5";
        submitBtn.style.cursor = allValid ? "pointer" : "not-allowed";
    }
});
