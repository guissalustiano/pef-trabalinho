import React from "react";

const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateMyData(index, id, value);
    console.log(value);
    if (id === "link" && value !== "nenhum") {
      console.log("oi");
      updateMyData(index, "force", { x: "-", y: "-" });
    }
  };

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  if (id !== "link")
    return <input value={value} onChange={onChange} onBlur={onBlur} />;
  else
    return (
      <select
        id="cars"
        name="cars"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      >
        <option value="nenhum">Nenhum</option>
        <option value="simples">Apoio Simples</option>
        <option value="completo">Articulação</option>
      </select>
    );
};

export default EditableCell;
