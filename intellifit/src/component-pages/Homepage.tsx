import DynamicList from "../components/DynamicList";
import Minigreeter from "../components/Minigreeter";
import { useNavigate } from "react-router-dom";

const testList = ["Carrots - 100g", "Veal - 200g"];
const testList2 = ["Apples - 100g", "Burrito - 200g", "Corn Bread - 400g"];

function Home() {
    const navigate = useNavigate();
  return (
    <>
      <Minigreeter label="Home Dashboard: "></Minigreeter>
      <DynamicList listProper={testList} listTitle="Morning Meal"></DynamicList>
      <DynamicList
        listProper={testList2}
        listTitle="Afternoon Meal"
      ></DynamicList>
      <div className="meal-option-flex-container">
        <button className="meal-option" onClick={()=>{navigate("/signup")}}>Sign Up</button>
        <button className="meal-option" onClick={()=>{navigate("/login")}}>Log In</button>
      </div>
    </>
  );
}
export default Home;
