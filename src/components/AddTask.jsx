import { useState } from "react";
import InputDescription from "./InputDescription";
import InputTitle from "./InputTitle";
import { CircleCheckBig } from "lucide-react";


function AddTask({ onAddTaskSubmit }) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    return (
        <div className="space-y-4 p-6 bg-slate-200 rounded-md shadow flex flex-col">
            <div className="flex items-center space-x-2">
                <CircleCheckBig size={20} className="text-slate-600" />
                <h2 className="text-lg font-semibold text-slate-700">Adicionar Tarefas</h2>
            </div>

            <InputTitle 
                value={title}
                onChange={(event) => setTitle(event.target.value)}//Sempre que precisar pegar dados do input
                placeholder="Digite o nome da tarefa"
            />
            
            <InputDescription 
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Digite a descrição da tarefa"
            />

            <button onClick={() => {
                if (!title.trim() || !description.trim()){//Verificando se inputs estão em preenchidos
                    return alert("Preencha o título e a descrição da tarefa")
                }
                onAddTaskSubmit(title, description);
                setTitle("");
                setDescription("")
                }} className="bg-slate-500 text-white px-4 p-2 rounded-md font-medium">Adicionar</button>
        </div>
    )
}

export default AddTask;
