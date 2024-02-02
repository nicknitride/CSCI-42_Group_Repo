import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Minigreeter from "../components/Minigreeter";
import "./MealList.css";
import formatFloat from "../formatting_functions/formatFloat";

type mealDataQuery = {
  Calories: number;
  creation_date_mealfood: string;
  food_brand: string;
  food_name: string;
  meal_name: string;
  mealfood_id: number;
  serving_size: number;
  cal_per_gram: number;
  protein_per_gram : number;
  fat_per_gram: number;
  carb_per_gram:number;
}[];

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
  return processedDate;
}

function MealList() {
  const navigate = useNavigate();

  const location = useLocation();
  const data = location.state as mealDataQuery;
  console.log(data);
  // Construct an SQL Query for the specific date provided here
  return (
    <>
      <Minigreeter
        label={`Meal Breakdown for ${processDate(
          JSON.stringify(Object.values(data)[0]["creation_date_mealfood"])
        )}`}
      />
      {/* <p>{JSON.stringify(data)}</p> */}
      {data.map((dataitem) => {
        return (
          <>
            <div
              className="single-meal-card"
              key={dataitem["mealfood_id"]}
              onClick={() => {
                console.log("Triggered Click");
                navigate("/meal/edit", { state: dataitem });
              }}
            >
              <h1>{`${dataitem["food_name"]} for Meal: ${dataitem["meal_name"]}`}</h1>
              <p>Brand: {dataitem["food_brand"]}</p>
              <p>Calories: {formatFloat(dataitem["Calories"])}</p>
              <p>Serving Size: {formatFloat(dataitem["serving_size"])} (g)</p>
              <p>Calories/Gram: {formatFloat(dataitem["cal_per_gram"])} (g)</p>
              <p>Protein/Gram: {formatFloat(dataitem["protein_per_gram"])} (g)</p>
              <p>Carb/Gram: {formatFloat(dataitem["carb_per_gram"])} (g)</p>
              <p>Fat/Gram: {formatFloat(dataitem["fat_per_gram"])} (g)</p>
            </div>
          </>
        );
      })}
    </>
  );
}
export default MealList;
