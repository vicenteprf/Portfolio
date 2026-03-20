const input = document.getElementById("inputTarefa") as HTMLInputElement;
const lista = document.getElementById("atividades") as HTMLUListElement;
const form = document.getElementById("form") as HTMLFormElement;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const resultado: string = input.value;

  if (resultado.trim() !== "") {
    // 1 - Criando elementos
    const li = document.createElement("li");
    const botaoRemover = document.createElement("button");
    const botaoEditar = document.createElement("button");
    const icon = document.createElement("i");
    const iconEdit = document.createElement("i");
    const span = document.createElement("span");
    const inputCheckbox = document.createElement("input");
    const divBotoes = document.createElement("div");

    // 2 - Montando elementos
    icon.className = "fa-solid fa-trash";
    iconEdit.className = "fa-solid fa-pencil";

    inputCheckbox.type = "checkbox";
    li.classList.add("atividades-li");
    botaoRemover.classList.add("btn-remover");
    botaoEditar.classList.add("btn-edit");
    divBotoes.classList.add("container-botoes");

    span.textContent = resultado;
    span.setAttribute("data-text", resultado);

    // Div que recebe os botões editar e remover
    divBotoes.appendChild(botaoEditar);
    divBotoes.appendChild(botaoRemover);
    // botaoEditar.appendChild()
    botaoEditar.appendChild(iconEdit);
    // Botão recebe ícone
    botaoRemover.appendChild(icon);
    // li recebe input checkbox
    li.appendChild(inputCheckbox);
    // li recebe texto
    li.appendChild(span);
    // lli recebe os botões editar e remover
    li.appendChild(divBotoes);

    // 3 - Renderizar
    lista.appendChild(li);

    // limpa input
    input.value = "";

    botaoEditar.addEventListener("click", () => {
      // Cria um input temporário com o texto atual
      const editText = document.createElement("input");
      editText.type = "text";
      editText.value = span.textContent || "";
      editText.classList.add("input-editar");

      // Substitui o span pelo input
      li.replaceChild(editText, span);

      // Foco no input
      editText.focus();

      // Salvar ao pressionar Enter
      editText.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          // Atualiza o span
          span.textContent = editText.value;
          // Volta o span para a lista
          li.replaceChild(span, editText);
        }
      });
    });

    // evento
    botaoRemover.addEventListener("click", () => {
      li.remove();
    });

    inputCheckbox.addEventListener("change", () => {
      if (inputCheckbox.checked) {
        span.classList.add("tarefa-concluida");
      } else {
        span.classList.remove("tarefa-concluida");
      }
    });
  }
});
