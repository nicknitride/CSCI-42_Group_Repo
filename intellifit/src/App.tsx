import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./component-pages/Homepage";
import Workouts from "./component-pages/Workouts";
import Meals from "./component-pages/Meals"
import MealList from "./component-pages/MealList";
import MealEditPage from "./component-pages/MealEditPage";
function App() {
  return (
    <>
      <div className="background-wall"></div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workouts" element={<Workouts/>} />
        <Route path="/meals" element={<Meals />} />
        <Route path="/mealprep/editlist" element={<MealList />} />
        <Route path="/meal/edit/" element={<MealEditPage />} />
      </Routes>
    </>
  );
}

export default App;
