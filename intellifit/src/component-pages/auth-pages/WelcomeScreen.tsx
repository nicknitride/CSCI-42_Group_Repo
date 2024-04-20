// import WelcomeNavbar from "./WelcomeNavbar";
// import "../MealList.css";
// import "../Meals.css";
// import "./WelcomeScreen.css";
// import Minigreeter from "../../components/Minigreeter";

// function WelcomeScreen() {
//   return (
//     <>
//       <WelcomeNavbar></WelcomeNavbar>
//       <Minigreeter label={"Welcome to Intellifit"} />
//       <div className="one-item-card">
//         <h1>What is intellifit?</h1>
//         <ul>
//             <li>It is a fitness application focused on simplicity and adaptability</li>
//         </ul>
//       </div>
//     </>
//   );
// }

// export default WelcomeScreen;
import React, { useState } from "react";
import WelcomeNavbar from "./WelcomeNavbar";
import "../MealList.css";
import "../Meals.css";
import "./WelcomeScreen.css";
import Minigreeter from "../../components/Minigreeter";
import { useNavigate } from "react-router-dom";

function WelcomeScreen() {
  const [index, setIndex] = useState(0);
  const titles = ["What is intellifit?", "A Fitness Application", "Features:"];
  const descriptions = [
    "It is a fitness application focused on simplicity and adaptability",
    "It allows you to track your macros and your weightlifting progress",
    "Data import/export, calorie/meal tracking, and exercise tracking with helpful stats!"
  ];
  const navigate = useNavigate();

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex === 0 ? titles.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex === titles.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <>
      <WelcomeNavbar />
      <div className="one-item-card">
        <h1>{titles[index]}</h1>
        <ul>
          <li>{descriptions[index]}</li>
        </ul>
        <div className="horizontal-flex" style={{gap:"5px"}}>
          <button onClick={handlePrev}>Previous</button>
          <button onClick={handleNext}>Next</button>
        </div>
        
      </div>
      { <>
        <div className="one-item-card">
            <p>Begin by either signing up or logging in</p>
        <div className="horizontal-flex" style={{gap:"5px", marginTop:"10px"}}>
        <button onClick={()=>{navigate("/signup")}}>Sign Up</button>
        <button onClick={()=>{navigate("/login")}}>Log In</button>
        </div>
        </div>
        </>}
    </>
  );
}

export default WelcomeScreen;