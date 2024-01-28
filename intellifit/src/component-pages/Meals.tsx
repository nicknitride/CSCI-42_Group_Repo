import axios from "axios";
import "./Meals.css"
import Minigreeter from "../components/Minigreeter";
import { useEffect, useState } from "react";
import OneItemCard from "../components/MealsByDayCard";

function convertISOStringToDate(isoString: string) {
  const date = new Date(isoString);
  // Format the date as "Month Day, Year, Hour:Minute AM/PM"
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return formattedDate;
}

function deleteEntriesMatchingDate(date: string){
  console.log("Triggered delete handler for "+ date);
  axios.delete(`http://localhost:3003/mealsbyday/${date}`)
  .then(response =>{
    console.log(response.data);
    console.log("Deleted entry successfully")
    window.location.reload()//Reload webpage after deletion
  })
}

function Meals() {
  const [data, setData] = useState([]);
  useEffect(() => {
    console.log("Page has requested meals by day");
    axios
      .get("http://localhost:3003/mealsbyday")
      .then((res) => {
        setData(res.data);
        console.log("Data received", JSON.stringify(res.data));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Minigreeter label="Meal Dashboard: "></Minigreeter>
      <div className="meal-flex">
      {data &&
        data.map((meal) => {
          return (
            <OneItemCard
              title={convertISOStringToDate(String(meal["day"]))}
              content={meal["Total Calories"]}
              infolabel="Total Calories:"
              deleteHandler={()=>{deleteEntriesMatchingDate(String(meal["day"]))}}
              key={String(meal["day"])
            }
            />
          );
        })}
      </div>
      
    </>
  );
}
export default Meals;
// Continue from here https://medium.com/@codingbeautydev/javascript-convert-json-to-map-49f95e4a6d21
