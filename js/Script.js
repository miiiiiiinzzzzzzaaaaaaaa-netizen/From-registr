// انتخاب المان‌های مورد نیاز
const signupBtn = document.querySelector('.btn-signup');
const signinBtn = document.querySelector('.btn-signin');
const formTitle = document.querySelector('.form-header h2');
const submitBtn = document.querySelector('.submit-btn');

// عملکرد دکمه Sign In
signinBtn.addEventListener('click', () => {
    // فعال کردن استایل دکمه
    signinBtn.classList.add('active');
    signupBtn.classList.remove('active');
    
    // تغییر متن فرم (در حالت Sign In معمولاً فیلدهای کمتری نیاز است)
    formTitle.innerText = "Welcome Back";
    submitBtn.innerText = "Login";
    
    // در اینجا می‌توانید فیلدهای اضافه مثل نام کوچک و بزرگ را مخفی کنید
    // document.querySelectorAll('.input-group')[1].style.display = 'none';
});

// عملکرد دکمه Sign Up
signupBtn.addEventListener('click', () => {
    signupBtn.classList.add('active');
    signinBtn.classList.remove('active');
    
    formTitle.innerText = "SimpleFlow";
    submitBtn.innerText = "Register";
});

// مدیریت ارسال فرم
const form = document.querySelector('.signup-form');
form.addEventListener('submit', (e) => {
    e.preventDefault(); // جلوگیری از رفرش شدن صفحه
    
    const username = document.querySelector('input[placeholder="Enter username"]').value;
    const email = document.querySelector('input[placeholder="Enter email"]').value;

    if(username === "" || email === "") {
        alert("لطفاً تمامی فیلدها را پر کنید!");
    } else {
        console.log("اطلاعات ارسال شد:", { username, email });
        alert("ثبت‌نام با موفقیت انجام شد.");
    }
});
