import { useState, useRef, useEffect } from "react";
import TaskItem from "./components/TaskItem";
import "./App.css";

type Tarefas = {
  concluida: boolean;
  id: number;
  tarefa: string;
};

type Filter = "todas" | "pendentes" | "concluidas";

export default function App() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [taskItem, setTaskItem] = useState<Tarefas[]>(() => {
    // Carrega a lista no localStorage
    const taksSalvas = localStorage.getItem("@Atividades");

    return taksSalvas ? JSON.parse(taksSalvas) : [];
  });
  const [inputValue, setInputValue] = useState("");
  const [nextId, setNextId] = useState(1);
  const [editTask, setEditTask] = useState({
    enabled: false,
    concluida: false,
    id: nextId,
    tarefa: "",
  });
  const [filter, setFilter] = useState<Filter>("todas");

  const tarefasFiltradas = taskItem.filter((task) => {
    if (filter === "todas") {
      return true;
    }

    if (filter === "pendentes") {
      return task.concluida === false;
    }

    if (filter === "concluidas") {
      return task.concluida === true;
    }
  });

  useEffect(() => {
    // Salva a lista no localStorage
    localStorage.setItem("@Atividades", JSON.stringify(taskItem));
  }, [taskItem]);

  function handleRegister() {
    if (!inputValue) {
      return;
    }

    if (editTask.enabled) {
      handleSalveTask();
      return;
    }

    setTaskItem((tarefas) => [
      ...tarefas,
      {
        concluida: false,
        id: nextId,
        tarefa: inputValue,
      },
    ]);
    setNextId((n) => n + 1);
    setInputValue("");
  }

  function handleDelete(id: number) {
    const novaTaskItem = taskItem.filter((task) => task.id !== id);
    setTaskItem(novaTaskItem);
  }

  function handleEditTask(concluida: boolean, id: number, item: string) {
    inputRef.current?.focus();
    setInputValue(item);
    setEditTask({
      enabled: true,
      concluida: concluida,
      id: id,
      tarefa: "",
    });
  }

  function handleSalveTask() {
    const findIndexTask = taskItem.findIndex((task) => task.id === editTask.id);
    const allTask = [...taskItem];

    allTask[findIndexTask] = {
      concluida: editTask.concluida,
      id: editTask.id,
      tarefa: inputValue,
    };
    setTaskItem(allTask);

    setEditTask({
      enabled: false,
      concluida: editTask.concluida,
      id: nextId,
      tarefa: "",
    });
    setInputValue("");
  }

  function handleConcluida(id: number) {
    const atualizada = taskItem.map((task) =>
      task.id === id ? { ...task, concluida: !task.concluida } : task,
    );
    setTaskItem(atualizada);
  }

  return (
    <div className="container">
      <h1 className="todo-titulo">Minhas Tarefas</h1>
      <div className="input-btnAdd">
        <input
          placeholder="Digite uma nova tarefa..."
          className="todo-input"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          ref={inputRef}
        />
        <button type="button" onClick={handleRegister} className="btn-add">
          {editTask.enabled ? "Adicionar" : "Salvar"}
        </button>
      </div>
      <div className="filter-row">
        <button
          className={filter === "todas" ? "btn-filter active" : "btn-filter"}
          onClick={() => setFilter("todas")}
        >
          Todas
        </button>
        <button
          className={
            filter === "pendentes" ? "btn-filter active" : "btn-filter"
          }
          onClick={() => setFilter("pendentes")}
        >
          Pendentes
        </button>
        <button
          className={
            filter === "concluidas" ? "btn-filter active" : "btn-filter"
          }
          onClick={() => setFilter("concluidas")}
        >
          concluídas
        </button>
      </div>
      <ul className="task-list">
        {tarefasFiltradas.map((item) => (
          <TaskItem
            key={item.id}
            concluida={item.concluida}
            id={item.id}
            tarefa={item.tarefa}
            handleConcluida={handleConcluida}
            handleDelete={handleDelete}
            handleEditTask={() =>
              handleEditTask(item.concluida, item.id, item.tarefa)
            }
          />
        ))}
      </ul>
    </div>
  );
}
