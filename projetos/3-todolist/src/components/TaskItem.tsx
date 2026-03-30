import "./Taskitem.css";

type TaksItemProps = {
  concluida: boolean;
  id: number;
  tarefa: string;
  handleConcluida: (id: number) => void;
  handleEditTask: (id: number, tarefa: string) => void;
  handleDelete: (id: number) => void;
};

export default function TaskItem({
  concluida,
  id,
  tarefa,
  handleConcluida,
  handleEditTask,
  handleDelete,
}: TaksItemProps) {
  return (
    <div className="task-card">
      <input
        type="checkbox"
        checked={concluida}
        onClick={() => handleConcluida(id)}
      />
      <span className={concluida ? "task-text done" : "task-text"}>
        {tarefa}
      </span>
      <div className="task-actions">
        <button
          className="btn-editar"
          onClick={() => handleEditTask(id, tarefa)}
        >
          Editar
        </button>
        <button className="btn-remover" onClick={() => handleDelete(id)}>
          Remover
        </button>
      </div>
    </div>
  );
}
