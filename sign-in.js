const signInForm = document.querySelector('form')
const signInButton = document.querySelector('button')

signInButton.addEventListener('click', function (e) {
    e.preventDefault()

    const prePayload = new FormData(signInForm)
    const username = prePayload.get('username')
    const password = prePayload.get('password')

    const storedPassword = localStorage.getItem(username)

    if (storedPassword && storedPassword === password) {
        alert('Sign in successful')
        // Redirect to the main.html page after successful sign-in
        window.location.href = 'main.html'
    } else {
        alert('Sign in failed')
        // Handle sign in errors, display an error message
}
})