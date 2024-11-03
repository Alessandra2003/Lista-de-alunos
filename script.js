const tbody = document.getElementById("tbody")
const inputlistadealunos = document.getElementById("inputlistadealunos");
const inputnome = document.getElementById("inputnome");
const inputemail = document.getElementById("inputemail");
const inputidade=document.getElementById("inputidade")
const buttonenviar = document.getElementById("buttonenviar")

async function buscaralunos() {
    const req = await fetch("http://localhost:7000/alunos")
    const alunos = await req.json()
    console.log(alunos)
    renderisardados(alunos)
}

function renderisardados(alunos) {
    console.log(alunos)
    alunos.map(aluno => {
        tbody.innerHTML += `
         <tr>
            <td class="${aluno.id}">${aluno.nome}</td> 
            <td class="${aluno.id}">${aluno.idade}</td>
            <td class="${aluno.id}">${aluno.email}</td>
            <td><button id="${aluno.id}" onclick="colocarInput(${aluno.id})">EDITAR</button></td>
            <td><button id="${aluno.id}" onclick="apagar(${aluno.id})">APAGAR</button></td>
          </tr>`
    })

}
async function enviardado() {
    const req = await fetch("http://localhost:7000/enviaralunos", {
        method: 'POST', 
        headers: {'Content-type': 'Application/JSON'},
        body: JSON.stringify({
            nome: inputnome.value,
            idade: inputidade.value,
            email: inputemail.value
        })
    })


}
buscaralunos()
buttonenviar.addEventListener("click",()=>{
    enviardado()
    alert('Dados Enviados! Recarregue a página')
})
function colocarInput(id){
    const elementosDaLinha = document.getElementsByClassName(`${id}`)
    console.log(elementosDaLinha)
    const botaoConcluido = document.getElementById(`${id}`)
    console.log(botaoConcluido)
    botaoConcluido.textContent = "CONCLUIDO"
     for(let i = 0; i < elementosDaLinha.length; i++){
        const input = document.createElement('input')
        input.id = `input_${i}`
        console.log(i)
         if(elementosDaLinha[i] != undefined){
            elementosDaLinha[i].replaceChild(input,elementosDaLinha[i].firstChild)
         }

     }
     botaoConcluido.removeAttribute("onclick")
     botaoConcluido.addEventListener('click',botaoClicado=>{
        const nome = document.getElementById("input_0")
        const idade = document.getElementById("input_1")
        const email = document.getElementById("input_2")
        const id = botaoClicado.target.id
        //alert('1111111111111')
        console.log(nome.value,idade.value,email.value,id)
        editar(nome.value,idade.value,email.value,id)
        alert('Dados Editados! Recarregue a página')
        //location.reload()
     })
    
}

async function editar(nome,idade,email,id) {
     const req = await fetch("http://localhost:7000/editaralunos", {
         method: 'PUT', 
         headers: {'Content-type': 'Application/JSON'},
         body: JSON.stringify({
             nome: nome,
             idade: idade,
             email: email,
             id: id
         })
     })
     
}
async function apagar(id) {
    const req = await fetch("http://localhost:7000/deletaralunos", {
        method: 'DELETE', 
        headers: {'Content-type': 'Application/JSON'},
        body: JSON.stringify({
            id:id
        })
    })
    alert('Dados Apagados! Recarregue a página')
}

