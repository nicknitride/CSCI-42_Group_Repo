import DynamicList from "../components/DynamicList";
import Minigreeter from "../components/Minigreeter";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./auth-pages/AuthContext";
import React from "react";

const testList = ["Carrots - 100g", "Veal - 200g"];
const testList2 = ["Apples - 100g", "Burrito - 200g", "Corn Bread - 400g"];

function Home() {
    const navigate = useNavigate();
    const {setLoggedInUser} = React.useContext(AuthContext);
  return (
    <>
      <Minigreeter label="Home Dashboard: "></Minigreeter>
      <DynamicList listProper={testList} listTitle="Morning Meal"></DynamicList>
      <DynamicList
        listProper={testList2}
        listTitle="Afternoon Meal"
      ></DynamicList>
      <div className="meal-option-flex-container">
        <button className="meal-option" onClick={()=>{setLoggedInUser(null)}}>Log Out</button>
      </div>
    </>
  );
}
export default Home;
