const todos = {
    equipamentos: JSON.parse(localStorage.getItem('equipamentos')) || [],
    veiculos: JSON.parse(localStorage.getItem('veiculos')) || [],
    dispositivos: JSON.parse(localStorage.getItem('dispositivos')) || []
}

function salvarItem() {
    localStorage.setItem('equipamentos', JSON.stringify(todos.equipamentos))
    localStorage.setItem('veiculos', JSON.stringify(todos.veiculos))
    localStorage.setItem('dispositivos', JSON.stringify(todos.dispositivos))
    atualizarDashboard()
}

function atualizarDashboard() {
    // Limpa as listas existentes 
    document.querySelectorAll('.list').forEach(list => {list.innerHTML = ''})
    //itera sobre os tipos (equipamentos, veiculos , dispositivos)
    for (const tipo in todos) {
        //para cada tipo, usa-se a função forEach que contém todos os itens desse tipo
        todos[tipo].forEach(item => createItem(item, tipo))
        //para cada item no array, chama a função createItem, criando um novo elemento dom e o add na lista
    }
}

function createItem(nome, tipo) {
    const itemBox = document.createElement('div')
    itemBox.classList.add('item')

    const inputItem = document.createElement('input')
    inputItem.type = 'text'
    inputItem.disabled = true
    inputItem.value = nome
    inputItem.classList.add('item-input')

    const editBtn = document.createElement('button')
    editBtn.classList.add('edit')
    editBtn.innerText = 'Editar'
    editBtn.addEventListener('click', () => editItem(inputItem, nome, tipo))

    const removeBtn = document.createElement('button')
    removeBtn.classList.add('remove')
    removeBtn.innerText = 'Remover'
    removeBtn.addEventListener('click', () => removeItem(itemBox, nome, tipo))

    const list = document.querySelector(`#${tipo} .list`)
    list.append(itemBox)
    itemBox.append(inputItem)
    itemBox.append(editBtn)
    itemBox.append(removeBtn)
}

function addItem(nome, tipo) {
    if (nome.trim() !== '' && !todos[tipo].includes(nome)) {
        todos[tipo].push(nome)
        salvarItem() 
    }
}

function editItem(input, item, tipo) {
    input.disabled = !input.disabled
    //muda o estado do input (bool)

    if (!input.disabled) {
        //verifica se está habilitado, se sim procura o indice do item correspondente ao tipo
        const index = todos[tipo].indexOf(item)
        //add um evento de perda de foco no input, se o user clicar fora, o codigo dentro da função é executado
        input.addEventListener('blur', () => {
            const newValue = input.value.trim()
            //recebe o novo valor (e usa trim pra remover espaços em branco)
            if (newValue !== '') {
                todos[tipo][index] = newValue
                //se o novo valor nao for vazio, atualiza o item correspondente ao tipo e salva as alterações
                salvarItem()
            } else {
                input.value = item // Reverte a ação se o valor estiver vazio (caso coloque um valor vazio, volta pro conteudo original)
            }
            input.disabled = true
            //desabilita o campo
        });
    }
}

function removeItem(itemBox, item, tipo) {
    const index = todos[tipo].indexOf(item)
    //se ele encontra o item o indexOf retorna a sua posição, se não retorna -1 (sempre)(aparentemente é uma maneira muito comum de verificação em um array)
    if (index > -1) {
        todos[tipo].splice(index, 1)
        salvarItem()
        itemBox.remove()
    }
}

document.querySelectorAll('.section').forEach(section => {
    const input = section.querySelector('.input')
    const addButton = section.querySelector('.add')
    const tipo = section.id
    // Obtém o ID da seção como tipo


    todos[tipo].forEach(Item => createItem(Item, tipo))

    addButton.addEventListener('click', () => {
        addItem(input.value, tipo)
        input.value = ''
        input.focus()
    })

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            addItem(input.value, tipo)
            input.value = ''
            input.focus()
        }
    });
});

document.getElementById('logoutButton').addEventListener('click', () => { window.location.href = 'login.html'})
//botão para sair (voltar a pagina de login)

window.onload = atualizarDashboard
//assim que a pagina for carregada, a função é chamada de forma automatica