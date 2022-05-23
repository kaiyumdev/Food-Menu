const searchFood = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  console.log(searchText);
  searchField.value = "";
  if(searchText == ''){
    alert("Please write something on display")
  }
  else{
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displaySearchResult(data.meals));
  }
};

const displaySearchResult = (meals) => {
  const searchResult = document.getElementById("search-result");
  // searchResult.innerHTML = '';
  searchResult.textContent = '';
  if(meals.length == 0){
    alert('Please enter valid name')
  }
  meals.forEach((meal) => {
    console.log(meal);
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `<div class="col">
        <div onclick="loadMealDetail(${meal.idMeal})" class="card h-100">
      <img width="300" src="${
        meal.strMealThumb
      }" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${meal.strMeal}</h5>
        <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
      </div>
    </div>
  </div>`;
    searchResult.appendChild(div);
  });
};

const loadMealDetail = async mealId => {
  // console.log(mealId);
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
  // console.log(url);
  const res = await fetch(url);
  const data = await res.json();
  displayMealDetail(data.meals[0]);
  // fetch(url)
  //   .then((res) => res.json())
  //   .then((data) => displayMealDetail(data.meals[0]));
  // console.log(data.meals[0]);
};

const displayMealDetail = (meal) => {
  console.log(meal);
  const mealDetails = document.getElementById("meal-details");
  mealDetails.textContent = '';
  const div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML = `
  <div class="card">
  <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${meal.strMeal}</h5>
    <p class="card-text">${meal.strInstructions.slice(0, 100)}</p>
    <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
  </div>
  </div>

  `;
  mealDetails.appendChild(div);
};
