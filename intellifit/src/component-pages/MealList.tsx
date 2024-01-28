import { useLocation } from "react-router-dom";

function MealList (){
    const historyState = useLocation();
    const data = historyState.state.value;
    return (
    <>
    <p>Test Meal</p>
    <p>{data}</p>
    </>
    );
}
export default MealList;