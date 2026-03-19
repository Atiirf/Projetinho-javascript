const nomeItemCadastro = document.querySelector("#nomeItemCadastro");
const quantidadeItensCadastro = document.querySelector("#quantidadeItensCadastro");
const criticoCheckbox = document.querySelector("#selecionaItemCritico");
const botaoCadastrar = document.querySelector("#botaoCadastrarItem");
const formulario = document.querySelector(".cadastroItem form");
const listaItens = document.querySelector("#listaItens")
const totalElement = document.querySelector(".mostraTotal");
const radioTodos = document.querySelector("#exibirTodos");
const radioCriticos = document.querySelector("#exibirCriticos")

let inventario = [
    { nome: "Galão de combustível", quantidade: 4, critico: true },
    { nome: "Macarrão espacial", quantidade: 30, critico: false },
    { nome: "Kit de manutenção da nave", quantidade: 5, critico: true }
];
const adicionarItem = (envio) =>{
    
    envio.preventDefault();
    const novoItem = {
        nome: nomeItemCadastro.value,
        quantidade: Number(quantidadeItensCadastro.value),
        critico: criticoCheckbox.checked
    }

    let itemExistente = false;
    for (let i in inventario) {
        if (inventario[i].nome.toLowerCase() === novoItem.nome.toLowerCase()) {
            inventario[i].quantidade += novoItem.quantidade;
            itemExistente = true;
            break;
        }
    }

    if(!itemExistente){    
        inventario.push(novoItem);
    }

    if(!itemExistente){
        console.log("Item adicionado:", novoItem);
    }
    else(
        console.log("Item atualizado:", inventario.find(item => item.nome.toLowerCase() === novoItem.nome.toLowerCase()))
    )

    console.log("Inventário:", inventario);

    listarItens();
    quantidadeTotal();

    nomeItemCadastro.value = '';
    quantidadeItensCadastro.value = '';
    criticoCheckbox.checked = false;
}

const listarItens = () => {

    let filtrar;

        if(radioCriticos.checked){
            filtrar = inventario.filter(item => item.critico);
    }
    else{
            filtrar = inventario;
    }


    linhas = filtrar.map(item => {
    if (item.critico){
        return `<li class="item-critico">Item: ${item.nome} | Quantidade: ${item.quantidade}</li>`
    }
    else{
        return `<li class="item-normal">Item: ${item.nome} | Quantidade: ${item.quantidade}</li>`
    }
    
});
    listaItens.innerHTML = linhas.join('');
}

const quantidadeTotal = () =>{
    const soma = inventario.reduce((total, item)=>{
     return total + item.quantidade;
    }, 0)
    totalElement.innerHTML = `Quantidade total de itens: ${soma}`
}

quantidadeTotal();
listarItens();
formulario.addEventListener('submit', adicionarItem);
radioTodos.addEventListener('change', listarItens);
radioCriticos.addEventListener('change', listarItens); 

