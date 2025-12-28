// انتخاب المان‌ها دقیقاً بر اساس IDهای کدی که زدی
const firstName = document.getElementById('First-Name'); // یوزرنیم
const lastName = document.getElementById('Last-Name');   // نام کامل
const email = document.getElementById('Email');
const password = document.getElementById('Password');
const submitBtn = document.querySelector('.create-btn');

// تابع تغییر استایل (رنگ قرمز و سبز)
function applyStyle(element, isValid) {
    if (isValid) {
        element.style.borderColor = "#28a745"; // سبز
        element.style.boxShadow = "0 0 5px rgba(40, 167, 69, 0.5)";
        element.classList.add('valid');
        element.classList.remove('invalid');
    } else {
        element.style.borderColor = "#dc3545"; // قرمز
        element.style.boxShadow = "0 0 5px rgba(220, 53, 69, 0.5)";
        element.classList.add('invalid');
        element.classList.remove('valid');
    }
    checkForm();
}

// ۱. فیلد اول (Username - طبق فایل پروژه ۳ تا ۱۵ کاراکتر)
firstName.addEventListener('input', () => {
    const isValid = /^[a-zA-Z0-9]{3,15}$/.test(firstName.value);
    applyStyle(firstName, isValid);
});

// ۲. فیلد دوم (Full Name - حروف و فاصله)
lastName.addEventListener('input', () => {
    const value = lastName.value.trim();
    const isValid = /^[a-zA-Z\s]+$/.test(value) && value.includes(' ');
    applyStyle(lastName, isValid);
});

// ۳. ایمیل
email.addEventListener('input', () => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
    applyStyle(email, isValid);
});

// ۴. پسورد (حداقل ۸ کاراکتر + عدد/سمبل + عدم وجود اسم و ایمیل)
password.addEventListener('input', () => {
    const val = password.value;
    const nameVal = lastName.value.toLowerCase();
    const emailPrefix = email.value.split('@')[0].toLowerCase();

    const isLong = val.length >= 8;
    const hasSpecial = /[\d!@#$%^&*]/.test(val);
    const noName = nameVal === "" || !val.toLowerCase().includes(nameVal);
    const noEmail = emailPrefix === "" || !val.toLowerCase().includes(emailPrefix);

    applyStyle(password, isLong && hasSpecial && noName && noEmail);
});

// فعال/غیرفعال کردن دکمه
function checkForm() {
    const allValid = document.querySelectorAll('.valid').length === 4;
    if (allValid) {
        submitBtn.disabled = false;
        submitBtn.style.opacity = "1";
        submitBtn.style.cursor = "pointer";
    } else {
        submitBtn.disabled = true;
        submitBtn.style.opacity = "0.5";
        submitBtn.style.cursor = "not-allowed";
    }
            }
