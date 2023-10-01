const signUpForm = document.querySelector('form')
const signUpButton = document.querySelector('button')

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId)
    errorElement.textContent = message
}

function clearErrors() {
    showError('username-error', '')
    showError('name-error', '')
    showError('password-error', '')
    showError('re-enter-password-error', '')
}

signUpButton.addEventListener('click', function (e) {
    e.preventDefault()
    clearErrors()

    const prePayload = new FormData(signUpForm)
    const username = prePayload.get('username')
    const name = prePayload.get('name')
    const password = prePayload.get('password')
    const reEnterPassword = prePayload.get('re-enter-password')
    const termsCheckbox = document.getElementById('checkbox')

    let hasError = false

    if (!username) {
        showError('username-error', 'Username is required.')
        hasError = true
    }

    if (!password) {
        showError('password-error', 'Password is required.')
        hasError = true
    }

    if (!reEnterPassword) {
        showError('re-enter-password-error', 'Please re-enter your password.')
        hasError = true
    }

    if (hasError) {
        return
    }

    if (password !== reEnterPassword) {
        showError('re-enter-password-error', 'Passwords do not match.')
        return
    }

    if (!termsCheckbox.checked) {
        alert('Please accept the terms and conditions')
        return
    }

    if (localStorage.getItem(username)) {
        alert('Username already exists')
        return
    }

    localStorage.setItem(username, password)
    alert('Registration successful')
    // Redirect to the Sign In page
    window.location.href = '/sign-in.html'
})