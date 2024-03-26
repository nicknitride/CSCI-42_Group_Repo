import Minigreeter from "../components/Minigreeter";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Meals.css";
import axios from "axios";
import TodayMeal from "../components/TodayMeal";

function AddMealPage() {
  const navigate = useNavigate();
  const [mealId, setMealId] = useState("");
  const [mealHumanReadable, setMealHumanReadable] = useState("");
  const [foodId, setFoodId] = useState("");
  const [servingSize, setServingSize] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [foodData, setFoodData] = useState<any>([]);
  const [selectedFoodBoolean, setSelectedFoodBoolean] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedFoodData, setSelectedFoodData] = useState<any>([]);

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
        <div className="heading">
        <Minigreeter label="Add a Meal: "></Minigreeter>
      <div className="meal-option-flex-container">
        <button
          onClick={() => {
            navigate(-1);
            // Go back to previous page (-1) goes to previous in react app history
          }}
          className="meal-option"
        >
          Go Back
        </button>
      </div>
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
        {selectedFoodBoolean && (
          <div className="food-selected">
            <h2>Currently Selected Item: {selectedFoodData.food_name}</h2>
            <div
              className="add-meal-flex-card"
              onClick={() => {
                console.log("Clicked food_id " + selectedFoodData.food_id);
                setSelectedFoodBoolean(true);
                setSelectedFoodData(selectedFoodData);
                console.log(selectedFoodData);
              }}
            >
              <h4>
                {selectedFoodData.food_name} | Brand:{" "}
                {selectedFoodData.food_brand}
              </h4>
              <span>
                Protein (100g) {selectedFoodData.protein_hundred_grams} grams
              </span>
              <span>
                Carbohydrates (100g) {selectedFoodData.carb_hundred_grams} grams
              </span>
              <span className="last-span">
                Fat (100g) {selectedFoodData.fat_hundred_grams} grams
              </span>
            </div>
            <div className="meal-option-flex-container">
              <button
                onClick={() => {
                  setSelectedFoodBoolean(false);
                }}
                className="meal-option"
              >
                Cancel Selection
              </button>
            </div>
          </div>
        )}

        {!selectedFoodBoolean && (
          <>
            <h1>
              Select a Food Item (Search Functionality to be Implemented):{" "}
            </h1>
            <div className="grid-container-add-meal">
              {foodData.map((item) => {
                return (
                  <>
                    <div
                      className="add-meal-flex-card"
                      onClick={() => {
                        console.log("Clicked food_id " + item.food_id);
                        setSelectedFoodBoolean(true);
                        setFoodId(item.food_id);
                        setSelectedFoodData(item);
                        console.log(item);
                      }}
                    >
                      <h4>
                        {item.food_name} | Brand: {item.food_brand}
                      </h4>
                      <span>
                        Protein (100g) {item.protein_hundred_grams} grams
                      </span>
                      <span>
                        Carbohydrates (100g) {item.carb_hundred_grams} grams
                      </span>
                      <span className="last-span">
                        Fat (100g) {item.fat_hundred_grams} grams
                      </span>
                    </div>
                  </>
                );
              })}
            </div>
          </>
        )}
      </div>

      { selectedFoodBoolean && (<div className="serving-size-div">
        <h2>Set a Serving Size: </h2>
        <input type="number" name="serving_size" id="serving_size" />
      </div>)}
    </>
  );
}
export default AddMealPage;
