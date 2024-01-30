// import { useLocation } from "react-router-dom";
// import Minigreeter from "../components/Minigreeter";
// import "./MealList.css"
// // import { useState } from "react";
// type mealDataQueryItem = {
//   Calories: number;
//   creation_date_mealfood: string;
//   food_brand: string;
//   food_name: string;
//   meal_name: string;
//   mealfood_id: number;
//   serving_size: number;
//   cal_per_gram: number;
// };

// function processDate(value: string) {
//   const dateToParse = value;
//   const parsedDate = dateToParse.split("", 10);
//   let processedDate: string = "";
//   const year = parsedDate.slice(1, 5).toString().replace(/[,]/g, "");
//   const month = parsedDate.slice(6, 8).toString().replace(/[,]/g, "");
//   const day = parsedDate.slice(9, 10).toString().replace(/[,]/g, "");
//   const monthsMap: { [key: string]: string } = {
//     "01": "January",
//     "02": "February",
//     "03": "March",
//     "04": "April",
//     "05": "May",
//     "06": "June",
//     "07": "July",
//     "08": "August",
//     "09": "September",
//     "10": "October",
//     "11": "November",
//     "12": "December",
//   };

//   const monthName = monthsMap[month] || "Invalid Month";

//   processedDate = `${monthName} ${day}, ${year}`;
//   console.log(processDate);
//   return processedDate;
// }
// function MealEditPage() {
//   const location = useLocation();
//   const data: mealDataQueryItem = location.state;
//   return (
//     <>
//       <Minigreeter
//         label={`Editing (${data["food_name"]}) Entry for: ${processDate(
//           JSON.stringify(data["creation_date_mealfood"])
//         )} `}
//       />
//       <p>{JSON.stringify(data)}</p>
//       <div className="edit-container">
//       <form className="edit-meal">
//         <label>Brand: {data["food_brand"]}</label>
//         <div className="input-flex">
//         <span>Serving Size</span>
//         <input type="text" name="Serving Size" value={data["serving_size"]} />
//         </div>
//       </form>
//       </div>

//     </>
//   );
// }
// export default MealEditPage;

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Minigreeter from '../components/Minigreeter';
import './MealList.css';
import axios from 'axios';

type MealDataQueryItem = {
  Calories: number;
  creation_date_mealfood: string;
  food_brand: string;
  food_name: string;
  meal_name: string;
  mealfood_id: number;
  serving_size: number;
  cal_per_gram: number;
};

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


function MealEditPage() {
  const location = useLocation();
  const initialData: MealDataQueryItem = location.state;

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
  const handleSubmit = ()=>{
    const value = JSON.stringify(editedData);
    axios.post(`http://localhost:3003/meal/edit/${value}`).then((response)=>{
        console.log(response.data);
    });
    window.location.reload();
  }

  return (
    <>
      <Minigreeter
        label={`Editing (${editedData.food_name}) Entry for: ${processDate(
          JSON.stringify(editedData.creation_date_mealfood)
        )} `}
      />
      <p>{JSON.stringify(editedData)}</p>
      <div className="edit-container">
        <div className="button-and-edit-container">
        <form className="edit-meal" onSubmit={handleSubmit} >
          <label>{editedData.food_name} : {editedData.food_brand}</label>
          <div className="input-flex">
            <span>Serving Size in Grams</span>
            <input
              type="text"
              name="serving_size"
              value={editedData.serving_size}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-flex">
            <span>Calories per Gram</span>
            <span>{editedData.cal_per_gram}</span>
          </div>
          <h3>Current Calorie Count: {editedData.cal_per_gram*editedData.serving_size}</h3>
        </form>
        <button onClick={handleSubmit}>Submit</button>
        </div>

        <div className="nutrition-info">
            <h1>Output protein, calories, carbohydrates, and fat.</h1>
            <h1>But we need to edit the food entries to support these macros.</h1>
            </div>
      </div>
    </>
  );
}

export default MealEditPage;
