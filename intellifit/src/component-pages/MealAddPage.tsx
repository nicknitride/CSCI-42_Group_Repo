import Minigreeter from "../components/Minigreeter";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import "./Meals.css";
import axios from "axios";
import { foodItem } from "./Types/mealTypes";
import { AuthContext } from "./auth-pages/AuthContext";

function AddMealPage() {
  const { loggedInUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const {state} = useLocation();
  const {passedDate} = state;
  const processedDate = new Date(passedDate);

  const [mealId, setMealId] = useState("");
  const [mealHumanReadable, setMealHumanReadable] = useState("");
  const [foodId, setFoodId] = useState("");
  const [servingSize, setServingSize] = useState<any>("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  const [foodData, setFoodData] = useState<foodItem[]>([]);
  const [selectedFoodBoolean, setSelectedFoodBoolean] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedFoodData, setSelectedFoodData] = useState<any>([]);

  const [searchBoolean, setSearchBoolean] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  const [selectedDate, setSelectedDate] = useState<string>(
    passedDate ? processedDate.toISOString().split("T")[0] : now.toISOString().split("T")[0]
  );
  //   const [active, setActive] = useState(""); /* Store active button*/

  function outputCurrentSelected() {
    console.log(mealId);
  }

  function handleSubmit() {
    console.log("meal id: " + mealId);
    console.log("Food ID: " + foodId);
    console.log("Serving Size: " + servingSize);

    const data = {
      mealID: mealId,
      foodID: foodId,
      servingSize: servingSize,
      selectedDate: selectedDate,
      loggedInUser: loggedInUser,
    };

    axios
      .post(`http://localhost:3003/meal/addentry/`, data)
      .then((response) => {
        console.log(response.data);
        if (response.status !== 500) {
          // navigate(-1);
          setErrorMessage("Added! Navigating to Page");
          setTimeout(() => {
            setErrorMessage("");
          }, 3000);

          axios
          .get(`http://localhost:3003/meals/day/${meal_day}/${loggedInUser}`)
          .then((response) => {
            console.log(response.data);
            navigate("/meals/editlist", { state: response.data });
          }).catch((error) => {
            console.log("Axios error:" + error);
            setErrorMessage(error.response.data);
            setTimeout(() => {
              setErrorMessage("");
            }, 3000);
          });
        }
      })
      .catch((error) => {
        console.log("Axios error:" + error);
        setErrorMessage(error.response.data);
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      });
      const meal_day = selectedDate;
      console.log("Edit page launched from today edit button on the following date: "+meal_day);
      console.log(`http://localhost:3003/meals/day/${meal_day}/${loggedInUser}`)
  }
  useEffect(() => {
    axios
      .get("http://localhost:3003/food/all")
      .then((res) => {
        console.log(JSON.stringify(res));
        setFoodData(res.data);
      })
      .catch((err) => {
        console.log("Failed to receive all food items from server", err);
      });
  }, []);

  const searchType = {
    search_term: searchValue,
  };
  // This function allows search to work
  useEffect(() => {
    if (searchBoolean) {
      axios
        .post("http://localhost:3003/food/search", searchType)
        .then((res) => {
          console.log("\nSearch returned: " + JSON.stringify(res) + "\n");
          setFoodData(res.data);
        })
        .catch((err) => {
          console.log("Search query failed :" + err);
        });
    } else {
      axios
        .get("http://localhost:3003/food/all")
        .then((res) => {
          console.log(JSON.stringify(res));
          setFoodData(res.data);
        })
        .catch((err) => {
          console.log("Failed to receive all food items from server", err);
        });
    }
  }, [searchBoolean]);

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
        <div className="meal-option-flex-container">
          <div className="meal-option">
            <label
              htmlFor="selectedDate"
              style={{
                color: "white",
                fontFamily: "arial",
                fontWeight: "bolder",
              }}
            >
              Select Date:
            </label>
            <input
              type="date"
              id="selectedDate"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="meal-option"
            />
          </div>
        </div>

        <div className="currently-selected-meal-div">
          <h3>
            Currently Selected Meal Time: {mealHumanReadable}
            {mealHumanReadable === "" && <span>None</span>}
          </h3>
        </div>
        <div className="meal-option-flex-container">
          <button
            className={
              mealHumanReadable === "Breakfast"
                ? "meal-option meal-button-selected "
                : "meal-option"
            }
            onClick={() => {
              setMealId("1");
              setMealHumanReadable("Breakfast");
              outputCurrentSelected();
            }}
          >
            Breakfast
          </button>
          <button
            className={
              mealHumanReadable === "Lunch"
                ? "meal-option meal-button-selected "
                : "meal-option"
            }
            onClick={() => {
              setMealId("2");
              setMealHumanReadable("Lunch");
              outputCurrentSelected();
            }}
          >
            Lunch
          </button>
          <button
            className={
              mealHumanReadable === "Dinner"
                ? "meal-option meal-button-selected "
                : "meal-option"
            }
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

      {mealId && (
        <>
          <div className="food-list">
            <h1>Select a Food Item:</h1>
            <div
              className="meal-option-flex-container"
              style={{ marginTop: "20px" }}
            >
              <input
                disabled={searchBoolean ? true : false}
                className="meal-option"
                name="searchBox"
                type="text"
                placeholder="Search Food Database"
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
              />
              {!searchBoolean && (
                <>
                  <button
                    className="meal-option"
                    onClick={() => {
                      setSearchBoolean(true);
                      if (selectedFoodBoolean) {
                        setSelectedFoodBoolean(false);
                        setSelectedFoodData("");
                      }
                    }}
                  >
                    Search
                  </button>
                </>
              )}
              {searchBoolean && (
                <>
                  <button
                    className="meal-option"
                    onClick={() => {
                      setSearchBoolean(false);
                      setSearchValue("");
                      if (selectedFoodBoolean) {
                        setSelectedFoodBoolean(false);
                        setSelectedFoodData("");
                      }
                    }}
                    style={{ backgroundColor: "coral", border: "none" }}
                  >
                    Clear Search
                  </button>
                </>
              )}
            </div>

            {!selectedFoodBoolean && (
              <>
                <h3 style={{ textAlign: "center" }}>
                  Displaying 10 Items from Food Database (Use Search to See
                  More):
                </h3>
                <div className="grid-container-add-meal short-fade-in">
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
                          key={item.food_id + item.food_brand}
                        >
                          <h4>
                            {item.food_name} | Brand: {item.food_brand}
                          </h4>
                          <span>
                            Calories (in 100g) {item.cal_per_gram * 100}
                          </span>
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

          {selectedFoodBoolean && (
            <div className="finalized-container">
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
                    Protein (100g) {selectedFoodData.protein_hundred_grams}{" "}
                    grams
                  </span>
                  <span>
                    Carbohydrates (100g) {selectedFoodData.carb_hundred_grams}{" "}
                    grams
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
                  {selectedFoodBoolean && (
                    <>
                      <button
                        className="meal-option submit-button"
                        onClick={() => {
                          handleSubmit();
                        }}
                      >
                        Submit
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className="serving-size-div">
                <h2>
                  Set a Serving Size (in grams):{" "}
                  <input
                    className="meal-option"
                    type="number"
                    name="serving_size"
                    id="serving_size"
                    value={servingSize} // Bind value to servingSize state
                    onChange={(event) => {
                      setServingSize(event.target.value);
                    }} // Handle change event
                    style={{ fontSize: "20px" }}
                  />
                </h2>

                <div className="final-add-card">
                  {!errorMessage && (
                    <>
                      <h3>Serving Size: {servingSize} grams</h3>
                      <span>
                        Total Calories:{" "}
                        {(
                          parseFloat(selectedFoodData.cal_per_gram) *
                          parseFloat(servingSize)
                        ).toFixed(2)}{" "}
                        cal
                      </span>
                      <span>
                        Total Protein:{" "}
                        {(
                          parseFloat(selectedFoodData.protein_per_gram) *
                          parseFloat(servingSize)
                        ).toFixed(2)}{" "}
                        g
                      </span>
                      <span>
                        Total Carbohydrates:{" "}
                        {(
                          parseFloat(selectedFoodData.carb_per_gram) *
                          parseFloat(servingSize)
                        ).toFixed(2)}{" "}
                        g
                      </span>
                      <span>
                        Total Fat:{" "}
                        {(
                          parseFloat(selectedFoodData.fat_per_gram) *
                          parseFloat(servingSize)
                        ).toFixed(2)}{" "}
                        g
                      </span>
                    </>
                  )}
                  {errorMessage && (
                    <>
                      <span>
                        <h3 className={errorMessage ? "short-fade-in" : ""}>
                          {errorMessage}
                        </h3>
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
export default AddMealPage;
