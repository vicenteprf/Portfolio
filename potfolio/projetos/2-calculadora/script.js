// Chamando o input para guardar os valores na variável campoResultado.
const campoResultado = document.getElementById("container-resultado-final");

// Função para guardar e acrescentar valores na variável.
function adicionarValor(valor) {
  campoResultado.value += valor;
}

// chama os botões de numero 0 a 9, e guarda os valores na variável campoResultado.
for (let i = 0; i <= 9; i++) {
  document.getElementById("num" + i).addEventListener("click", () => {
    adicionarValor(i);

    // Verificação de divisão por zero.
    const valorAtual = campoResultado.value;
    const ultimoCaractere = valorAtual.slice(-2);

    if (ultimoCaractere === "/0") {
      campoResultado.value = alert("Não e possível dividir por zero");
      campoResultado.value = "";
    }
  });
}

// chama o botão apagar, e limpa o campoResultado.
const botaoLimpar = document.getElementById("apagar");
botaoLimpar.addEventListener("click", () => {
  campoResultado.value = "";
});

// Função para não permetir dois operadores seguidos.
function adicionarOperador(operador) {
  const valorAtual = campoResultado.value;
  const ultimoCaractere = valorAtual.slice(-1);
  const operadores = ["+", "-", "*", "/"];

  if (valorAtual === "") return;

  if (operadores.includes(ultimoCaractere)) return;

  adicionarValor(operador);
}

// Chama os botões das equações somar, subtrair, multiplicação e divisao.
const equacaoSomar = document.getElementById("soma");
equacaoSomar.addEventListener("click", () => {
  adicionarOperador("+");
});

const equacaoSubtrair = document.getElementById("subtracao");
equacaoSubtrair.addEventListener("click", () => {
  adicionarOperador("-");
});

const equacaoMultiplicacao = document.getElementById("multiplicacao");
equacaoMultiplicacao.addEventListener("click", () => {
  adicionarOperador("*");
});

const equacaoDivisao = document.getElementById("divisao");
equacaoDivisao.addEventListener("click", () => {
  adicionarOperador("/");
});

// chama o botão de virgula.
const botaoVirgula = document.getElementById("virgula");
botaoVirgula.addEventListener("click", () => {
  adicionarValor(".");
});

// botao de igualdade, quando e clicado ele resolve a operação matemática.
const botaoIgualdade = document.getElementById("Resultado");
botaoIgualdade.addEventListener("click", () => {
  try {
    campoResultado.value = eval(campoResultado.value);
  } catch (e) {
    campoResultado.value = "Error";
  }
});
