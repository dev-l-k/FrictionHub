const search = document.getElementById("search");
const recipes = document.getElementById("recipes");
const status = document.getElementById("status");
function checkEvent(event){
    if(event.key === "Enter"){
        searchRecipes();
    }
}
async function searchRecipes() {
    let query = search.value.trim();
    if(query===""){
        status.textContent="Enter a recipe or ingredient";
        status.className = "status error";
        return;
    }
    recipes.innerHTML = "";
    status.textContent="Searching...";
    status.className="status";
    try{
        let response = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s="+encodeURIComponent(query));
        if(!response.ok){
            throw new Error();

        }
        let data = await response.json();
        showRecpies(data.meals);
    } catch{
        status.textContent="Could not load recipes";
        status.className="status error";

    }
    
}
function showRecpies(meals){
    recipes.innerHTML="";
    if(!meals){
        status.textContent = "No recipe found";
        return;
    }
    status.textContent="Found some recipes..";
    for(let meal of meals){
        recipes.innerHTML+=`
        <div class="recipe">

                <img
                    src="${meal.strMealThumb}"
                    alt="${meal.strMeal}"
                    loading="lazy"
                >

                <div class="recipe-content">

                    <h3>
                        ${meal.strMeal}
                    </h3>

                    <p class="category">
                        ${meal.strCategory || "Unknown category"}
                        ${meal.strArea
                            ? " • " + meal.strArea
                            : ""}
                    </p>

                    <button
                        class="btn-small details"
                        onclick="showRecipe('${meal.idMeal}')"
                    >
                        View Recipe
                    </button>

                </div>

            </div>
        `;
    }
}
async function showRecipe(id) {
    try{
        let response = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i="+id);
        let data = await response.json();
        let meal = data.meals[0];
        let ingredients ="";
        for(let i=1;i<=20;i++){
            let ingredient=meal["strIngredient"+i];
            let measure = meal["strMeasure"+i];
            if(ingredient && ingredient.trim() !== ""){
                ingredients += `
                 <li>
                        ${measure || ""} ${ingredient}
                    </li>

                `;
            
            }
        }
        recipes.innerHTML = `
        <div class="card">

                <img
                    src="${meal.strMealThumb}"
                    alt="${meal.strMeal}"
                    style="
                        width:100%;
                        max-height:400px;
                        object-fit:cover;
                        border-radius:12px;
                    "
                >

                <h2>
                    ${meal.strMeal}
                </h2>

                <p class="muted">
                    ${meal.strCategory || ""}
                    ${meal.strArea
                        ? " • " + meal.strArea
                        : ""}
                </p>

                <h3>Ingredients</h3>

                <ul>
                    ${ingredients}
                </ul>

                <h3>Instructions</h3>

                <p style="white-space: pre-line;">
                    ${meal.strInstructions || "No instructions available."}
                </p>

                ${
                    meal.strYoutube
                    ? `
                        <a
                            href="${meal.strYoutube}"
                            target="_blank"
                            class="btn-primary"
                        >
                            Watch Video
                        </a>
                    `
                    : ""
                }

                <button
                    class="btn-small"
                    onclick="searchRecipes()"
                    style="margin-top:10px"
                >
                    ← Back to Results
                </button>

            </div>
        `;
        status.textContent="";

    }catch{
        status.textContent="Could not load recipes";
        status.className ="status error";
    }
}
function updateTime(){
    const clock = document.getElementById('time');
    const time = new Date().toLocaleTimeString();
    clock.textContent = time;
}
updateTime();
setInterval(updateTime,1000);