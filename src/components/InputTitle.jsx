function InputTitle({ value, onChange, placeholder }) {
    return (
        <input
            type="text"
            placeholder={placeholder}
            className="border-slate-300 outline-slate-400 px-4 py-2 rounded-md"
            value={value}
            onChange={onChange}
        />
    )
}

export default InputTitle;