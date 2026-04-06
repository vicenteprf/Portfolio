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

    // Volta o ícone para o hamburguer ao fechar o menu pelo link
    btnMenu.querySelector("i").className = "fa-solid fa-bars";
  });
});

// Criando um observador de interseção
// Ele "observa" elementos e detecta quando eles entram ou saem da tela
// O segundo argumento configura o observer — threshold define o quanto
// do elemento precisa estar visível para disparar a animação (20% nesse caso)
const myObserver = new IntersectionObserver(
  (entries) => {
    // entries é a lista de elementos que estão sendo observados
    entries.forEach((entry) => {
      // Se o elemento está visível na tela...
      if (entry.isIntersecting) {
        // Adiciona a classe "show", que aplica a animação de entrada
        entry.target.classList.add("show");
      } else {
        // Se saiu da tela, remove a classe "show"
        // Isso faz a animação acontecer de novo ao rolar a página
        entry.target.classList.remove("show");
      }
    });
  },
  { threshold: 0.2 },
);

// Pegando todos os elementos com a classe "secao"
const secao = document.querySelectorAll(".secao");

// Mandando o observador monitorar cada um dos elementos encontrados
secao.forEach((element) => myObserver.observe(element));
