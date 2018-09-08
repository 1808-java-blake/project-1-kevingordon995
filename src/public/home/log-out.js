function logout(event) {
    event.preventDefault();
    fetch(`http://localhost:3000/employees/logout`, {
        method: 'POST'
    }).then(() =>
    window.location = 'http://localhost:3000/login-page/login.html')
}