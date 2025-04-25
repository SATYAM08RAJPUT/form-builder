import { useState } from "react";
import "./rightSidebuilder.css";
import { MdDelete } from "react-icons/md";

const RightFormBuilder = () => {
  const [formItem, setFormItem] = useState([]);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("type");
    console.log(type);

    const newItems = {
      id: Date.now(),
      type,
      label: `${type.charAt(0).toUpperCase() + type.slice(1)} Label`,
      value: type === "select" ? "Option 1" : "",
      options: type === "select" ? ["Option 1", "Option 2", "Option 3"] : [],
    };
    setFormItem([...formItem, newItems]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const updateLabel = (id, newlabel) => {
    setFormItem(
      formItem.map((item) =>
        item.id === id ? { ...item, label: newlabel } : item
      )
    );
  };

  const updateFieldValue = (id, value) => {
    setFormItem(
      formItem.map((item) => (item.id === id ? { ...item, value } : item))
    );
  };

  const deleteItem = (id) => {
    setFormItem(formItem.filter((item) => item.id !== id));
  };

  const renderField = (item) => {
    console.log("item", item);
    switch (item.type) {
      case "text":
        return isPreviewMode ? (
          <span>{item.value}</span>
        ) : (
          <input
            type="text"
            value={item.value}
            onChange={(e) => updateFieldValue(item.id, e.target.value)}
          />
        );
      case "textarea":
        return isPreviewMode ? (
          <span>{item.value}</span>
        ) : (
          <textarea
            value={item.value}
            onChange={(e) => updateFieldValue(item.id, e.target.value)}
          />
        );
      case "checkbox":
        return isPreviewMode ? (
          <span>{item.value ? "Checked" : "Unchecked"}</span>
        ) : (
          <label>
            <input
              type="checkbox"
              checked={item.value}
              onChange={(e) => updateFieldValue(item.id, e.target.checked)}
            />
          </label>
        );
      case "email":
        return isPreviewMode ? (
          <span>{item.value}</span>
        ) : (
          <input
            type="email"
            value={item.value}
            onChange={(e) => updateFieldValue(item.id, e.target.value)}
          />
        );
      case "number":
        return isPreviewMode ? (
          <span>{item.value}</span>
        ) : (
          <input
            type="number"
            value={item.value}
            onChange={(e) => updateFieldValue(item.id, e.target.value)}
          />
        );
      case "date":
        return isPreviewMode ? (
          <span>{item.value}</span>
        ) : (
          <input
            type="date"
            value={item.value}
            onChange={(e) => updateFieldValue(item.id, e.target.value)}
          />
        );
      case "color":
        return isPreviewMode ? (
          <span>{item.value}</span>
        ) : (
          <input
            type="color"
            value={item.value}
            onChange={(e) => updateFieldValue(item.id, e.target.value)}
          />
        );
      default:
        return null;
    }
  };

  const togglePreview = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  return (
    <>
      <div
        className="form-canavs"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {formItem.length > 0 && (
          <button onClick={togglePreview} className="toggle-preview-btn">
            {isPreviewMode ? "Edit Form" : "Preview Form"}
          </button>
        )}

        {formItem.length === 0 && <p>Drop form element here</p>}

        {isPreviewMode ? (
          <div className="form-preview">
            {formItem.map((item) => (
              <div className="form-item" key={item.id}>
                <label>{item.label}</label>
                {renderField(item)}
              </div>
            ))}
          </div>
        ) : (
          formItem.map((item) => (
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
                style={{ cursor: "pointer" }}
              />
            </div>
          ))
        )}

        {formItem.length > 0 && !isPreviewMode && (
          <p>
            <button className="submit-btn">Submit Form</button>
          </p>
        )}
      </div>
    </>
  );
};

export default RightFormBuilder;
