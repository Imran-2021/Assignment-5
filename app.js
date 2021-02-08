document.getElementById('search_btn').addEventListener('click', function () {
    document.getElementById('item-details').innerHTML=''
    document.getElementById('foot-container').innerHTML = ''
    document.getElementById('catchError').style.display='none'
    const search_meal = document.getElementById('search_meal').value;
    if (search_meal != '' ) {
        //Search meal by name
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
                //Lookup full meal details by id
                fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meals.idMeal}`)
                    .then(res => res.json())
                    .then(json => {
                        const mealsDetails = json['meals']
                        const item_details = document.getElementById('item-details')
                        mealsDetails.forEach(food => {
                            const foodDetail = document.createElement('div');
                            //here the single food details , when clicked over the div
                            foodDetail.innerHTML = `
                    <img src='${food.strMealThumb}'>
                    <h1>${food.strMeal}
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
    //catch the error food name
    .catch(error=>{
        document.getElementById('search_meal').value = '';
         document.getElementById('catchError').innerHTML=`
        <i  class="far fa-frown"></i>
        <h1>Hi, hungry! I am sad.No food found for you.</h1>`
        document.getElementById('catchError').style.display='block'
    })
    //alert when empty search clicked
}else{
    alert('write a food Name')
        }
})
