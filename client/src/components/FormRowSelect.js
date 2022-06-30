const FormRowSelect = ({labelText,name,value,handleChange, lists}) => {
    return <div className="form-row">
        <label htmlFor={name} className="form-label">
            {labelText||name}
        </label>

        <select name={name} value={value} onChange={handleChange} className="form-select">
            {lists.map((list, index) => (
                <option key={index} value={list}>
                    {list}
    </option>
))}
        </select>
    </div>;
};
export default FormRowSelect;
