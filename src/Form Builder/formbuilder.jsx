import LeftFiledType from "./LeftSide/leftFieldType";
import RightFormBuilder from "./RightSide/rightSideBuilder";
import "./formbuilder.css";

const FormBuilder = () => {
  return (
    <>
      <div className="form-builder">
        <LeftFiledType />
        <RightFormBuilder />
      </div>
    </>
  );
};
export default FormBuilder;
