import DynamicList from "../components/DynamicList";
import Minigreeter from "../components/Minigreeter";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./auth-pages/AuthContext";
import React from "react";
import { useState } from "react";

// const testList = ["Carrots - 100g", "Veal - 200g"];
// const testList2 = ["Apples - 100g", "Burrito - 200g", "Corn Bread - 400g"];

function Home() {
    const navigate = useNavigate();
    const [toggleSettings, setToggleSettings] = useState(false);
    const {setLoggedInUser, loggedInUser} = React.useContext(AuthContext);
  return (
    <>
      <Minigreeter label="Home Dashboard: "></Minigreeter>
      <div className="meal-option-flex-container">
        <button className="meal-option" onClick={()=>{setLoggedInUser(null)}}>Log Out</button>
        <button className={toggleSettings ? "meal-option meal-button-selected": "meal-option"}
        onClick={()=>{setToggleSettings(!toggleSettings)}}
        >Edit/View User Settings and Goals</button>
      </div>
      {toggleSettings && 
      <>
        <h1 style={{marginLeft:"10px"}}>User Settings and Info: </h1>
        <div className="one-item-card">
          <h1>Hi, {loggedInUser}!</h1>
          <p>Welcome to IntelliFit.</p>
        </div>
      </>
      }
      {!toggleSettings && <>
      <div className="user-info">
        <h1 style={{marginLeft:"10px"}}>Nutrition Stats: </h1>
      </div>
      </>}
    </>
  );
}
export default Home;
