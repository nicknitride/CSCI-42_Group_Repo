import axios from "axios";
import "./Meals.css";
import Minigreeter from "../components/Minigreeter";
import { useEffect, useState } from "react";
import MealsByDayCard from "../components/MealsByDayCard";
import { useNavigate } from "react-router-dom";
import TodayMeal from "../components/TodayMeal";
import formatFloat from "../formatting_functions/formatFloat";

interface DailyTotals {
  total_calories: number;
  total_protein: number;
  total_fat: number;
  total_carbs: number;
}
[];

function convertISOStringToDate(isoString: string) {
  const date = new Date(isoString);
  // Format the date as "Month Day, Year, Hour:Minute AM/PM"
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return formattedDate;
}

function deleteEntriesMatchingDate(date: string) {
  console.log("Triggered delete handler for " + date);
  axios
    .delete(`http://localhost:3003/meals/day/${date}`)
    .then((response) => {
      console.log(response.data);
      console.log("Deleted entry successfully");
      window.location.reload(); //Reload webpage after deletion
    })
    .catch((error) => {
      console.log("Delete failed, axios error: " + error);
    });
}

// !? TODO - Finish the edit handler, use for inspo: https://stackoverflow.com/questions/71777921/reat-js-navigate-with-json-object-to-another-page

function Meals() {
  const [data, setData] = useState([]);
  const [dailyTotals, setTotals] = useState<DailyTotals[]>([]);
  const [mode, setMode] = useState("Today");
  const navigate = useNavigate();

  const clearData = () => {
    setData([]); // Set data to an empty array
    setTotals([]);
  };

  useEffect(() => {
    let axiosRequestEndpoint: string;
    if (mode === "Today") {
      axiosRequestEndpoint = "http://localhost:3003/meals/today";
    } else if (mode === "Daily") {
      axiosRequestEndpoint = "http://localhost:3003/meals/day/";
    } else {
      axiosRequestEndpoint = "http://localhost:3003/meals/day/";
    }
    console.log("Page has requested meals by day");
    axios
      .get(axiosRequestEndpoint)
      .then((res) => {
        setData(res.data);
        console.log("Data received", JSON.stringify(res.data));
      })
      .catch((error) => {
        console.error(
          "Error fetching data, axios fetch meals by day failed: ",
          error
        );
      });
    const dailyTotalEndpoint = "http://localhost:3003/meals/today/totalcal";
    axios
      .get(dailyTotalEndpoint)
      .then((res) => {
        setTotals(res.data);
        console.log("Received daily totals", res.data);
      })
      .catch((err) => console.log("failed at daily total: " + err));
  }, [mode]);
  if (mode === "Today") {
    return (
      <>
        <Minigreeter label="Meals Today: "></Minigreeter>
        <div className="meal-button-group-flex">
          <button
            className="meal-button-selected"
            onClick={() => {
              setMode("Today");
              clearData();
            }}
          >
            Today
          </button>
          <button
            onClick={() => {
              setMode("Daily");
              clearData();
            }}
          >
            Daily
          </button>
        </div>
        {dailyTotals.length > 0 && (
            <div className="totals">
              <h2>Totals:</h2>
              <h4>
                Total Calories:{" "}
                {dailyTotals.length > 0 &&
                  formatFloat(dailyTotals[0].total_calories)} (g)
              </h4>
              <h4>
                Total Protein:{"  "}
                {dailyTotals.length > 0 &&
                  formatFloat(dailyTotals[0].total_protein)} (g)
              </h4>
              <h4>
                Total Fat:{" "}
                {dailyTotals.length > 0 &&
                  formatFloat(dailyTotals[0].total_fat)} (g)
              </h4>
              <h4>
                Total Carbs:{" "}
                {dailyTotals.length > 0 &&
                  formatFloat(dailyTotals[0].total_carbs)} (g)
              </h4>
            </div>
          )}
          {/* {JSON.stringify(dailyTotals)} */}
        {/* <p>{JSON.stringify(data)}</p> */}
        {/* <div className="meal-flex">
          {data &&
            data.map((item) => {
              return <TodayMeal data={item} />;
            })}
        </div> */}
        <div className="meal-grid">
        {data &&
            data.map((item) => {
              return <TodayMeal data={item} />;
            })}
        </div>
      </>
    );
  } else {
    return (
      <>
        <Minigreeter label="Meals Sorted by Day: "></Minigreeter>
        <div className="meal-button-group-flex">
          <button
            onClick={() => {
              setMode("Today");
              clearData();
            }}
          >
            Today
          </button>
          <button
            className="meal-button-selected"
            onClick={() => {
              setMode("Daily");
              clearData();
            }}
          >
            Daily
          </button>
        </div>
        <div className="meal-flex">
          {data &&
            data.map((meal) => {
              return (
                <MealsByDayCard
                  title={convertISOStringToDate(String(meal["day"]))}
                  content={meal["Total Calories"]}
                  infolabel="Total Calories:"
                  deleteHandler={() => {
                    deleteEntriesMatchingDate(String(meal["day"]));
                  }}
                  editHandler={(msg) => {
                    console.log(msg + " for " + String(meal["day"]));
                    const value = String(meal["day"]);
                    axios
                      .get(`http://localhost:3003/meals/day/${value}`)
                      .then((response) => {
                        console.log(response.data);
                        navigate("/meals/editlist", { state: response.data });
                      });
                  }}
                  key={String(meal["day"])}
                />
              );
            })}
        </div>
      </>
    );
  }
}
export default Meals;
// Continue from here https://medium.com/@codingbeautydev/javascript-convert-json-to-map-49f95e4a6d21
