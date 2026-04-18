import "../component-pages/Meals.css"
import formatFloat from "../formatting_functions/formatFloat" 
import { MealDataQueryItem } from "../component-pages/Types/mealTypes";

interface props{
    data : MealDataQueryItem;
}

function TodayMeal({data} : props){
if (!data || !data.food_name) return null;
return(
<>
<div className="today-flex" key={data.mealfood_id}>
    <h3>{data.food_name}</h3>
    <h4> 🥚 {data.meal_name} | 🏪 {data.food_brand}</h4>
    <p>Calories: {formatFloat(data.cal_per_gram*data.serving_size)}</p>
    <p>Serving: {formatFloat(data.serving_size)} (g)</p>
    <p>Carbohydrates: {formatFloat(data.carb_per_gram*data.serving_size)} (g)</p>
    <p>Protein: {formatFloat(data.protein_per_gram*data.serving_size)} (g)</p>
    <p>Fat: {formatFloat(data.fat_per_gram*data.serving_size)} (g)</p>
    {/* <p>{data.creation_date_mealfood}</p> */}
</div>
</>
);
}
export default TodayMeal;
