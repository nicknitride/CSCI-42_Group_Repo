import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Minigreeter from "../components/Minigreeter";
import "./MealList.css";
import formatFloat from "../formatting_functions/formatFloat";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Meals.css";

type mealDataQuery = {
  Calories: number;
  creation_date_mealfood: string;
  food_brand: string;
  food_name: string;
  meal_name: string;
  mealfood_id: number;
  serving_size: number;
  cal_per_gram: number;
  protein_per_gram: number;
  fat_per_gram: number;
  carb_per_gram: number;
}[];

interface Totals {
  total_calories: number;
  total_protein: number;
  total_fat: number;
  total_carbs: number;
}
[];

function fixDateforRedirect(date: string): string {
  const shortenedDateArray = date.split("", 10);
  const fixedDate = shortenedDateArray
    .splice(0.1)
    .toString()
    .replace(/[,]/g, "");
  console.log(shortenedDateArray, fixedDate);
  return fixedDate;
}

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
  const [dailyTotals, setTotals] = useState<Totals[]>([]);
  const location = useLocation();
  const data = location.state as mealDataQuery;
  console.log(data);

  if (!data || data.length === 0) {
    navigate("/meals");
  }

  // Retrieve Totals
  useEffect(() => {
    const dailyTotalEndpoint = `http://localhost:3003/meals/today/totalcal/${fixDateforRedirect(
      data[0].creation_date_mealfood
    )}`;
    console.log(dailyTotalEndpoint);
    axios
      .get(dailyTotalEndpoint)
      .then((res) => {
        setTotals(res.data);
        console.log("Received daily totals", res.data);
      })
      .catch((err) => console.log("failed at daily total: " + err));
  }, [data]);
  return (
    <>
      <Minigreeter
        label={`Meal Breakdown for ${processDate(
          JSON.stringify(Object.values(data)[0]["creation_date_mealfood"])
        )}`}
      />

      <p>{JSON.stringify(data)}</p>
      {dailyTotals.length > 0 && dailyTotals[0].total_calories !== null && (
        <div className="totals short-fade-in">
          <h2>Totals:</h2>
          <h4>
            Total Calories:{" "}
            {dailyTotals.length > 0 &&
              formatFloat(dailyTotals[0].total_calories)}{" "}
            (g)
          </h4>
          <h4>
            Total Protein:{"  "}
            {dailyTotals.length > 0 &&
              formatFloat(dailyTotals[0].total_protein)}{" "}
            (g)
          </h4>
          <h4>
            Total Fat:{" "}
            {dailyTotals.length > 0 && formatFloat(dailyTotals[0].total_fat)}{" "}
            (g)
          </h4>
          <h4>
            Total Carbs:{" "}
            {dailyTotals.length > 0 && formatFloat(dailyTotals[0].total_carbs)}{" "}
            (g)
          </h4>
        </div>
      )}

      <div className="meal-list-flex short-fade-in">
        {data.map((dataitem) => {
          return (
            <>
              <div className="single-meal-card" key={dataitem["mealfood_id"]}>
                <h1>{`${dataitem["food_name"]}  (${dataitem["meal_name"]})`}</h1>
                <p>Brand: {dataitem["food_brand"]}</p>
                <p>Calories: {formatFloat(dataitem["Calories"])}</p>
                <p>Serving Size: {formatFloat(dataitem["serving_size"])} (g)</p>
                <p>
                  Calories/Gram: {formatFloat(dataitem["cal_per_gram"])} (g)
                </p>
                <p>
                  Protein/Gram: {formatFloat(dataitem["protein_per_gram"])} (g)
                </p>
                <p>Carb/Gram: {formatFloat(dataitem["carb_per_gram"])} (g)</p>
                <p>Fat/Gram: {formatFloat(dataitem["fat_per_gram"])} (g)</p>
                <div className="single-meal-button-container">
                  <button
                    className=""
                    onClick={() => {
                      console.log("Edit button clicked");
                      navigate("/meal/edit", { state: dataitem });
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className=""
                    onClick={() => {
                      // axios.post()
                      console.log("Delete clicked");
                      axios
                        .post(`http://localhost:3003/meal/delete-single-item`, {
                          mealfood_id: dataitem["mealfood_id"],
                        })
                        .then((response) => {
                          console.log(response.data);
                          if (response.status !== 500) {
                            const dateForRedirect =
                              dataitem["creation_date_mealfood"];
                            axios
                              .get(
                                `http://localhost:3003/meals/day/${fixDateforRedirect(
                                  dateForRedirect
                                )}`
                              )
                              .then((response) => {
                                console.log(response.data);
                                navigate("/meals/editlist", {
                                  state: response.data,
                                });
                              });
                          }
                        })
                        .catch((error) => {
                          console.log(error.response.data);
                        });
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
export default MealList;
