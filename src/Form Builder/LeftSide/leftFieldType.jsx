import "./leftFieldtype.css";

const fiELDtYPE = [
  { type: "text", label: "Text Field" },
  { type: "textarea", label: "Textarea" },
  { type: "checkbox", label: "Checkbox" },
  { type: "email", label: "Email" },
  { type: "number", label: "Number" },
];
const LeftFiledType = () => {
  const handleDragstart = (e, type, label) => {
    e.dataTransfer.setData("type", type);
    e.dataTransfer.setData("label", label);
  };
  return (
    <>
      <div className="field-type">
        {fiELDtYPE.map((field) => (
          <div
            key={field.type}
            className="draggle-field"
            draggable
            onDragStart={(e) => handleDragstart(e, field.type, field.label)}
          >
            {field.label}
          </div>
        ))}
      </div>
    </>
  );
};
export default LeftFiledType;
