import Minigreeter from "../components/Minigreeter";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Meals.css";
import axios from "axios";

type foodItem = {
  food_id : string;
  food_name: string;
  food_brand: string;
  protein_hundred_grams: number;
  carb_hundred_grams: number;
  fat_hundred_grams: number;
  protein_per_gram: number;
  carb_per_gram: number;
  fat_per_gram: number;
  cal_per_gram: number;
}

function AddMealPage() {
  const navigate = useNavigate();
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
    };

    
    axios
      .post(`http://localhost:3003/meal/addentry/`, data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log("Axios error:" + error);
      });
    navigate(-1);
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
    search_term: searchValue
  };
  // This function allows search to work
  useEffect(()=>{
    if(searchBoolean){
      axios.post("http://localhost:3003/food/search",searchType)
      .then((res)=>{
        console.log("\nSearch returned: "+JSON.stringify(res)+"\n");
        setFoodData(res.data)
      })
      .catch((err)=>{
        console.log("Search query failed :"+err);
      })
    }
    else{
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
  },[searchBoolean])

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
      <div>
        <input name="searchBox" type="text" placeholder="Search Food Database" value={searchValue} onChange={(e)=>{
          setSearchValue(e.target.value);
        }}/>
        {
        <>
        <button onClick={()=>{
          setSearchBoolean(true)
        }}>Search</button>
        </>}
        { <>
        <button onClick={()=>{
          setSearchBoolean(false)
          setSearchValue("")
        }
      } style={{backgroundColor: "coral", border:"none"}} >
          Clear Search
        </button>
        </>}
        
      </div>
        {!selectedFoodBoolean && (
          <>
            <h1>
              Select a Food Item:
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
                      key={item.food_id + item.food_brand}
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
                type="number"
                name="serving_size"
                id="serving_size"
                value={servingSize} // Bind value to servingSize state
                onChange={(event) => {
                  setServingSize(event.target.value);
                }} // Handle change event
              />
            </h2>

            <div className="final-add-card">
              <h3>Serving Size: {servingSize} grams</h3>
              <span>
                Total Calories: {selectedFoodData.cal_per_gram * servingSize} cal
              </span>
              <span>
                Total Protein: {selectedFoodData.protein_per_gram * servingSize}{" "}
                g
              </span>
              <span>
                Total Carbohydrates:{" "}
                {selectedFoodData.carb_per_gram * servingSize} g
              </span>
              <span>
                Total Fat: {selectedFoodData.fat_per_gram * servingSize} g
              </span>
            </div>
          </div>
        </div>
      )}


    </>
  );
}
export default AddMealPage;
