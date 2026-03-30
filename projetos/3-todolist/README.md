# 📝 To Do List

Aplicação de lista de tarefas desenvolvida com React e TypeScript, com foco em componentização, gerenciamento de estado e persistência de dados.

---

## ✅ Funcionalidades

- Adicionar novas tarefas
- Remover tarefas
- Editar tarefas existentes
- Marcar tarefas como concluídas
- Filtrar tarefas por: todas, pendentes e concluídas
- Persistência de dados com localStorage (as tarefas são salvas mesmo ao fechar o navegador)
- Validação para impedir adição de tarefas vazias

---

## 🚀 Tecnologias

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- CSS puro

---

## 🧠 Conceitos praticados

- `useState` com arrays de objetos tipados
- `useEffect` com dependências
- `useRef` para foco automático no input
- Props simples e props de função entre componentes
- Componentização (`App` + `TaskItem`)
- Métodos de array: `.map()`, `.filter()`, `.findIndex()`
- Spread operator para atualizações imutáveis
- Lazy initialization no `useState` para carregar o localStorage
- Union types no TypeScript

---

## ⚙️ Como rodar o projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) instalado
- [Git](https://git-scm.com/) instalado

### Passos

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/todo-list.git

# Entre na pasta do projeto
cd todo-list

# Instale as dependências
npm install

# Rode o projeto
npm run dev
```

Acesse [http://localhost:5173](http://localhost:5173/) no seu navegador.

---

## 📁 Estrutura de arquivos

```
src/
├── App.tsx
├── App.css
└── components/
    ├── TaskItem.tsx
    └── TaskItem.css
```

---

## 👨‍💻 Autor

Feito por **Vicente Ramos**
[LinkedIn](https://linkedin.com/in/seu-perfil) - https://www.linkedin.com/in/vicente-ramos9/
[GitHub](https://github.com/seu-usuario) - https://github.com/vicenteprf
