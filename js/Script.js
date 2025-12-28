// تست اتصال: به محض باز شدن صفحه باید پیام 'Connected' رو توی کنسول ببینی
console.log("Connected to JavaScript File!");

document.addEventListener('input', (e) => {
    const input = e.target;
    
    // یوزرنیم (First-Name)
    if (input.id === 'First-Name') {
        const isValid = input.value.length >= 3 && input.value.length <= 15;
        applyStyle(input, isValid);
    }
    
    // نام کامل (Last-Name)
    if (input.id === 'Last-Name') {
        const isValid = input.value.trim().includes(' ') && input.value.length > 5;
        applyStyle(input, isValid);
    }
    
    // ایمیل (Email)
    if (input.id === 'Email') {
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
        applyStyle(input, isValid);
    }
    
    // پسورد (Password)
    if (input.id === 'Password') {
        const isValid = input.value.length >= 8 && /[\d!@#$%^&*]/.test(input.value);
        applyStyle(input, isValid);
    }
});

function applyStyle(element, isValid) {
    if (isValid) {
        element.style.setProperty('border', '3px solid #28a745', 'important');
        element.style.backgroundColor = '#f0fff4';
        element.dataset.valid = "true";
    } else {
        element.style.setProperty('border', '3px solid #dc3545', 'important');
        element.style.backgroundColor = '#fff5f5';
        element.dataset.valid = "false";
    }
    
    // چک کردن دکمه
    const btn = document.querySelector('.create-btn');
    const allInputs = document.querySelectorAll('input');
    const validCount = Array.from(allInputs).filter(i => i.dataset.valid === "true").length;
    
    if (validCount >= 4) {
        btn.disabled = false;
        btn.style.opacity = "1";
    } else {
        btn.disabled = true;
        btn.style.opacity = "0.5";
    }
}
