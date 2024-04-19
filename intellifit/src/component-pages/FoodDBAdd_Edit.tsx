import "./MealList.css";
import "./Meals.css";
import Minigreeter from "../components/Minigreeter";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
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

function FoodDBAdd_Edit() {
  const navigate = useNavigate();
  const [showFoodList, SetShowFoodList] = useState(false);
  const [searchBoolean, setSearchBoolean] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const [foodData, setFoodData] = useState<foodItem[]>([]);

  const [customItemBool, setCustomItemBool] = useState(false);

  //   Form state:
  const [foodName, setFoodName] = useState("");
  const [foodBrand, setFoodBrand] = useState("");
  const [protein_hundred_grams, setProteinHundredGrams] = useState("");
  const [carb_hundred_grams, setCarbHundredGrams] = useState("");
  const [fat_hundred_grams, setFatHundredGrams] = useState("");
  const [serverResponse, setServerResponse] = useState("");
  const [showServerResponse, setShowServerResponse] = useState(false);

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

  // This function allows search to work
  useEffect(() => {
    if (searchBoolean && !customItemBool) {
      axios
        .post("http://localhost:3003/food/search", { search_term: searchValue })
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

  //   useEffect(()=>{},[customItemBool])
  return (
    <>
      <Minigreeter label="Welcome to the Food Database Page:"></Minigreeter>
      <p className="one-item-card short-fade-in">
        This page lets you view the food database and add your own food items!
      </p>
      <p className="one-item-card short-fade-in">
        The show database toggle allows you to search the entire database (it
        shows the first 10 results by default)
      </p>

      <div className="horizontal-flex">
        <div className="meal-option-flex-container">
          <button
            className="meal-option"
            onClick={() => {
              navigate(-1);
            }}
          >
            Go Back
          </button>
          <button
            className={
              showFoodList ? "meal-option meal-button-selected" : "meal-option"
            }
            onClick={() => {
              SetShowFoodList(!showFoodList);
              setCustomItemBool(false);
            }}
          >
            {showFoodList ? "Hide Food Database" : "Show Food Database"}
          </button>
        </div>
        <div
          className="meal-option-flex-container"
          style={{ marginTop: "20px" }}
        >
          <button
            className={
              customItemBool
                ? "meal-option meal-button-selected"
                : "meal-option"
            }
            onClick={() => {
              setCustomItemBool(!customItemBool);
              setSearchBoolean(false);
              SetShowFoodList(false);
              setFoodName("");
              setCarbHundredGrams("");
              setFatHundredGrams("");
              setProteinHundredGrams("");
              setFoodBrand("")
            }}
          >
            Create Custom Food Item
          </button>
        </div>
      </div>

      {!customItemBool && showFoodList && foodData && (
        <>
          <div>
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
                    }}
                    style={{ backgroundColor: "coral", border: "none" }}
                  >
                    Clear Search
                  </button>
                </>
              )}
            </div>

            {
              <>
                <div className="no-search-meal">
                  <div className="grid-container-add-meal short-fade-in">
                    {foodData.map((item) => {
                      return (
                        <>
                          <div
                            className="add-meal-flex-card"
                            onClick={() => {
                              console.log("Clicked food_id " + item.food_id);
                              console.log(item);
                            }}
                            key={item.food_id + item.food_brand}
                          >
                            <h4>
                              {item.food_name} | Brand: {item.food_brand}
                            </h4>
                            <span>
                              Protein (100g) {item.protein_hundred_grams} grams
                            </span>
                            <span>
                              Carbohydrates (100g) {item.carb_hundred_grams}{" "}
                              grams
                            </span>
                            <span className="last-span">
                              Fat (100g) {item.fat_hundred_grams} grams
                            </span>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              </>
            }
          </div>
        </>
      )}
      {customItemBool && (
        <>
          <div
            className="food-add-card"
            style={{
              marginLeft: "30px",
              marginTop: "15px",
              marginBottom: "30px",
            }}
          >
            <h1>Add Food Form (Serving : 100g ⚖️): </h1>
            <div
              className="horizontal-flex"
              style={{ justifyContent: "space-between", width: "80%" }}
            >
              <p>Food Name: </p>{" "}
              <input
                type="text"
                onChange={(e) => {
                  setFoodName(e.target.value);
                }}
              />
            </div>
            <div
              className="horizontal-flex"
              style={{ justifyContent: "space-between", width: "80%" }}
            >
              <p>Food Brand: </p>{" "}
              <input
                type="text"
                onChange={(e) => {
                  setFoodBrand(e.target.value);
                }}
              />
            </div>
            <div
              className="horizontal-flex"
              style={{ justifyContent: "space-between", width: "80%" }}
            >
              <p>Protein (in 100g): </p>{" "}
              <input
                type="number"
                onChange={(e) => {
                  setProteinHundredGrams(e.target.value);
                }}
              />
            </div>
            <div
              className="horizontal-flex"
              style={{ justifyContent: "space-between", width: "80%" }}
            >
              <p>Fat (in 100g): </p>{" "}
              <input
                type="number"
                onChange={(e) => {
                  setFatHundredGrams(e.target.value);
                }}
              />
            </div>
            <div
              className="horizontal-flex"
              style={{ justifyContent: "space-between", width: "80%" }}
            >
              <p>Carbs (in 100g): </p>{" "}
              <input
                type="number"
                onChange={(e) => {
                  setCarbHundredGrams(e.target.value);
                }}
              />
            </div>
            <div
              className="horizontal-flex"
              style={{ justifyContent: "space-between", width: "80%" }}
            >
              <p>Calculated Calories (in 100g):</p>{" "}
              {carb_hundred_grams &&
                protein_hundred_grams &&
                fat_hundred_grams && (
                  <>
                    <span>
                      {(parseFloat(carb_hundred_grams) / 100) * 4 +
                        (parseFloat(protein_hundred_grams) / 100) * 4 +
                        (parseFloat(fat_hundred_grams) / 100) * 9}
                    </span>
                  </>
                )}
            </div>
            <button
              onClick={() => {
                axios
                  .post("http://localhost:3003/food/addentry", {
                    food_name: foodName,
                    food_brand: foodBrand,
                    protein_hundred_grams: protein_hundred_grams,
                    carb_hundred_grams: carb_hundred_grams,
                    fat_hundred_grams: fat_hundred_grams,
                  })
                  .then((response) => {
                    if (response.status !== 500) {
                      setServerResponse(response.data);
                      setShowServerResponse(true);
                      setTimeout(() => {
                        setShowServerResponse(false);
                      }, 3000);
                      setTimeout(() => {
                        setCustomItemBool(false);
                        SetShowFoodList(true);
                        setSearchValue(foodName);
                        setSearchBoolean(true);
                      }, 4000);
                    }
                  })
                  .catch((error) => {
                    setServerResponse(error.response.data);
                    setShowServerResponse(true);
                    setTimeout(() => {
                      setShowServerResponse(false);
                    }, 3000);
                  });
              }}
              style={{ marginBottom: "20px" }}
            >
              Submit
            </button>
          </div>
          {/* {showServerResponse && ( */}
          {showServerResponse && (
            <>
              <div className="temporary-banner">
                <p>{serverResponse}</p>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

export default FoodDBAdd_Edit;
