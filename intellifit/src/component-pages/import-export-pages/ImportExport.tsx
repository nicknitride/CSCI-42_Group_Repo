import { useState } from "react";
import Minigreeter from "../../components/Minigreeter";
import "../Meals.css";
import axios from "axios";
type foodItem = {
  food_id: string;
  food_name: string;
  food_brand: string;
  protein_hundred_grams: number;
  carb_hundred_grams: number;
  fat_hundred_grams: number;
  protein_per_gram: number;
  carb_per_gram: number;
  fat_per_gram: number;
  cal_per_gram: number;
};

type mealfood = {
  mealfood_id: string;
  meal_id: string;
  food_id: string;
  creation_date_mealfood: string;
  serving_size: string;
};
function ImportExport() {
  const [dataType, setDataType] = useState("");
  const [operationType, SetOperationType] = useState("");

  const downloadFile = (data, filename) => {
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Function to handle importing meal data
  const handleMealDataImport = (fileContent) => {
    axios
      .post("http://localhost:3003/mealfood/purge")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("Failed to delete mealfood db", err);
      });

    const meals: mealfood[] = JSON.parse(fileContent);
    meals.forEach((item) => {
      axios
        .post("http://localhost:3003/mealfood/import", item)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log("Failed to add mealfood item to database", err);
        });
    });
  };

  // Function to handle importing food data
  const handleFoodDataImport = (fileContent) => {
    axios
      .post("http://localhost:3003/food/purge")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("Failed to delete food db", err);
      });

    const foods: foodItem[] = JSON.parse(fileContent);
    foods.forEach((item) => {
      axios
        .post("http://localhost:3003/food/import", item)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log("Failed to add food item to database", err);
        });
    });
  };

  // Function to handle file change for meal data import
  const handleMealFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = (readerEvent) => {
      const content = readerEvent.target.result;
      handleMealDataImport(content);
    };
  };

  // Function to handle file change for food data import
  const handleFoodFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = (readerEvent) => {
      const content = readerEvent.target.result;
      handleFoodDataImport(content);
    };
  };

  function downloadFoodDB() {
    axios
      .get("http://localhost:3003/food/all")
      .then((res) => {
        downloadFile(res.data, "Food_DB.json");
      })
      .catch((err) => {
        console.log("Failed to download FoodDB", err);
      });
  }
  function downloadMealFoodDB() {
    axios
      .get("http://localhost:3003/mealfood/export")
      .then((res) => {
        downloadFile(res.data, "Meal_Data.json");
      })
      .catch((err) => {
        console.log("Failed to download MealDB", err);
      });
  }

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
      {dataType && (
        <>
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
        </>
      )}

      {operationType === "Import" && dataType === "Meal" && (
        <>
          <h2 style={{ marginLeft: "20px" }}>
            Click the buttons below to Import the appropriate files
          </h2>
          <div style={{ display: "flex", marginLeft: "20px" }}>
            <h3>Meal_DB:</h3>
            <input
              className="meal-option"
              style={{ fontFamily: "Arial", fontSize: "18px" }}
              
              onChange={(e)=>{
                handleMealFileChange(e);
              }}
              type="file"
              id="dbimportfilepicker"
            ></input>
          </div>
          <div style={{ display: "flex", marginLeft: "20px" }}>
            <h3>Food_DB:</h3>
            <input
              className="meal-option"
              style={{ fontFamily: "Arial", fontSize: "18px" }}
              onChange={(e) => {
                handleFoodFileChange(e);
                // source: https://stackoverflow.com/questions/16215771/how-to-open-select-file-dialog-via-js
              }}
              type="file"
              id="dbimportfilepickerfooddb"
            ></input>
          </div>
        </>
      )}
      {operationType === "Export" && dataType === "Meal" && (
        <>
          <h2 style={{ marginLeft: "20px" }}>
            Click the buttons below to Download the appropriate files
          </h2>
          <div className="meal-option-flex-container">
            <button
              className="meal-option"
              onClick={() => {
                downloadFoodDB();
              }}
            >
              Download Food DB
            </button>
            <button
              className="meal-option"
              onClick={() => {
                downloadMealFoodDB();
              }}
            >
              Download All Meal Entries
            </button>
          </div>
        </>
      )}
    </>
  );
}
export default ImportExport;
