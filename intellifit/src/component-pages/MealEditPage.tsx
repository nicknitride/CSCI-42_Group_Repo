import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Minigreeter from "../components/Minigreeter";
import "./MealList.css";
import axios from "axios";
import formatFloat, {
  specifyDecimalPlaces,
} from "../formatting_functions/formatFloat";
import "../css/animations_transitions.css"
import { MealDataQueryItem } from "./Types/mealTypes";
import { AuthContext } from "./auth-pages/AuthContext";


function processDate(value: string) {
  const dateToParse = value;
  const parsedDate = dateToParse.split("", 11);
  let processedDate: string = "";
  const year = parsedDate.slice(1, 5).toString().replace(/[,]/g, "");
  const month = parsedDate.slice(6, 8).toString().replace(/[,]/g, "");
  const day = parsedDate.slice(9, 11).toString().replace(/[,]/g, "");
  const monthsMap: { [key: string]: string } = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    "10": "October",
    "11": "November",
    "12": "December",
  };
  const monthName = monthsMap[month] || "Invalid Month";
  processedDate = `${monthName} ${day}, ${year}`;
  console.log(processDate);
  return processedDate;
}

function fixDateforRedirect(date: string): string {
  const shortenedDateArray = date.split("", 10);
  const fixedDate = shortenedDateArray
    .splice(0.1)
    .toString()
    .replace(/[,]/g, "");
  console.log(shortenedDateArray, fixedDate);
  return fixedDate;
}

function MealEditPage() {
  const {loggedInUser} = useContext(AuthContext);
  const location = useLocation();
  const initialData: MealDataQueryItem = location.state;
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  // Use state to manage editable values
  const [editedData, setEditedData] = useState(initialData);

  // Event handler for input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = () => {
    const value = JSON.stringify(editedData);
    console.log(value);
    axios
      .post(`http://localhost:3003/meal/edit/${value}`)
      .then((response) => {
        console.log(response.data);
        return response;
      })
      .then((response) => {
        if (response.status !== 500) {
          redirectToPreviousPage();
        }
      })
      .catch((error) => {
        console.log("Axios error:" + error);
        setErrorMessage(error.response.data);
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      });
  };

  const redirectToPreviousPage = () => {
    const dateForRedirect = String(editedData.creation_date_mealfood);
    console.log("Date sent by handlesubmit " + dateForRedirect);
    console.log(fixDateforRedirect(dateForRedirect));
    axios
      .get(
        `http://localhost:3003/meals/day/${fixDateforRedirect(dateForRedirect)}/${loggedInUser}`
      )
      .then((response) => {
        console.log(response.data);
        navigate("/meals/editlist", { state: response.data });
      });
  };

  return (
    <>
      <Minigreeter
        label={`Editing (${editedData.food_name}) Entry for: ${processDate(
          JSON.stringify(editedData.creation_date_mealfood)
        )} `}
      />
      <div className="meal-option-flex-container">
      </div>
      {/* <p>{JSON.stringify(editedData)}</p> */}
      {/* Uncomment for debugging purposes */}
      <div className="edit-container">
        <div className="button-and-edit-container">
          <form className="edit-meal" onSubmit={handleSubmit}>
            <label>
              {editedData.food_name} : {editedData.food_brand}
            </label>
            <div className="input-flex">
              <span>Serving Size in Grams</span>
              <input
                type="number"
                min="1"
                max="999.99"
                name="serving_size"
                value={editedData.serving_size}
                onChange={handleInputChange}
                // source: https://www.w3schools.com/html/html_form_input_types.asp
              />
            </div>
            <div className="input-flex">
              <span>Calories per Gram</span>
              <span>{specifyDecimalPlaces(editedData.cal_per_gram, 3)}</span>
            </div>
            <h3>
              Current Calorie Count:{" "}
              {formatFloat(editedData.cal_per_gram * editedData.serving_size)}
            </h3>
            <div style={{color:"red",width:"80%",textAlign:"center"}} className={errorMessage? "short-fade-in":""}>
            {errorMessage && <h3>{errorMessage}</h3>}
          </div>
          </form>
          <button onClick={handleSubmit} type="button">
            Submit
          </button>
          
        </div>

        <div className="nutrition-info">
          <h1>Stats</h1>
          <ul>
            <li>
              Protein Content:{" "}
              {formatFloat(
                editedData.serving_size * editedData.protein_per_gram
              )}
            </li>
            <li>
              Carb Content:{" "}
              {formatFloat(editedData.serving_size * editedData.carb_per_gram)}
            </li>
            <li>
              Fat Content:{" "}
              {formatFloat(editedData.serving_size * editedData.fat_per_gram)}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default MealEditPage;
