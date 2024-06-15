import "./data_key_value.css";

const DataKeyValue = ({ text, value }) => {
  return (
    <span className="text">
      {text}: <span className="value"> {value}</span>{" "}
    </span>
  );
};

export default DataKeyValue;
