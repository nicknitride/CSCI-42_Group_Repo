import Minigreeter from "../components/Minigreeter";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Meals.css";
import axios from "axios";

function AddMealPage() {
  const navigate = useNavigate();
  const [mealId, setMealId] = useState("");
  const [mealHumanReadable, setMealHumanReadable] = useState("");
  const [foodId, setFoodId] = useState("");
  const [servingSize, setServingSize] = useState("");
  const [foodData, setFoodData] = useState([]);

  //   const [active, setActive] = useState(""); /* Store active button*/

  function outputCurrentSelected() {
    console.log(mealId);
  }

  useEffect(() => {
    axios
      .get("http://localhost:3003/food/all")
      .then((res) => {
        console.log(JSON.stringify(res));
        console.log("Response was" + res.data);
        setFoodData(res.data);
      })
      .catch((err) => {
        console.log("Failed to receive all food items from server", err);
      });
  }, []);

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

      <div className="food-list">
        <h1>Select a Food Item: </h1>
        {foodData.map((item) => {
          return (
            <>
              <h4>{JSON.stringify(item)}</h4>
            </>
          );
        })}
      </div>

      <div className="serving-size-div">
        <h4>Set a Serving Size: </h4>
      </div>
    </>
  );
}
export default AddMealPage;
