import {elements} from './base';
import { Fraction} from 'fractional'; //for the external pa#kage instaled through the npm we DON'T need to include the ***path

export const clearRecipe = () => {
    elements.recipe.innerHTML = '';
}

// will pass the number and will return a formated string
const formatCount = count => {
    if (count) {
        //e.g. count = 2.5 --> 2 1/2
        //e.g. count = 0.5 --> 1/2

        //using destructuring, i.e. we can **define two wariables at the same time
        const [int, dec] = count.toString().split('.').map(el => parseInt(el, 10)); // so we will get an array of strings e.g. [2, 5]. We need anew array with them as NUMBERS, therefore using 'map()'
        if (!dec) return count; // if there is NO decimal part

        if (int === 0) { //e.g. count = 0.5 --> 1/2
            const fr = new Fraction(count); // based on 'count' it will create a fraction, AND from there we can read enumerator and denuminator
            return `${fr.numerator}/${fr.denominator}`;

        } else { //e.g. count = 2.5 --> 2 1/2
            const fr = new Fraction(count - int);
            return `${int} ${fr.numerator}/${fr.denominator}`;

        }
    }
    return '?'; // for 'undefined' #ase
};


//It will return a string
const createIngredient = ingredient =>`
    <li class="recipe__item">
        <svg class="recipe__icon">
            <use href="img/icons.svg#icon-check"></use>
        </svg>
        <div class="recipe__count">${formatCount(ingredient.count)}</div>
        <div class="recipe__ingredient">
            <span class="recipe__unit">${ingredient.unit}</span>
            ${ingredient.ingredient}
        </div>
    </li>
`;

export const renderRecipe = (recipe, isLiked) => {
    // render the markup
    const markup = `
            <figure class="recipe__fig">
                <img src="${recipe.img}" alt="${recipe.title}" class="recipe__img">
                <h1 class="recipe__title">
                    <span>${recipe.title}</span>
                </h1>
            </figure>

            <div class="recipe__details">
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="img/icons.svg#icon-stopwatch"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
                    <span class="recipe__info-text"> minutes</span>
                </div>
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="img/icons.svg#icon-man"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
                    <span class="recipe__info-text"> servings</span>

                    <div class="recipe__info-buttons">
                        <button class="btn-tiny btn-decrease">
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-minus"></use>
                            </svg>
                        </button>
                        <button class="btn-tiny btn-increase">
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-plus"></use>
                            </svg>
                        </button>
                    </div>

                </div>
                <button class="recipe__love">
                    <svg class="header__likes">
                        <use href="img/icons.svg#icon-heart${isLiked ? '' : '-outlined'}"></use>
                    </svg>
                </button>
            </div>



            <div class="recipe__ingredients">
                <ul class="recipe__ingredient-list">
                    <!-- !!! 'recipe.ingredients' - is the array of obje#ts -->
                    ${recipe.ingredients.map(el => createIngredient(el)).join(' ')}
                    <!-- IT WILL RETURN AN ARRAY, WHERE EACH ELEMENT IS THE STRING OF THE MARKUPS, BUT WE DONT WANT AN ARRAY IN HERE, THEREFORE WE JOIN ARRAY WITH join() -->

                    

                </ul>

                <button class="btn-small recipe__btn recipe__btn--add">
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-shopping-cart"></use>
                    </svg>
                    <span>Add to shopping list</span>
                </button>
            </div>

            <div class="recipe__directions">
                <h2 class="heading-2">How to cook it</h2>
                <p class="recipe__directions-text">
                    This recipe was carefully designed and tested by
                    <span class="recipe__by">${recipe.author}</span>. Please check out directions at their website.
                </p>
                <a class="btn-small recipe__btn" href="${recipe.url}" target="_blank">
                    <span>Directions</span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-right"></use>
                    </svg>

                </a>
            </div>
    `;

    elements.recipe.insertAdjacentHTML('afterbegin', markup);
};

// We don't know beforehand how many ingreadients there are going to be, SO we need to **use a loop**. We will take our in gredient and will looop over them.



export const updateServingsIngredients = recipe => {
    //Update servings
    document.querySelector('.recipe__info-data--people').textContent = recipe.servings; // need to do querySelector because this element is not yet there, at the time we load the page. We are looking for ingreadient count. Changing the text content. 

    //Update ingredients
        //will sele#t all of the ingredient #ounts and will update them one by one
    const countElements = Array.from(document.querySelectorAll('.recipe__count'));
    countElements.forEach((el, i) => {
        //will #hange the text #ontent of ea#h of the element
        el.textContent = formatCount(recipe.ingredients[i].count);
    });

    
};



























