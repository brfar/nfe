/*eslint-disable*/

var botaoMostrarEnviados = document.getElementById("hideShow");
var botaoOcultarEnviados = document.getElementById("btnOculto");
var listaNotasEnviadas = document.getElementById("esconde_e_mostra");
var quantidade = document.getElementsByClassName("caralho");
var elementos = document.querySelectorAll(".att");

// Função click to copy
function copy(that) {
  var inp = document.createElement('input');
  document.body.appendChild(inp)
  inp.value = that.textContent
  inp.select();
  document.execCommand('copy', false);
  inp.remove();
}

botaoMostrarEnviados.addEventListener("click", function (e) {
  listaNotasEnviadas.classList.remove("fadeOut");
  listaNotasEnviadas.classList.remove("esconder");
  listaNotasEnviadas.classList.add("animated", "fadeIn");
  botaoMostrarEnviados.classList.add("hide"); // remove botão quando clicado
});

botaoOcultarEnviados.addEventListener("click", function () {
  botaoMostrarEnviados.classList.add("animated", "fadeIn");
  listaNotasEnviadas.classList.remove("fadeIn");
  listaNotasEnviadas.classList.add("fadeOut");
  botaoMostrarEnviados.classList.remove("hide");
  window.setTimeout(function () {
    listaNotasEnviadas.classList.add("esconder");
  }, 700);
});

if (quantidade.length === 0) {
  botaoMostrarEnviados.classList.add("hide");
}

elementos.forEach(function (elemento) {
  elemento.addEventListener("click", function () {
    elemento.classList.add("animated", "flash");
    window.setTimeout(function () {
      elemento.classList.remove("flash");
    }, 900);
  })
});

var keepList = document.querySelectorAll('.keepList');
keepList.forEach(function (e) {
  e.addEventListener("click", function(){
    listaNotasEnviadas.classList.remove("esconder");
  });
});