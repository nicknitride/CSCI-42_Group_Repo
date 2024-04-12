import { useState } from "react";
import Minigreeter from "../../components/Minigreeter";
import "../Meals.css";

function ImportExport() {
  const [dataType, setDataType] = useState("");
  const [operationType, SetOperationType] = useState("");

  return (
    <>
      <Minigreeter label={"Export/Import your Data: "} />
      <h1 style={{ marginLeft: "30px" }}>
        Select the Data you Want to Export/Import
      </h1>
      <div className="meal-option-flex-container">
        <button
          className={
            dataType === "Meal"
              ? "meal-option meal-button-selected "
              : "meal-option"
          }
          onClick={() => {
            setDataType("Meal");
          }}
        >
          Meal Data
        </button>
        <button
          className={
            dataType === "Workout"
              ? "meal-option meal-button-selected "
              : "meal-option"
          }
          onClick={() => {
            setDataType("Workout");
          }}
        >
          Workout Data
        </button>
      </div>
      {dataType && <>
        <h1 style={{ marginLeft: "30px" }}>Select Operation Type: </h1>
        <div className="meal-option-flex-container">
        <button
          className={
            dataType === "Import"
              ? "meal-option meal-button-selected "
              : "meal-option"
          }
          onClick={() => {
            SetOperationType("Import");
          }}
        >
          Import
        </button>
        <button
          className={
            dataType === "Export"
              ? "meal-option meal-button-selected "
              : "meal-option"
          }
          onClick={() => {
            SetOperationType("Export");
          }}
        >
          Export
        </button>
      </div>
      </>}

      {(operationType === "Import") && 
      <>
      <h1>Add Import Code Here Once Backend Code is Finished</h1>
      </>}
      {(operationType === "Export") && 
      <>
      <h1>Add Export Code Here Once Backend Code is Finished</h1>
      </>}
    </>
  );
}
export default ImportExport;
