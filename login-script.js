// Simple Login Handler
function handleLogin(event) {
    event.preventDefault();
    
    const mobileNumber = document.getElementById('mobileNumber').value;
    const password = document.getElementById('password').value;
    
    if (!mobileNumber || !password) {
        showError('Please enter both mobile number and password');
        return;
    }
    
    if (mobileNumber.length !== 10) {
        showError('Mobile number must be 10 digits');
        return;
    }
    
    if (password.length < 4) {
        showError('Password must be at least 4 characters');
        return;
    }
    
    console.log('Login:', { mobileNumber });
    showSuccess('Login successful!');
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

// Toggle Password Visibility
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.querySelector('.toggle-password');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.textContent = '🙈';
    } else {
        passwordInput.type = 'password';
        toggleBtn.textContent = '👁️';
    }
}

// Google Login Handler
function handleGoogleLogin() {
    console.log('Google login initiated');
    showSuccess('Logging in with Google...');
    
    setTimeout(() => {
        showSuccess('Successfully logged in with Google!');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }, 800);
}

// Gmail Login Handler
function handleGmailLogin() {
    console.log('Gmail login initiated');
    showSuccess('Logging in with Gmail...');
    
    setTimeout(() => {
        showSuccess('Successfully logged in with Gmail!');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }, 800);
}

// Modal Functions
function showSuccess(message) {
    const modal = document.getElementById('successModal');
    const messageEl = document.getElementById('successMessage');
    
    messageEl.textContent = message;
    modal.classList.remove('hidden');
}

function showError(message) {
    const modal = document.getElementById('errorModal');
    const messageEl = document.getElementById('errorMessage');
    
    messageEl.textContent = message;
    modal.classList.remove('hidden');
}

function closeModal() {
    document.getElementById('successModal').classList.add('hidden');
}

function closeErrorModal() {
    document.getElementById('errorModal').classList.add('hidden');
}
