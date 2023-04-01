async function searchMealsByIngredients(ingredients) {
    const apiKey = process.env.MEAL_DB_API_KEY;
    const apiUrl = `https://www.themealdb.com/api/json/v1/${apiKey}/filter.php?i=`;
    
    const searchUrl = apiUrl + ingredients.join(',');
    
    try {
      const response = await fetch(searchUrl);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  module.exports = {
	searchMealsByIngredients
}