// ۱. انتخاب تمام فیلدها
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const password = document.getElementById('password');
const submitBtn = document.getElementById('submitBtn');

// ۲. انتخاب راهنماهای پسورد برای تغییر رنگ
const ruleName = document.getElementById('ruleName');
const ruleLength = document.getElementById('ruleLength');
const ruleSymbol = document.getElementById('ruleSymbol');

function validateForm() {
    const fNameValue = firstName.value.trim();
    const lNameValue = lastName.value.trim();
    const emailValue = email.value.trim();
    const passValue = password.value;

    // الف) چک کردن نام و نام خانوادگی
    const isNameValid = fNameValue.length >= 2 && lNameValue.length >= 2;

    // ب) چک کردن فرمت ایمیل با Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(emailValue);

    // ج) چک کردن قوانین پسورد (بخش حساس پروژه)
    const hasLength = passValue.length >= 8;
    const hasSymbol = /[0-9!@#$%^&*]/.test(passValue);
    
    // شرط: پسورد نباید شامل نام یا فامیل یا بخش اول ایمیل باشد
    const noNameInPass = !(
        (fNameValue && passValue.toLowerCase().includes(fNameValue.toLowerCase())) ||
        (lNameValue && passValue.toLowerCase().includes(lNameValue.toLowerCase())) ||
        (emailValue && passValue.toLowerCase().includes(emailValue.split('@')[0].toLowerCase()))
    );

    // تغییر رنگ لحظه‌ای راهنماهای پسورد (تیک‌های زیر پسورد)
    ruleLength.style.color = hasLength ? "#28a745" : "#a0aec0";
    ruleSymbol.style.color = hasSymbol ? "#28a745" : "#a0aec0";
    ruleName.style.color = noNameInPass ? "#28a745" : "#a0aec0";

    // د) فعال یا غیرفعال کردن دکمه نهایی
    if (isNameValid && isEmailValid && hasLength && hasSymbol && noNameInPass) {
        submitBtn.disabled = false;
        submitBtn.style.opacity = "1";
    } else {
        submitBtn.disabled = true;
        submitBtn.style.opacity = "0.6";
    }
}

// ۳. گوش دادن به تایپ کاربر در تمام فیلدها
[firstName, lastName, email, password].forEach(input => {
    input.addEventListener('input', validateForm);
});

// ۴. عملیات بعد از زدن دکمه ثبت‌نام
document.getElementById('registrationForm').addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("ثبت‌نام با موفقیت انجام شد: ", {
        fullName: firstName.value + " " + lastName.value,
        email: email.value,
        password: "****" 
    });
    alert("تبریک! فرم با موفقیت ارسال شد و اطلاعات در کنسول لاگ شد.");
});
