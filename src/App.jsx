import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import "./App.css";
import { useEffect, useState } from "react";
import {v4} from 'uuid'
import FilterTask from "./components/Filter";
import SearchTask from "./components/SearchTask";


function App() {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) || []);//Estou jogando as informações do LocalStorage para a tela
    const [search, setSearch] = useState(""); // Estado para pesquisa
    const [filter, setFilter] = useState("All"); // Estado para filtro
    const [sort, setSort] = useState(""); // Estado para ordenação


    // Função para filtrar e ordenar as tarefas
  const getFilteredAndSortedTasks = () => {
    let filteredTasks = tasks;
    
    // Aplicar filtro de pesquisa
    if (search) {
      filteredTasks = filteredTasks.filter(task =>
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        (task.description && task.description.toLowerCase().includes(search.toLowerCase()))
      );
    }

     // Aplicar filtro de status
    if (filter === "Completed") {
      filteredTasks = filteredTasks.filter(task => task.isCompleted);
    } else if (filter === "Incomplete") {
      filteredTasks = filteredTasks.filter(task => !task.isCompleted);
    }
    
    // Aplicar ordenação
    if (sort === "Asc") {
      filteredTasks = [...filteredTasks].sort((a, b) => 
        a.title.localeCompare(b.title)
      );
    } else if (sort === "Desc") {
      filteredTasks = [...filteredTasks].sort((a, b) => 
        b.title.localeCompare(a.title)
      );
    }
    
    return filteredTasks;
  };



  useEffect(() =>{//Função que irá mamnter salvo as novas tasks no LocalStorage
    localStorage.setItem("tasks", JSON.stringify(tasks))
  },[tasks])

  useEffect(() => {
    const fetchTasks= async () => {
      //CHAMAR A API
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10', {
        method: 'GET'
      })
      
      //PEGAR OS DADOS QUE ELA RETORNA
      const data= await response.json()

      //ARMAZENAR ESSE DADOS NO STATE
      setTasks(data)
    }

    //SE VOCÊ QUISER, PODE CHAMAR UMA API PARA PEGAR MAIS TAREFAS
    // fetchTasks()
  },[])


  function handleAddTaskSubmit(title, description) {//Essa função cria Tasks novas
    const newTask = {
      id: v4(),//cria IDs
      title: title,
      description: description,
      isCompleted: false
    };
    setTasks([...tasks, newTask])
  }

  function handleTaskClick(taskId) { //Essa função altera o estado de conclusão de uma tarefa, atualiza o setTask e da acesso a prop de <Tasks />
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return {...task, isCompleted: !task.isCompleted};
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function handleDeleteTask(taskId) { //Essa função remove blocos de tarefas
    const filteredTasks = tasks.filter(task => task.id !== taskId);
    setTasks(filteredTasks);
  }

  return (
    <div className="w-screen min-h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <h1 className="text-3xl text-slate-100 font-bold text-center">
          Gerenciador de Tarefas
        </h1>
        <SearchTask 
          search={search} 
          setSearch={setSearch} />
        <FilterTask 
          filter={filter} 
          setFilter={setFilter} 
          setSort={setSort} />
        <AddTask onAddTaskSubmit = {handleAddTaskSubmit}/>
        <Tasks
          tasks={getFilteredAndSortedTasks()} 
          onTaskClick={handleTaskClick} 
          onDeleteTask={handleDeleteTask} 
        />
      </div>
    </div>
  );
}

export default App;