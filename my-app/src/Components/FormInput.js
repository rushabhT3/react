const FormInput = ({label, id, type, value, setValue}) => {
    return(
        <div>
            <label htmlFor={id}>{label}</label>
            <input id={id} type={type} value={value} onChange={e => setValue(e.target.value)} />
        </div>
    )
}

export default FormInput;