import { useState } from "react";
import "./rightSidebuilder.css";
import { MdDelete } from "react-icons/md";

const RightFormBuilder = () => {
  const [formItem, setFormItem] = useState([]);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("type");

    const newItem = {
      id: Date.now(),
      type,
      label: `${type.charAt(0).toUpperCase() + type.slice(1)} Label`,
      value: type === "checkbox" ? false : "",
      options: type === "select" ? ["Option 1", "Option 2", "Option 3"] : [],
    };

    setFormItem((prevItems) => [...prevItems, newItem]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const updateLabel = (id, newLabel) => {
    setFormItem((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, label: newLabel } : item
      )
    );
  };

  const updateFieldValue = (id, value) => {
    setFormItem((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, value } : item))
    );
  };

  const deleteItem = (id) => {
    setFormItem((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted ✅", formItem);
    alert("Form submitted! Check console for data.");
  };

  const renderField = (item) => {
    switch (item.type) {
      case "text":
        return (
          <input
            type="text"
            value={item.value}
            readOnly={isPreviewMode}
            onChange={(e) => updateFieldValue(item.id, e.target.value)}
          />
        );
      case "textarea":
        return (
          <textarea
            value={item.value}
            readOnly={isPreviewMode}
            onChange={(e) => updateFieldValue(item.id, e.target.value)}
          />
        );
      case "email":
        return (
          <input
            type="email"
            value={item.value}
            readOnly={isPreviewMode}
            onChange={(e) => updateFieldValue(item.id, e.target.value)}
          />
        );
      case "number":
        return (
          <input
            type="number"
            value={item.value}
            readOnly={isPreviewMode}
            onChange={(e) => updateFieldValue(item.id, e.target.value)}
          />
        );
      case "date":
        return (
          <input
            type="date"
            value={item.value}
            readOnly={isPreviewMode}
            onChange={(e) => updateFieldValue(item.id, e.target.value)}
          />
        );
      case "color":
        return (
          <input
            type="color"
            value={item.value}
            disabled={isPreviewMode}
            onChange={(e) => updateFieldValue(item.id, e.target.value)}
          />
        );
      case "checkbox":
        return (
          <input
            type="checkbox"
            checked={item.value}
            disabled={isPreviewMode}
            onChange={(e) => updateFieldValue(item.id, e.target.checked)}
          />
        );
      case "select":
        return (
          <select
            value={item.value}
            disabled={isPreviewMode}
            onChange={(e) => updateFieldValue(item.id, e.target.value)}
          >
            {item.options.map((opt, index) => (
              <option key={index} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="form-canavs"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {formItem.length > 0 && (
        <button
          onClick={() => setIsPreviewMode(!isPreviewMode)}
          className="toggle-preview-btn"
        >
          {isPreviewMode ? "Back to Edit" : "Preview Form"}
        </button>
      )}

      {formItem.length === 0 && <p>Drop form element here</p>}

      {isPreviewMode ? (
        <form className="form-preview" onSubmit={handleSubmit}>
          <h2>Application form</h2>
          {formItem.map((item) => (
            <div className="form-item" key={item.id}>
              <label>{item.label}</label>
              {renderField(item)}
            </div>
          ))}
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      ) : (
        <div className="form-edit">
          {formItem.map((item) => (
            <div className="form-item" key={item.id}>
              <label
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => updateLabel(item.id, e.target.textContent)}
              >
                {item.label}
              </label>
              {renderField(item)}
              <MdDelete
                onClick={() => deleteItem(item.id)}
                style={{ cursor: "pointer", marginLeft: "8px" }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RightFormBuilder;
