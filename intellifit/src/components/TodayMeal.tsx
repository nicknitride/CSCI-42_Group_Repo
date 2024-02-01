import "../component-pages/Meals.css"
import formatFloat from "../formatting_functions/formatFloat" 
type dailyMeal = {
    mealfood_id: number;
    food_name: string;
    meal_name:string;
    serving_size: number;
    protein_per_gram: number;
    cal_per_gram: number;
    fat_per_gram: number;
    carb_per_gram: number;
    food_brand: string;
};
interface props{
    data : dailyMeal;
}



function TodayMeal({data} : props){
return(
<>
<div className="today-flex">
    <h3>{data.food_name}</h3>
    <h4>{data.food_brand}</h4>
    <p>Calories: {formatFloat(data.cal_per_gram*data.serving_size)}</p>
    <p>Serving: {formatFloat(data.serving_size)} (g)</p>
    <p>Carbohydrates: {formatFloat(data.carb_per_gram*data.serving_size)} (g)</p>
    <p>Protein: {formatFloat(data.protein_per_gram*data.serving_size)} (g)</p>
    <p>Fat: {formatFloat(data.fat_per_gram*data.serving_size)} (g)</p>
</div>
</>
        );
}
export default TodayMeal;
