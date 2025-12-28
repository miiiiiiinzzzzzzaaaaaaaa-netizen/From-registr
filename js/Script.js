const form = document.getElementById('registrationForm');
const inputs = document.querySelectorAll('input');
const submitBtn = document.getElementById('submitBtn');

const patterns = {
    username: /^[a-zA-Z0-9]{3,15}$/, // فقط حروف و عدد، ۳ تا ۱۵ کاراکتر
    fullName: /^[a-zA-Z\s]{2,}$/, // فقط حروف و فاصله
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // فرمت استاندارد ایمیل
};

function validate() {
    const vals = {
        user: document.getElementById('username').value,
        name: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        pass: document.getElementById('password').value
    };

    // ۱. چک کردن Username
    const isUserValid = patterns.username.test(vals.user);
    document.getElementById('username').className = isUserValid ? 'valid' : 'invalid';

    // ۲. چک کردن Full Name
    const isNameValid = isUserValid && vals.name.includes(' ') && patterns.fullName.test(vals.name);
    document.getElementById('fullName').className = isNameValid ? 'valid' : 'invalid';

    // ۳. چک کردن Email
    const isEmailValid = patterns.email.test(vals.email);
    document.getElementById('email').className = isEmailValid ? 'valid' : 'invalid';

    // ۴. چک کردن Password (بخش حساس پروژه)
    const hasLength = vals.pass.length >= 8;
    const hasSpecial = /[0-9!@#$%^&*]/.test(vals.pass);
    const noNameInPass = !vals.pass.toLowerCase().includes(vals.name.toLowerCase()) || vals.name === "";
    const noEmailInPass = !vals.pass.toLowerCase().includes(vals.email.split('@')[0].toLowerCase()) || vals.email === "";

    // تغییر رنگ راهنماهای پسورد
    document.getElementById('lenHint').style.color = hasLength ? 'green' : 'red';
    document.getElementById('numHint').style.color = hasSpecial ? 'green' : 'red';
    document.getElementById('nameHint').style.color = (noNameInPass && noEmailInPass) ? 'green' : 'red';

    const isPassValid = hasLength && hasSpecial && noNameInPass && noEmailInPass;
    document.getElementById('password').className = isPassValid ? 'valid' : 'invalid';

    // فعال/غیرفعال کردن دکمه ثبت نام
    submitBtn.disabled = !(isUserValid && isNameValid && isEmailValid && isPassValid);
}

// گوش دادن به تغییرات هر فیلد به صورت لحظه‌ای
inputs.forEach(input => {
    input.addEventListener('input', validate);
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("Success!", {
        username: inputs[0].value,
        fullName: inputs[1].value,
        email: inputs[2].value,
        password: "********"
    });
    alert("ثبت‌نام با موفقیت انجام شد! اطلاعات در کنسول لاگ شد.");
});
