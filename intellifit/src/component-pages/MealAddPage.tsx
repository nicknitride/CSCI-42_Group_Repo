import Minigreeter from "../components/Minigreeter";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Meals.css";

function AddMealPage() {
  const navigate = useNavigate();
  const [mealId, setMealId] = useState("");
  const [mealHumanReadable, setMealHumanReadable] = useState("");
  const [foodId, setFoodId] = useState("");
  const [servingSize, setServingSize] = useState("");

  const [active, setActive] = useState(""); /* Store active button*/

  function outputCurrentSelected() {
    console.log(mealId);
  }

  return (
    <>
      <Minigreeter label="Add a Meal: "></Minigreeter>
      <div>
        <button
          onClick={() => {
            navigate(-1);
            // Go back to previous page (-1) goes to previous in react app history
          }}
        >
          Go Back
        </button>
      </div>
      <div className="meal-time">
        <h1>Select a Meal Time: </h1>
        <div className="currently-selected-meal-div">
          <h3>
            Currently Selected Meal Time: {mealHumanReadable}
            {mealHumanReadable === "" && <span>None</span>}
          </h3>
        </div>
        <div className="meal-option-flex-container">
          <button
            className="meal-option"
            onClick={() => {
              setMealId("1");
              setMealHumanReadable("Breakfast");
              outputCurrentSelected();
            }}
          >
            Breakfast
          </button>
          <button
            className="meal-option"
            onClick={() => {
              setMealId("2");
              setMealHumanReadable("Lunch");
              outputCurrentSelected();
            }}
          >
            Lunch
          </button>
          <button
            className="meal-option"
            onClick={() => {
              setMealId("3");
              setMealHumanReadable("Dinner");
              outputCurrentSelected();
            }}
          >
            Dinner
          </button>
        </div>
      </div>
    </>
  );
}
export default AddMealPage;
