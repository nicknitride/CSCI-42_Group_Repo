import "../component-pages/Meals.css"
type dailyMeal = {
    mealfood_id: number;
    food_name: string;
    meal_name:string;
    serving_size: number;
    protein_per_gram: number;
    cal_per_gram: number;
    fat_per_gram: number;
    carb_per_gram: number;
};
interface props{
    data : dailyMeal;
}

function TodayMeal({data} : props){
return(
<>
<div className="today-flex">
    <h3>{data.meal_name} : {data.food_name}</h3>
    <p>Calories: {data.cal_per_gram*data.serving_size}</p>
    <p>Carbohydrates: {data.carb_per_gram*data.serving_size}g</p>
    <p>Protein: {data.protein_per_gram*data.serving_size}g</p>
    <p>Fat: {data.fat_per_gram*data.serving_size}g</p>
</div>
</>
        );
}
export default TodayMeal;
