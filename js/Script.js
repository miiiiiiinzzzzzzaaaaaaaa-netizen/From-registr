// انتخاب المان‌ها بر اساس ID های موجود در HTML تو
const username = document.getElementById('username');
const full_name = document.getElementById('full-name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const submitBtn = document.querySelector('button');

// تابع اصلی برای اضافه و کم کردن کلاس‌های رنگی
function validateField(element, condition) {
    if (condition) {
        element.classList.add('valid');
        element.classList.remove('invalid');
    } else {
        element.classList.add('invalid');
        element.classList.remove('valid');
    }
    checkFormStatus();
}

// ۱. اعتبارسنچی نام کاربری (طبق فایل پروژه: ۳ تا ۱۵ کاراکتر، فقط حروف و عدد)
username.addEventListener('input', () => {
    const isValid = /^[a-zA-Z0-9]{3,15}$/.test(username.value);
    validateField(username, isValid);
});

// ۲. اعتبارسنجی نام کامل (فقط حروف و فاصله، حداقل دو بخش)
full_name.addEventListener('input', () => {
    const value = full_name.value.trim();
    const isValid = /^[a-zA-Z\s]+$/.test(value) && value.includes(' ');
    validateField(full_name, isValid);
});

// ۳. اعتبارسنجی ایمیل (فرمت استاندارد)
email.addEventListener('input', () => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
    validateField(email, isValid);
});

// ۴. اعتبارسنجی رمز عبور (شرط‌های پیچیده پروژه)
password.addEventListener('input', () => {
    const val = password.value;
    const namePart = full_name.value.toLowerCase();
    const emailPart = email.value.toLowerCase().split('@')[0];

    const isLongEnough = val.length >= 8;
    const hasSpecial = /[\d!@#$%^&*]/.test(val);
    const noName = namePart === "" || !val.toLowerCase().includes(namePart);
    const noEmail = emailPart === "" || !val.toLowerCase().includes(emailPart);

    validateField(password, isLongEnough && hasSpecial && noName && noEmail);
});

// چک کردن نهایی برای فعال شدن دکمه ثبت‌نام
function checkFormStatus() {
    const allValid = document.querySelectorAll('.valid').length === 4;
    submitBtn.disabled = !allValid;
}
