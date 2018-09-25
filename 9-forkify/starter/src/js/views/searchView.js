/*
THEORY
//**************************************
//If we want to export **multiple things from the same module, then we have to use ****'named export'.

// exporting f-ion:
export const add = (a, b) => a + b;
export const multiply = (a, b) => a * b;
export const ID = 23;
*/

import {elements} from './base';

// To read an input from an input form.
    // Need to return an input value of the field. SO will select DOM element, then will get the value, and will return it.
export const getInput = () => elements.searchInput.value; // getting input value. ***FOR ARROW f.: since it is just one line, it is **IMPLICIT RETURN***, I.E. WE DON'T NEED to write ***'return'



export const clearInput = () => { elements.searchInput.value = '';
} // we are NOT ***returning here anything, therefore need to wrap it into '{}' to **avoid implicit return**


 // 
export const clearResults = () => { 
    elements.searchResList.innerHTML = ''; // Html inside of 'searchResList' will be emptied
    elements.searchResPages.innerHTML = '';
};



// 'rendering' - lt. atvaizdavimas




//Limits the length of the recipe title length
// 'limit=17' - it is a ***default parameter***
const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = []; //!!! we can mutate 'const' array

    //need to test if the length of the title is longer than the limit, and only then need to shorten the title.
    if (title.length > limit) {
        //need to split title into its words and THEN use the 'reduce' method on the resulting array, which then allowes us to have an accumulator. That accumulator is like a variable that we can add to at each iteration of the loop.
        // In each itteration loop we will test if the current title length PLUS the next word are STILL in the word LIMIT.


        /*
        E.g.:
        'Pasta with tomato and spinach'
        acc:0 / acc + cur.length = 5 / newTitle = ['Pasta']
        acc:5 / 5 + 4 = 9 / newTitle = ['Pasta', 'with']
        acc:9 / 9 + 6 = 15 / newTitle = ['Pasta', 'with', 'tomato']
        acc:15 / 15 + 3 = 18 / newTitle = ['Pasta', 'with', 'tomato']
        acc:18 / 18 + 7 = 25 / newTitle = ['Pasta', 'with', 'tomato']
        */


            //***'reduce' loops through the array, 'cur' is current word of array at given iteration
        title.split(' ').reduce((acc, cur) => {
            if(acc + cur.length <= limit) {
                newTitle.push(cur);

            }
            //updating the accumulator by ***returning value, ***THAT HOW IT WORKS IN 'REDUCE' f-ion
            return acc + cur.length;
        }, 0); //**spliting by the 'space' and turning into an **array
        // THEN we use 'reduce' and passing a ***callback f-ion, which has the ***accumulator and the **current value** as the INPUT.
        // **second parameter of reduce() is INITIAL accumulator value =0

        // Will start with accumulator equal to 0, and through iterations will add to it.

        // return the result
        return `${newTitle.join(' ')}...`;

    } 
    return title;
};


// will re#eive 1 re#ipe
const renderRecipe = recipe => {

    // This will ****generate a variable containing a markup****, that we want to print
    const markup = `
    <li>
        <a class="results__link" href="#${recipe.recipe_id}">
                        <figure class="results__fig">
                            <img src="${recipe.image_url}" alt="${recipe.title}">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                            <p class="results__author">${recipe.publisher}</p>
                        </div>
                    </a>
                </li>
                `;
                // ***Need to render it TO DOM***; should put it back to html file, into class='results__list'. 
                // ***Will add it to base.js file, to the elements object

                // ***'insertAdjacentElement'
    elements.searchResList.insertAdjacentHTML('beforeend', markup); // this will be exe#uted 30 times, i.e. on#e for ea#h re#ipe

};

// F-ion that ***renders a button
// 'type': 'prev' ot 'next'
// 'page': nr of the page that we are currently in
const createButton = (page, type) => `
<!-- in html5 there is ***'Data Atributes'... So we can use 'data' and the can specify a random name, AND THEN can use the number that we want to use on that button. We will use this peoperty when we will attach event handler to these buttons
-->

<button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
    <span>${type === 'prev' ? page - 1 : page + 1}</span>
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
    </svg>
</button>
`; // returns markup text string, that needs to be inserted in main html code (?)


//Rendering 'page' action buttons according to the 
// number of the page, that we are on
//          (it is private f-ion)
const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);

    let button; // 'const' and 'let' in ES6 they are ***block scoped***, therefore 'button' neeeds to be declared outside of if(){} block. If declared inside, it is not going to be available OUTSIDE of it. Nor using 'const' coz will reassign it.
    if (page === 1 && pages > 1){
        // Need to render the button just to go to the NEXT page, when on the First page, AND there is are more than one page
        button = createButton(page, 'next'); // needs to be assigned to the variable

    } else if (page < pages) {
        //if in the middle pages, need to render both:- NEXT and BACK buttons.
        button =`${createButton(page, 'prev')}
        ${createButton(page, 'next')};
        `; // Strings contains the result of calling f-ion 'createButton' twice
    }
    
    else if (page === pages && pages > 1) { // if it is the LAST page, render just button to go to the PREVIOUS page
        button = createButton(page, 'prev');
    };

    //Inserting button into DOM
    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};



// That is the f-ion, that will be called whenever we click on on eof the buttons
// will receive all the recipes (array of 30 recipes), and will need to pass in to it the page, that we want to display. And will pass results per page.
export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    // RENDER RESULTS OF CURRENT PAGE
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    // 'recipes' - is the array of 30 recipes
    // 'forEach' - to loop through array

    // will use 'slice' method to take just a part of an array. First argument of it is the start point of copying the array, 
    recipes.slice(start, end).forEach(renderRecipe); // NOTE: It will ***automatically pass items from array to 'renderRecipe' f-ion***

    // RENDER PAGINATION BUTTONS
renderButtons(page, recipes.length, resPerPage);
}



































