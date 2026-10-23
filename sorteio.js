const participantes = [];
let proximoId = 1;
let idEmEdicao = null;
let ultimoSorteadoId = null;

function adicionarParticipante(event) {
    event.preventDefault();
    const inputNome = document.getElementById("input_nome");
    const nome = inputNome.value.trim();

    if (!nome) {
        return;
    }

    if (idEmEdicao !== null) {
        // Modo de alteração: atualiza o participante selecionado
        const participante = participantes.find(p => p.id === idEmEdicao);
        if (participante) {
            participante.nome = nome;
        }
        cancelarEdicao();
    } else {
        // Modo normal: adiciona novo participante
        const obj = {
            id: proximoId++,
            nome: nome
        };
        participantes.push(obj);
        inputNome.value = "";
    }

    console.log(participantes);
    listar();
}

function listar(sorteadoId) {
    if (sorteadoId !== undefined) {
        ultimoSorteadoId = sorteadoId;
    }

    const tbody = document.getElementById("lista");
    tbody.innerHTML = '';

    if (participantes.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3">Nenhum participante</td></tr>';
        return;
    }

    participantes.forEach(p => {
        const tr = document.createElement("tr");   // <tr> <td> </td> <td> </td> <td> </td> </tr>
        if (p.id == ultimoSorteadoId) {
            tr.classList.add('sorteado', 'destaque');
        }
        if (p.id == idEmEdicao) {
            tr.classList.add('em-edicao');
        }
        tr.innerHTML = `
            <td>${p.id}</td>
            <td>${p.nome}</td>
            <td>
                <button type="button" onclick="alterar(${p.id})">Alterar ✏️</button>
                <button type="button" onclick="excluir(${p.id})">Excluir 🗑️</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function sortear() {
    if (participantes.length === 0) {
        alert("Nenhum participante cadastrado para sortear!");
        return;
    }
    const idx = Math.floor(Math.random() * participantes.length);
    const sorteado = participantes[idx];
    listar(sorteado.id);
}