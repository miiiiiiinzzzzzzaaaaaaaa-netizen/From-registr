// ۱. انتخاب المان‌هایی که باهاشون کار داریم
const form = document.getElementById('registrationForm');
const username = document.getElementById('username');
const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const password = document.getElementById('password');
const submitBtn = document.getElementById('submitBtn');

// ۲. تابع اصلی برای چک کردن کل فرم
function validateForm() {
const isUValid = checkUsername();
const isNValid = checkFullName();
const isEValid = checkEmail();
const isPValid = checkPassword();

// دکمه ثبت‌نام فقط وقتی روشن میشه که همه فیلدها تیک سبز بگیرن
submitBtn.disabled = !(isUValid && isNValid && isEValid && isPValid);
}

// چک کردن نام کاربری (۳ تا ۱۵ کاراکتر، فقط عدد و حروف انگلیسی)
function checkUsername() {
const val = username.value.trim();
const regex = /^[a-zA-Z0-9]+$/;
let error = "";

if (val.length < 3 || val.length > 15) error = "باید بین ۳ تا ۱۵ کاراکتر باشد";
else if (!regex.test(val)) error = "فقط حروف و اعداد انگلیسی مجاز است";

return showResult(username, 'usernameError', error);
}

// چک کردن نام کامل (حداقل دو بخش و فقط حروف)
function checkFullName() {
const val = fullName.value.trim();
const parts = val.split(' ').filter(p => p.length > 0);
const regex = /^[a-zA-Z\s]+$/;
let error = "";

if (!regex.test(val)) error = "فقط حروف انگلیسی مجاز است";
else if (parts.length < 2) error = "لطفاً نام و نام خانوادگی کامل را وارد کنید";

return showResult(fullName, 'fullNameError', error);
}

// چک کردن ایمیل با فرمت استاندارد
function checkEmail() {
const val = email.value.trim();
const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let error = regex.test(val) ? "" : "ایمیل معتبر نیست";
return showResult(email, 'emailError', error);
}

// چک کردن پسورد (سخت‌ترین بخش!)
function checkPassword() {
const val = password.value;
const nameVal = fullName.value.toLowerCase();
const emailPrefix = email.value.split('@')[0].toLowerCase();
let error = "";

if (val.length < 8) error = "حداقل باید ۸ کاراکتر باشد";
else if (!/[0-9!@#$%^&*]/.test(val)) error = "باید شامل حداقل یک عدد یا نماد باشد";
else if (nameVal && val.toLowerCase().includes(nameVal)) error = "رمز نباید شامل نام شما باشد";
else if (emailPrefix && val.toLowerCase().includes(emailPrefix)) error = "رمز نباید شامل ایمیل شما باشد";

return showResult(password, 'passwordError', error);
}

// تابع کمکی برای نمایش خطا و تغییر رنگ کادرها
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

// گوش کردن به تایپ کردن کاربر (Live Validation)
[username, fullName, email, password].forEach(el => {
el.addEventListener('input', validateForm);
});

// وقتی فرم با موفقیت ثبت میشه
form.addEventListener('submit', (e) => {
e.preventDefault(); // جلوگیری از پریدن صفحه
console.log("اطلاعات ثبت شد:", {
user: username.value,
name: fullName.value,
email: email.value
});
document.getElementById('successMessage').style.display = 'block';
form.reset();
submitBtn.disabled = true;
});