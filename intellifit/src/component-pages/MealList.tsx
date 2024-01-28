import { useLocation } from "react-router-dom";

function MealList (){
    const location = useLocation();
    const data = location.state;
    console.log(data);
    // Construct an SQL Query for the specific date provided here
    return (
    <>
    <p>Test Meal</p>
    <p>{data}</p>
    </>
    );
}
export default MealList;