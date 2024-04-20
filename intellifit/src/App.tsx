import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./component-pages/Homepage";
import Workouts from "./component-pages/Workouts";
import Meals from "./component-pages/Meals"
import MealList from "./component-pages/MealList";
import MealEditPage from "./component-pages/MealEditPage";
import MealAddPage from "./component-pages/MealAddPage";
import ImportExport from "./component-pages/import-export-pages/ImportExport";
import FoodDBAdd_Edit from "./component-pages/FoodDBAdd_Edit";
import Login from "./component-pages/auth-pages/Login";
import SignUp from "./component-pages/auth-pages/SignUp";

function App() {
  return (
    <>
      <div className="background-wall"></div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workouts" element={<Workouts/>} />
        <Route path="/meals" element={<Meals />} />
        <Route path="/meals/editlist" element={<MealList />} />
        <Route path="/meal/edit/" element={<MealEditPage />} />
        <Route path="/meal/add/" element={<MealAddPage />} />
        <Route path="/fileops" element={<ImportExport />}/>
        <Route path="/fooddb" element={<FoodDBAdd_Edit/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </>
  );
}

export default App;
