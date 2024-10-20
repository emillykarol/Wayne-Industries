function atualizarDashboard() {
    const quantidadeEquipamentos = (JSON.parse(localStorage.getItem('equipamentos')) || []).length
    const quantidadeVeiculos = (JSON.parse(localStorage.getItem('veiculos')) || []).length
    const quantidadeDispositivos = (JSON.parse(localStorage.getItem('dispositivos')) || []).length
    //obtenção da quantidade de itens de cada recurso, se não tiver retorna 0

    document.getElementById('equipamentos-disponiveis').textContent = quantidadeEquipamentos
    document.getElementById('veiculos-disponiveis').textContent = quantidadeVeiculos
    document.getElementById('dispositivos-disponiveis').textContent = quantidadeDispositivos
    //atualiza os conteudos de cada com a quantidade correspondente ao id

    const users = JSON.parse(localStorage.getItem('users')) || []
    //obtenção da lista de usuarios no local storage, se não houver retorna um array vazio
    const quantidadeFuncionarios = users.filter(user => user.role === 'funcionario').length
    const quantidadeGerentes = users.filter(user => user.role === 'gerente').length
    const quantidadeAdmin = users.filter(user => user.role === 'admin').length
    //metodo filter para fazer a contagem de users pra cada cargo
    //ele cria um novo array com elementos que passam na condição/expressão fornecida por uma função
    //usa uma função de callback pra filtrar de acordo com o cargo, tendo uma lista com os usuarios de cada cargo e, usando length, tem-se a quantidade da lista

    document.getElementById('funcionarios-ativos').textContent = quantidadeFuncionarios
    document.getElementById('gerentes-ativos').textContent = quantidadeGerentes
    document.getElementById('administradores-ativos').textContent = quantidadeAdmin
    //atualiza o conteudo, mostrando a quantidade em cada cargo
}


document.getElementById('logoutButton').addEventListener('click', () => { window.location.href = 'login.html'})

window.onload = atualizarDashboard