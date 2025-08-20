const inputs = document.querySelectorAll('.otp-inputs input');
inputs.forEach((input, index) => {
    input.addEventListener('input', () => {
        if (input.value.length === 1 && index < inputs.length - 1) {
            inputs[index + 1].focus();
        }
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === "Backspace" && input.value === "" && index > 0) {
            inputs[index - 1].focus();
        }
    });
});

function verifyOTP() {
    const otp = Array.from(inputs).map(input => input.value).join('');
    const messageEl = document.getElementById("message");

    if (otp.length === 6) {
        if (otp === "123456") {
            messageEl.textContent = "OTP Verified Successfully!";
            messageEl.className = "message success";
        } else {
            messageEl.textContent = "Invalid OTP. Please try again.";
            messageEl.className = "message error";
        }
    } else {
        messageEl.textContent = "Please enter all 6 digits.";
        messageEl.className = "message error";
    }
}