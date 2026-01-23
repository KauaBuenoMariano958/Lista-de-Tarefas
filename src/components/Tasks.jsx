import { CheckIcon, ChevronRight, Trash } from "lucide-react"; // Corrigido: Trash em vez de TrashIcon
import { useNavigate } from "react-router-dom";
import { ListTodo } from "lucide-react";

function Tasks({ tasks, onTaskClick, onDeleteTask }) { // Recebe "tasks" (plural)
    const navigate = useNavigate()//vai me levar até as paginas de detalhes das tasks
  

    function onSeeDetailsClick(task) {//Função de navegação de paginas atraves de query params ao clicar nos botões
        const query = new URLSearchParams()
        query.set("title", task.title)
        query.set("description", task.description)
        navigate(`/task?${query.toString()}`)
    }


    return( 
    <ul className="space-y-4 p-6 bg-slate-200 rounded-md shadow">
        <div className="flex items-center space-x-2 ">
            <ListTodo size={20} className="text-slate-600" />
            <h2 className="text-lg font-semibold text-slate-700">Tarefas</h2>
        </div>
        {tasks.map((task) => ( 
            <li key={task.id} className="flex gap-2">
                <button  
                  onClick={() => onTaskClick(task.id)}
                  className={`w-full p-3 rounded-md text-left flex items-center gap-2 ${
                    task.isCompleted ? "bg-green-400" : "bg-slate-400"
                  } hover:opacity-90 transition-opacity`}
                >
                  {task.isCompleted && <CheckIcon /> }
                  {task.title}
                </button>
                <button onClick={() => onSeeDetailsClick(task)} //adicionando a função de navegação ao clicar no botão
                  className="bg-slate-600 p-3 rounded-md text-white hover:bg-slate-700"
                  title="Detalhes"
                >
                  <ChevronRight size={20} />
                </button>
                <button 
                  onClick={() => onDeleteTask(task.id)} 
                  className="bg-red-600 p-3 rounded-md text-white hover:bg-red-700"
                  title="Excluir"
                >
                  <Trash size={20} />
                </button>
            </li>
        ))}
    </ul>
  )
}

export default Tasks;