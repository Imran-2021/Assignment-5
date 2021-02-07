document.getElementById('search_btn').addEventListener('click', function () {
    document.getElementById('item-details').innerHTML=''
    const search_meal = document.getElementById('search_meal').value;
    if ( search_meal != ''|| undefined) {
    
    
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search_meal}`)
        .then(res => res.json())
        .then(json => {
            const meals = json['meals'];
            const foodContainer = document.getElementById('foot-container');
            meals.forEach(meals => {
                const foodDiv = document.createElement('Div')
                foodDiv.class = 'meals'
                const mealsDetails = `
        <img src='${meals.strMealThumb}'>
        <h3>${meals.strMeal} </h3>`
            foodDiv.innerHTML = mealsDetails;
            foodContainer.appendChild(foodDiv);
            document.getElementById('search_meal').value = '';
            foodDiv.addEventListener('click', function () {
                foodContainer.innerHTML = ''
                fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meals.idMeal}`)
                    .then(res => res.json())
                    .then(json => {
                        const mealsDetails = json['meals']
                        const item_details = document.getElementById('item-details')
                        mealsDetails.forEach(food => {
                            const foodDetail = document.createElement('div');
                            foodDetail.innerHTML = `
                    <img src='${food.strMealThumb}'>
                    <h1>${food.strMeal}</h1>
                    <h2>ingredient</h2>
                    <p><i class="fas fa-hamburger"></i>-${food.strMeasure1} ${food.strIngredient1}</p>
                    <p><i class="fas fa-hamburger"></i>-${food.strMeasure2} ${food.strIngredient2}</p>
                    <p><i class="fas fa-hamburger"></i>-${food.strMeasure3} ${food.strIngredient3}</p>
                    <p><i class="fas fa-hamburger"></i>-${food.strMeasure4} ${food.strIngredient4}</p>
                    <p><i class="fas fa-hamburger"></i>-${food.strMeasure5} ${food.strIngredient5}</p>
                    <p><i class="fas fa-hamburger"></i>-${food.strMeasure6} ${food.strIngredient6}</p> `
                    item_details.appendChild(foodDetail);
                    })
                })
            })
        });
    })
 }else{
     alert('Hi,Hungry.please write your food Name ')
 }
})
