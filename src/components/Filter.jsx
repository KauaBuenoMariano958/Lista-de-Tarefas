import { Filter } from "lucide-react"

const FilterTask = ({ filter, setFilter, setSort, sort }) => {
  return (
    <div className="p-6 bg-slate-200 rounded-md shadow">
      <div className="flex items-center space-x-2 mb-4">
        <Filter size={20} className="text-slate-600" />
        <h2 className="text-lg font-semibold text-slate-700">Filtrar e Ordenar</h2>
      </div>
      
      <div className="flex flex-col gap-4 md:flex-row md:gap-12">
        <div className="flex-1">
          <p className="font-medium text-slate-700 mb-2">Status:</p>
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="w-full p-2 bg-white rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
          >
            <option value="All">Todas as tarefas</option>
            <option value="Completed">Completas</option>
            <option value="Incomplete">Incompletas</option>
          </select>
        </div>
        
        <div className="flex-1">
          <p className="font-medium text-slate-700 mb-2">Ordem alfabética:</p>
          <div className="flex gap-2">
            <button 
              className={`flex-1 p-2 rounded-md font-medium transition-colors ${sort === "Asc" ? "bg-slate-600 text-white" : "bg-slate-400 text-white hover:bg-slate-500"}`}
              onClick={() => setSort("Asc")}
            >
              A → Z
            </button>
            <button 
              className={`flex-1 p-2 rounded-md font-medium transition-colors ${sort === "Desc" ? "bg-slate-600 text-white" : "bg-slate-400 text-white hover:bg-slate-500"}`}
              onClick={() => setSort("Desc")}
            >
              Z → A
            </button>
            {sort && (
              <button 
                className="p-2 bg-red-500 text-white rounded-md font-medium hover:bg-red-600 transition-colors"
                onClick={() => setSort("")}
              >
                Limpar
              </button>
            )}
          </div>
        </div>
      </div>
      
      {(filter !== "All" || sort) && (
        <div className="mt-4 p-2 bg-slate-300 rounded-md">
          <p className="text-sm text-slate-700">
            Filtros ativos: {filter !== "All" && `Status: ${filter}`} 
            {sort && filter !== "All" && ", "}
            {sort && `Ordem: ${sort === "Asc" ? "A-Z" : "Z-A"}`}
          </p>
        </div>
      )}
    </div>
  )
}

export default FilterTask