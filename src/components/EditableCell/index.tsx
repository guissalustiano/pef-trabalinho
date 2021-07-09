import React from "react";
import Select from "react-select";

const optionsName = [
  { value: "A", label: "A" },
  { value: "B", label: "B" },
  { value: "C", label: "C" },
  { value: "D", label: "D" },
  { value: "E", label: "E" },
  { value: "F", label: "F" },
];

const optionsLink = [
  { value: "nenhum", label: "Nenhum" },
  { value: "simples", label: "Apoio simples" },
  { value: "completo", label: "Articulação" },
];

const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData// This is a custom function that we supplied to our table instance
},
) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue);

  const onChange = (e) => {
    setValue(e.target.value);
  };


  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateMyData(index, id, value);
    if (id === "link" && value !== "nenhum") {
      updateMyData(index, "force", { x: "", y: "" });
    }
  };

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  if (id !== "link" && id !== "id" && id !== "connections")
    return <input value={value} onChange={onChange} onBlur={onBlur} />;
  else if (id === "link")
    return (
      <div style={{ width: 160 }}>
        <Select
          defaultValue={{ value: initialValue, label: "Apoio Simples" }}
          onChange={(option) => setValue(option.value)}
          onBlur={onBlur}
          options={optionsLink}
        />
      </div>
    );
  else if (id === "id") {
    return (
      <div style={{ width: 80 }}>
        <Select
          defaultValue={{ value: "A", label: "A" }}
          onChange={(option) => setValue(option.value)}
          onBlur={onBlur}
          options={optionsName}
        />
      </div>
    );
  } else {
    return (
      <div style={{ width: 200 }}>
        <Select
          onChange={(optionsArray) => {
            console.log(optionsArray);
            setValue(optionsArray.map((option) => option.value))}
          }
          onBlur={onBlur}
          options={optionsName}
          isMulti
        />
      </div>
    );
  }
};

export default EditableCell;
