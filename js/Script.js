// انتخاب دقیق المان‌ها بر اساس ID های پروژه تو
const username = document.getElementById('username');
const fullName = document.getElementById('full-name'); // توی کد تو full-name است
const email = document.getElementById('email');
const password = document.getElementById('password');
const submitBtn = document.querySelector('.create-btn'); // دکمه با کلاس create-btn

// تابع اصلی برای رنگی کردن فیلدها
function updateStyle(element, isValid) {
    if (isValid) {
        element.style.border = "2px solid #28a745"; // سبز
        element.style.backgroundColor = "#f0fff4";
        element.classList.add('valid');
        element.classList.remove('invalid');
    } else {
        element.style.border = "2px solid #dc3545"; // قرمز
        element.style.backgroundColor = "#fff5f5";
        element.classList.add('invalid');
        element.classList.remove('valid');
    }
    checkForm();
}

// 1. یوزرنیم: 3 تا 15 کاراکتر، فقط حروف و عدد
username.addEventListener('input', () => {
    const isValid = /^[a-zA-Z0-9]{3,15}$/.test(username.value);
    updateStyle(username, isValid);
});

// 2. نام کامل: فقط حروف و فاصله، حداقل دو بخش
fullName.addEventListener('input', () => {
    const value = fullName.value.trim();
    const isValid = /^[a-zA-Z\s]+$/.test(value) && value.includes(' ');
    updateStyle(fullName, isValid);
});

// 3. ایمیل: فرمت استاندارد
email.addEventListener('input', () => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
    updateStyle(email, isValid);
});

// 4. پسورد: شرط‌های پیچیده
password.addEventListener('input', () => {
    const val = password.value;
    const nameVal = fullName.value.toLowerCase();
    const emailPrefix = email.value.split('@')[0].toLowerCase();

    const isLong = val.length >= 8;
    const hasSpecial = /[\d!@#$%^&*]/.test(val);
    const noName = nameVal === "" || !val.toLowerCase().includes(nameVal);
    const noEmail = emailPrefix === "" || !val.toLowerCase().includes(emailPrefix);

    updateStyle(password, isLong && hasSpecial && noName && noEmail);
});

// فعال/غیرفعال کردن دکمه
function checkForm() {
    const allValid = document.querySelectorAll('.valid').length === 4;
    submitBtn.disabled = !allValid;
    submitBtn.style.opacity = allValid ? "1" : "0.5";
    submitBtn.style.cursor = allValid ? "pointer" : "not-allowed";
}
