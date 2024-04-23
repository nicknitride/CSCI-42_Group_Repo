import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./component-pages/Homepage";
import Workouts from "./component-pages/Workouts";
import Meals from "./component-pages/Meals";
import MealList from "./component-pages/MealList";
import MealEditPage from "./component-pages/MealEditPage";
import MealAddPage from "./component-pages/MealAddPage";
import ImportExport from "./component-pages/import-export-pages/ImportExport";
import FoodDBAdd_Edit from "./component-pages/FoodDBAdd_Edit";
import Login from "./component-pages/auth-pages/Login";
import SignUp from "./component-pages/auth-pages/SignUp";
import React, { useEffect } from "react";
import { AuthContext } from "./component-pages/auth-pages/AuthContext";
import WelcomeScreen from "./component-pages/auth-pages/WelcomeScreen";

import WorkoutsAddPage from "./component-pages/WorkoutsAddPage";
import WorkoutsAdd from "./component-pages/WorkoutsAdd";
function App() {
  const { loggedInUser } = React.useContext(AuthContext);
  useEffect(()=>{
    console.log(loggedInUser)
  },[loggedInUser])
  return (
    <>
      <div className="background-wall"></div>
      {loggedInUser && <Navbar />}
      <Routes>
        {!loggedInUser && (
          <>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<WelcomeScreen />} />
          </>
        )}
        {loggedInUser && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/meals" element={<Meals />} />
            <Route path="/meals/editlist" element={<MealList />} />
            <Route path="/meal/edit/" element={<MealEditPage />} />
            <Route path="/meal/add/" element={<MealAddPage />} />
            <Route path="/fileops" element={<ImportExport />} />
            <Route path="/fooddb" element={<FoodDBAdd_Edit />} />
            <Route path="/workouts" element={<Workouts/>} />
            <Route path="/workouts/add/" element={<WorkoutsAdd/>} />
            <Route path="/workouts/add/" element={<WorkoutsAddPage/>} />
            {/* <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} /> */}
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
