export type foodItem = {
    food_id: string;
    food_name: string;
    food_brand: string;
    protein_hundred_grams: number;
    carb_hundred_grams: number;
    fat_hundred_grams: number;
    protein_per_gram: number;
    carb_per_gram: number;
    fat_per_gram: number;
    cal_per_gram: number;
}

// Used in MealEditPage (from /meals/day endpoint)
export type MealDataQueryItem = {
    Calories: number;
    creation_date_mealfood: string;
    food_brand: string;
    food_name: string;
    meal_name: string;
    mealfood_id: number;
    serving_size: number;
    cal_per_gram: number;
    protein_per_gram: number;
    fat_per_gram: number;
    carb_per_gram: number;
  };

//   A set of mealDataQuery Items, used in MealList
  export type mealDataQuery = {
    Calories: number;
    creation_date_mealfood: string;
    food_brand: string;
    food_name: string;
    meal_name: string;
    mealfood_id: number;
    serving_size: number;
    cal_per_gram: number;
    protein_per_gram: number;
    fat_per_gram: number;
    carb_per_gram: number;
  }[];