// Pegando o botão do menu hamburguer pelo ID
const btnMenu = document.getElementById("btn-menu");

// Pegando o elemento do menu de navegação pelo ID
const navMenu = document.getElementById("nav-menu");

// Adicionando um evento de clique no botão do menu
btnMenu.addEventListener("click", () => {
  // Alterna a classe "active" no menu — se não tem, adiciona; se tem, remove
  // O toggle() retorna true se adicionou, false se removeu
  const isOpen = navMenu.classList.toggle("active");

  // Atualiza o atributo aria-expanded com true ou false
  // Isso informa leitores de tela se o menu está aberto ou fechado
  btnMenu.setAttribute("aria-expanded", isOpen);

  // O nome do botão acompanha a ação que ele vai fazer
  btnMenu.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");

  // Troca o ícone dependendo do estado do menu:
  // Se abriu (isOpen = true) → mostra o X (fa-xmark)
  // Se fechou (isOpen = false) → mostra o hamburguer (fa-bars)
  btnMenu.querySelector("i").className = isOpen
    ? "fa-solid fa-xmark"
    : "fa-solid fa-bars";
});

// Pegando todos os links dentro do menu de navegação
// querySelectorAll retorna uma lista com todos os elementos encontrados
document.querySelectorAll("#nav-menu a").forEach((link) => {
  // Para cada link, adiciona um evento de clique
  link.addEventListener("click", () => {
    // Remove a classe "active" do menu, fechando ele
    navMenu.classList.remove("active");

    // Atualiza o aria-expanded para false, pois o menu foi fechado
    btnMenu.setAttribute("aria-expanded", false);
    btnMenu.setAttribute("aria-label", "Abrir menu");

    // Volta o ícone para o hamburguer ao fechar o menu pelo link
    btnMenu.querySelector("i").className = "fa-solid fa-bars";
  });
});

// Função usada pelos observadores: adiciona ou remove a classe "show"
// entries é a lista de elementos observados que mudaram de estado
function alternarShow(entries) {
  entries.forEach((entry) => {
    // Se o elemento está visível na tela...
    if (entry.isIntersecting) {
      // Adiciona a classe "show", que aplica a animação de entrada
      entry.target.classList.add("show");
    } else {
      // Se saiu da tela, remove a classe "show"
      // Isso faz o efeito de saída e a animação acontece de novo ao voltar
      // (o movimento fica no filho da seção, ver .secao > * no style.css)
      entry.target.classList.remove("show");
    }
  });
}

// Criando um observador de interseção
// Ele "observa" elementos e detecta quando eles entram ou saem da tela
// threshold define o quanto do elemento precisa estar visível para
// disparar a animação (20% nesse caso)
const myObserver = new IntersectionObserver(alternarShow, { threshold: 0.2 });

// Observador das seções de habilidades e projetos, para a animação começar
// mais tarde.
// rootMargin encolhe a "tela" que o observer considera: com -30% embaixo,
// a seção só conta como visível quando o topo dela passa de 70% da altura
// da tela. Usei rootMargin em vez de um threshold maior porque no celular
// a seção é mais alta que a tela e nunca chegaria a 50% visível.
const observerTardio = new IntersectionObserver(alternarShow, {
  rootMargin: "0px 0px -30% 0px",
});


// Pegando todos os elementos com a classe "secao"
const secao = document.querySelectorAll(".secao");

// Mandando o observador certo monitorar cada seção
// (o "Sobre mim" não tem a classe "secao" e é observado à parte; usa o
// observador tardio para a entrada acontecer mais perto do meio da tela)
observerTardio.observe(document.getElementById("sobre"));

// (a entrada da habilidades é controlada no atualizarEmpilhamento, mais
// abaixo, pela opção "entrarEm")
secao.forEach((element) => {
  if (element.id === "habilidades") {
    return;
  } else if (element.id === "container-projetos") {
    observerTardio.observe(element);
  } else {
    myObserver.observe(element);
  }
});

// ============================================================
// EFEITO DE EMPILHAMENTO (o site todo)
// Sobre mim → Habilidades → Projetos → Contato
// (a apresentação fica de fora: é uma seção normal, que rola para cima)
// Cada seção trava no lugar (position: sticky, classe .empilhar no CSS).
// Conforme a pessoa rola, ela vai encolhendo e sumindo enquanto a próxima
// sobe por cima, como se a tela não estivesse saindo do lugar.
// Quem trava é o CSS (sticky): o navegador faz isso junto com a rolagem,
// sem atraso. O JS só calcula números e passa para o CSS como variáveis.
// ============================================================

// O footer ocupa a tela inteira com o card de contato no meio. Usamos o
// card (e não o footer) para medir, assim projetos some junto com a
// chegada do conteúdo, e não com a chegada da borda vazia do footer.
const cardFooter = document.querySelector(".footer-card-centered");

// Cada item: a seção que sai e a que chega por cima dela
const pilha = [
  {
    secao: document.querySelector(".empilhar-sobre"),
    proxima: document.getElementById("habilidades"),
    // Só começa a sumir depois que travou no meio da tela (assim ele fica
    // 100% nítido quando trava) e termina de sumir quando o topo da
    // habilidades chega em 15% da tela, junto com a entrada dela
    comecarAoTravar: true,
    fimEm: 0.15,
    // Segura o card parado e nítido por 40% da altura da tela de rolagem
    // antes de começar a sumir (a habilidades tem margin-top: 40vh no CSS
    // para chegar mais tarde)
    segurar: 0.4,
  },
  {
    secao: document.getElementById("habilidades"),
    proxima: document.getElementById("container-projetos"),
    // Mesmo efeito do "Sobre mim": fica parada e nítida por 40% da altura
    // da tela depois de travar (projetos tem margin-top: 40vh no CSS) e
    // termina de sumir quando o topo de projetos chega em 40% da tela
    comecarAoTravar: true,
    fimEm: 0.4,
    segurar: 0.4,
    // O conteúdo entra quando o topo da seção passa de 15% da altura da
    // tela (assim ela aparece já ocupando a tela). Numa tela muito alta,
    // onde ela trava antes disso, entra no momento em que trava.
    entrarEm: 0.15,
  },
  {
    secao: document.getElementById("container-projetos"),
    proxima: cardFooter,
  },
];

// Limita um número entre 0 e 1
function entreZeroEUm(valor) {
  return Math.min(Math.max(valor, 0), 1);
}

// Topo de um elemento na tela, descontando o encolhimento (scale) do
// empilhamento, que muda o getBoundingClientRect. Usa os valores que o
// próprio empilhamento gravou nele (escala = 1 - 0.15 * progresso).
function topoSemEscala(elemento) {
  const progresso = parseFloat(elemento.style.getPropertyValue("--progresso"));
  const origemY = parseFloat(elemento.style.getPropertyValue("--origem-y"));
  const encolheu = (origemY || 0) * 0.15 * (progresso || 0);
  return elemento.getBoundingClientRect().top - encolheu;
}

// Posição original (sem o sticky) de cada seção na página. Fica guardada
// e só é medida de novo quando a tela muda de tamanho, porque desligar o
// sticky para medir em todo quadro da rolagem deixaria a página lenta.
function medirPosicoes() {
  pilha.forEach((item) => {
    item.secao.style.position = "static";
    item.posicaoOriginal = posicaoNaPagina(item.secao);
    item.secao.style.position = "";
  });
}

function atualizarEmpilhamento() {
  const alturaTela = window.innerHeight;

  pilha.forEach((item) => {
    const { secao, proxima, comecarAoTravar, fimEm } = item;
    const segurar = item.segurar || 0;
    const distancia = item.distancia || 0.6;
    // offsetHeight não muda com o transform, então a conta fica estável
    const altura = secao.offsetHeight;
    const sobra = alturaTela - altura;

    // Seção mais alta que a tela: trava com o fim encostado embaixo (o topo
    // fica "acima" da tela) e encolhe a partir do meio da parte visível.
    // Seção menor que a tela: trava centralizada e encolhe pelo próprio meio.
    // Math.min: a seção nunca trava mais para baixo do que a posição
    // original dela. Sem isso, numa tela alta, a apresentação (que já começa
    // perto do topo) era "empurrada" para o meio e ficava por cima do resto.
    const centralizada = sobra < 0 ? sobra : sobra / 2;
    const topoFixo = Math.min(centralizada, item.posicaoOriginal);
    const origemY = sobra < 0 ? altura - alturaTela / 2 : altura / 2;

    secao.style.setProperty("--topo-fixo", `${topoFixo}px`);
    secao.style.setProperty("--origem-y", `${origemY}px`);

    // Onde estará o topo da próxima seção no momento em que esta trava:
    // topo travado + altura desta seção + espaço (gap e margin-top da
    // próxima) entre as duas
    const gap = parseFloat(getComputedStyle(secao.parentElement).rowGap) || 0;
    const margemProxima = parseFloat(getComputedStyle(proxima).marginTop) || 0;
    const travou = topoFixo + altura + gap + margemProxima;

    let inicio;
    let fim;

    if (comecarAoTravar) {
      // Começa a sumir só depois de "segurar" a seção parada por um tempo
      inicio = travou - alturaTela * segurar;
      // Termina quando o topo da próxima chega em "fimEm" da tela. Se a
      // próxima trava antes disso (tela muito alta), termina quando ela trava,
      // senão esta seção ficaria meio apagada no fundo para sempre.
      const sobraProxima = alturaTela - proxima.offsetHeight;
      const proximaTrava = sobraProxima > 0 ? sobraProxima / 2 + 1 : -Infinity;
      fim = Math.max(alturaTela * fimEm, proximaTrava);
    } else {
      // Começa a sumir quando a próxima seção entra por baixo da tela. Numa
      // tela alta, a próxima já pode estar visível no começo: então o
      // efeito só começa quando a pessoa rola (Math.min), e não já carrega
      // a página com a seção apagada.
      inicio = Math.min(alturaTela, travou);
      // termina quando o topo da próxima chega em 40% da tela (ou, se a
      // seção começou a sumir mais acima, um pouco depois do início)
      fim = Math.min(alturaTela * (1 - distancia), inicio - 100);
    }

    const topoProxima = topoSemEscala(proxima);
    const progresso = entreZeroEUm((inicio - topoProxima) / (inicio - fim));

    secao.style.setProperty("--progresso", progresso);

    if (item.entrarEm) {
      const topo = topoSemEscala(secao);
      const limite = Math.max(alturaTela * item.entrarEm, topoFixo) + 2;

      if (topo <= limite) {
        secao.classList.add("show");
      } else if (topo > limite + alturaTela * 0.1) {
        // folga de 10% da tela para não ficar piscando no limite
        secao.classList.remove("show");
      }
    }
  });
}

// requestAnimationFrame faz a conta no máximo uma vez por quadro da tela,
// em vez de dezenas de vezes por segundo durante a rolagem
let quadroAgendado = false;

function agendarEmpilhamento() {
  if (quadroAgendado) return;
  quadroAgendado = true;

  requestAnimationFrame(() => {
    atualizarEmpilhamento();
    quadroAgendado = false;
  });
}

// Mede as posições e atualiza (no início e quando o tamanho da tela muda)
function recalcularEmpilhamento() {
  medirPosicoes();
  atualizarEmpilhamento();
}

// passive: true avisa o navegador que não vamos bloquear a rolagem
window.addEventListener("scroll", agendarEmpilhamento, { passive: true });
window.addEventListener("resize", recalcularEmpilhamento);
// a fonte e as imagens mudam a altura das seções quando terminam de carregar
window.addEventListener("load", recalcularEmpilhamento);
document.fonts.ready.then(recalcularEmpilhamento);
recalcularEmpilhamento();

// ============================================================
// LINKS DO MENU (#sobre, #container-projetos...)
// Com o sticky, uma seção que já passou fica "travada" na tela (invisível).
// Se a pessoa clica em "Sobre mim" lá embaixo, o navegador acha que a seção
// já está na tela e não rola. Então calculamos a posição "de verdade" dela
// (sem o sticky) e rolamos até lá.
// ============================================================

// Soma o offsetTop de cada elemento pai até chegar no topo da página
function posicaoNaPagina(elemento) {
  let topo = 0;
  let atual = elemento;

  while (atual) {
    topo += atual.offsetTop;
    atual = atual.offsetParent;
  }

  return topo;
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (evento) => {
    const alvo = document.querySelector(link.getAttribute("href"));
    if (!alvo) return;

    evento.preventDefault();

    let topo;
    const bloco = alvo.closest(".empilhar");

    if (alvo.id === "container-apresentacao") {
      // logo / Início: volta para o topo da página
      topo = 0;
    } else if (bloco) {
      // Seção com empilhamento: rola até o momento exato em que ela trava
      // (posição original menos onde ela trava), assim ela aparece parada
      // e nítida, e não já começando a sair.
      // Desliga o sticky só durante a conta, para medir a posição original
      bloco.style.position = "static";
      const posicaoOriginal = posicaoNaPagina(bloco);
      bloco.style.position = "";

      // Se a seção é mais alta que a tela (topo fixo negativo), vai para o
      // começo dela; senão, para o ponto em que ela trava centralizada.
      const topoFixo = parseFloat(bloco.style.getPropertyValue("--topo-fixo"));
      topo = posicaoOriginal - Math.max(topoFixo || 0, 0);
    } else {
      const margem = parseFloat(getComputedStyle(alvo).scrollMarginTop) || 0;
      topo = posicaoNaPagina(alvo) - margem;
    }

    // "instant" pula direto para a seção. Com "smooth" a página rolava
    // passando por todas as seções do meio, e o efeito de empilhamento
    // mostrava cada uma aparecendo e sumindo no caminho até o destino.
    // (o html tem scroll-behavior: smooth no CSS; "instant" ignora isso)
    window.scrollTo({ top: topo, behavior: "instant" });

    // Atualiza o empilhamento na hora, sem esperar o próximo quadro.
    // Senão, por um instante, as seções do meio aparecem com os valores
    // antigos (ex.: projetos piscando por cima do footer).
    atualizarEmpilhamento();

    // Acessibilidade: leva também o foco do teclado para a seção (ela tem
    // tabindex="-1" no HTML). Sem isso, quem navega com Tab ou leitor de
    // tela continuaria no menu. preventScroll evita uma segunda rolagem.
    alvo.focus({ preventScroll: true });

    // Atualiza o endereço (#sobre...) sem pular a página
    history.replaceState(null, "", link.getAttribute("href"));
  });
});
