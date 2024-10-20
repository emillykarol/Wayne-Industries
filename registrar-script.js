document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault() 

    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    const role = document.getElementById('role').value

    const users = JSON.parse(localStorage.getItem('users')) || []

    const userExists = users.some(user => user.username === username)

    if (userExists) {
        alert(`O nome de usuário "${username}" já está em uso. Por favor, escolha outro.`)
        return
    }

    users.push({
        name: name,
        email: email,
        username: username,
        password: password,
        role: role
    })


    localStorage.setItem('users', JSON.stringify(users))

    alert(`Usuário ${username} registrado com sucesso!`)
    window.location.href = 'login.html'
})