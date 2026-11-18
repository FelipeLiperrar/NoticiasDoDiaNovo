document.addEventListener("DOMContentLoaded", () => {
    carregarLikes();
    carregarComentarios();
});

const listaMaterias = ["materia-principal", "materia1", "materia2"];

//----------------------------------------------------------------
// SISTEMA DE CURTIDAS
//----------------------------------------------------------------

function carregarLikes(){

    const botoes = document.querySelectorAll(".btn-like");

    botoes.forEach((btn, index) => {
        const idMateria = listaMaterias[index];
        if (!idMateria) return;

        const totalLikes = parseInt(localStorage.getItem(`db_likes_${idMateria}`) || "0", 10);
        const jaCurtiu = localStorage.getItem(`db_userLike_${idMateria}`) === "true";

        const icone = btn.querySelector(".icone-coracao");
        const contador = btn.querySelector(".contador-likes");

        if (contador) contador.innerText = totalLikes;

        if (jaCurtiu && btn && icone) {
            btn.classList.add("curtido");
            icone.innerText = "❤️";
        }
    });
}

function gerenciarLikes(idMateria, btnClicado){
    let totalLikes = parseInt(localStorage.getItem(`db_likes_${idMateria}`) || "0", 10);
    let jaCurtiu = localStorage.getItem(`db_userLike_${idMateria}`) === "true";

    const icone = btnClicado.querySelector(".icone-coracao");
    const contador = btnClicado.querySelector(".contador-like");

    if(!jaCurtiu){
        totalLikes +=1;
        jaCurtiu = true;
        if (icone) icone.innerText = "❤️";
        btnClicado.classList.add("curtido");
    }else{
        totalLikes = Math.max(0, totalLikes -1);
        jaCurtiu = false;
        if (icone) icone.innerText = "🤍";
        btnClicado.classList.remove("curtido");
    }

    localStorage.setItem(`db_likes_${idMateria}`, totalLikes.toString());
    localStorage.setItem(`db_userLike_${idMateria}`, jaCurtiu.toString());

    if (contador) contador.innerText = totalLikes;
}

//comentarios

function carregarComentarios() {
    listaMaterias.forEach((idMateria) => {
        const blocoMateria = document.getElementById(idMateria);
        if(!blocoMateria) return;
        
        const containerLista = blocoMateria.querySelector(".lista-comentarios");
        const chaveBanco = `db_comentarios_${idMateria}`;
        const listaComentarios = JSON.parse(localStorage.getItem(chaveBanco) || "[]")

        desenharComentarios(containerLista, listaComentarios);
    });
}

function salvarComentario(idMateria, formElement){

    const inputAutor = formElement.querySelector(".input-autor");
    const inputTexto = formElement.querySelector(".input-texto");

    const autor = inputAutor.value.trim();
    const texto = inputTexto.value.trim();

    if(autor === "" || texto === "") return;

    const chaveBanco = `db_comentarios_${idMateria}`;
    const listaComentarios = JSON.parse(localStorage.getItem(chaveBanco) || "[]")

    const novoComentario = {
        autor: autor,
        texto: texto,
        hora: new Date().toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"}),
    };

    listaComentarios.unshift(novoComentario);

    localStorage.setItem(chaveBanco, JSON.stringify(listaComentarios));

    inputAutor.value = "";
    inputTexto.value = "";

    const blocoMateria = formElement.closeset(".materia-completa");
    const containerLista = blocoMateria.querySelector(".lista-comentarios")

}

function desenharComentarios(container, lista){
    if(!container) return;

    container.innerHTML = "";

    if(lista.length === 0){
        container.innerHTML = '<span class="tempo-comentario">Seja o primeiro a comentar!</span>'
        return;
    }

    lista.forEach((item) => {
        const card = document.createElement("div");
        card.classList.add("item-comentario");

        const strongAutor = document.createElement("strong");
        strongAutor.textContent = item.autor;

        const pTexto = document.createElement("p");
        pTexto.textContent = item.texto;

        const spanHora = document.createElement("span");
        spanHora.classList.add("tempo-comentario");
        spanHora.textContent = 'às ${item.hora}';

        card.append(strongAutor, pTexto, spanHora);
        container.appendChild(card);
    });
}


//troca de tema
function trocarTema(){
    const corpo = document.body;
    const icone = document.getElementById("icone-tema")

    corpo.classList.toggle("darkTheme");

    if(corpo.classList.contains("darkTheme")){
        icone.innerText = "☀︎"; 
    }else{
        icone.innerText = "⏾";
    }
}
