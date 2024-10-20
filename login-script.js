document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault()

    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    // Recupera usuários do Local Storage
    const users = JSON.parse(localStorage.getItem('users')) || []
    
    const user = users.find(user => user.username === username && user.password === password)

    if (user) {
        window.location.href = user.role === 'funcionario' ? 'dashboard.html' : 'gerenciamento.html'
    } else {
        alert('Usuário ou senha inválidos!')
    }
});