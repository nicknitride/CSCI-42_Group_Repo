import { useLocation } from "react-router-dom";
import Minigreeter from "../components/Minigreeter";
import "./MealList.css";

type mealDataQuery = {
  Calories: number;
  creation_date_mealfood: string;
  food_brand: string;
  food_name: string;
  meal_name: string;
  mealfood_id: number;
  serving_size: number;
  cal_per_gram: number;
}[];

function processDate(value: string) {
  const dateToParse = value;
  const parsedDate = dateToParse.split("", 10);
  let processedDate: string = "";
  const year = parsedDate.slice(1, 5).toString().replace(/[,]/g, "");
  const month = parsedDate.slice(6, 8).toString().replace(/[,]/g, "");
  const day = parsedDate.slice(9, 10).toString().replace(/[,]/g, "");
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
  return processedDate;
}

function MealList() {
  const location = useLocation();
  const data = location.state as mealDataQuery;
  console.log(data);
  // Construct an SQL Query for the specific date provided here
  return (
    <>
      <Minigreeter
        label={
          `Meal Breakdown for ${processDate(
            JSON.stringify(Object.values(data)[0]["creation_date_mealfood"])
          )}`
        }
      />
      {data.map((dataitem) => {
        return (
          <>
            <div className="single-meal-card" key={dataitem["mealfood_id"]}>
              <h1>{`${dataitem["food_name"]} for Meal: ${dataitem["meal_name"]}`}</h1>
              <p>Brand: {dataitem["food_brand"]}</p>
              <p>Calories: {dataitem["Calories"]}</p>
              <p>Serving Size: {dataitem["serving_size"]}</p>
              <p>Calories/Gram: {dataitem["cal_per_gram"]}</p>
            </div>
          </>
        );
      })}
    </>
  );
}
export default MealList;
