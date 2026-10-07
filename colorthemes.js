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
