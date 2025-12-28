const form = document.getElementById('regForm');
const passInput = document.getElementById('password');
const emailInput = document.getElementById('email');
const fnameInput = document.getElementById('firstName');
const lnameInput = document.getElementById('lastName');
const submitBtn = document.getElementById('submitBtn');

const validations = {
    length: document.getElementById('v-len'),
    symbol: document.getElementById('v-symbol'),
    nameEmail: document.getElementById('v-name')
};

function validateForm() {
    const pass = passInput.value;
    const email = emailInput.value;
    const fname = fnameInput.value.toLowerCase();
    const lname = lnameInput.value.toLowerCase();

    // ۱. چک کردن طول (حداقل ۸)
    const isLenValid = pass.length >= 8;
    validations.length.className = isLenValid ? 'valid' : '';

    // ۲. چک کردن عدد یا نماد
    const isSymbolValid = /[0-9!@#$%^&*]/.test(pass);
    validations.symbol.className = isSymbolValid ? 'valid' : '';

    // ۳. عدم وجود نام یا ایمیل در پسورد
    const containsNameEmail = (fname && pass.toLowerCase().includes(fname)) || 
                             (lname && pass.toLowerCase().includes(lname)) || 
                             (email && pass.toLowerCase().includes(email.split('@')[0]));
    
    const isNameEmailValid = !containsNameEmail && pass !== "";
    validations.nameEmail.className = isNameEmailValid ? 'valid' : '';

    // فعال سازی دکمه
    const isAllValid = isLenValid && isSymbolValid && isNameEmailValid && email.includes('@');
    submitBtn.disabled = !isAllValid;
}

// گوش دادن به تغییرات ورودی‌ها
[passInput, emailInput, fnameInput, lnameInput].forEach(input => {
    input.addEventListener('input', validateForm);
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log({
        username: fnameInput.value + "123", // مثال برای یوزرنیم
        fullName: `${fnameInput.value} ${lnameInput.value}`,
        email: emailInput.value,
        password: "*******"
    });
    alert("Registration Successful! Check the Console.");
});
