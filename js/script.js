const btnMenu = document.getElementById("btn-menu");
const navMenu = document.getElementById("nav-menu");

btnMenu.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("active");
  btnMenu.setAttribute("aria-expanded", isOpen);
  btnMenu.querySelector("i").className = isOpen
    ? "fa-solid fa-xmark"
    : "fa-solid fa-bars";
});

document.querySelectorAll("#nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    btnMenu.setAttribute("aria-expanded", false);
    btnMenu.querySelector("i").className = "fa-solid fa-bars";
  });
});

const myObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
});

const secao = document.querySelectorAll(".secao");

secao.forEach((Element) => myObserver.observe(Element));

const btnSobre = document.querySelector("#btn-sobre");

btnSobre.addEventListener("click", function (e) {
  e.preventDefault();

  const section = document.querySelector("#sobre");

  section.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
});

const btnProjetos = document.querySelector("#btn-projetos");

btnProjetos.addEventListener("click", function (e) {
  e.preventDefault();

  const section = document.querySelector("#container-projetos");

  section.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
});
