import { Search } from "lucide-react"

const SearchTask = ({search, setSearch}) => {
  return (
    <div className="p-6 bg-slate-200 rounded-md shadow">
      <div className="flex items-center space-x-2 mb-2">
        <Search size={20} className="text-slate-600" />
        <h2 className="text-lg font-semibold text-slate-700">Pesquisar Tarefas</h2>
      </div>
      <input 
        type="text"
        className="w-full p-3 bg-white rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
        placeholder="Digite para pesquisar tarefas..."
      />
      {search && (
        <p className="mt-2 text-sm text-slate-600">
          Pesquisando por: {search}
        </p>
      )}
    </div>
  )
}

export default SearchTask