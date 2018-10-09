//[1]
import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';//[3] 
import * as recipeView from './views/recipeView';//[3] 
import * as listView from './views/listView';//[3] 
import * as likesView from './views/likesView';//[3] 
import { elements, renderLoader, clearLoader } from './views/base';
//import Likes from './models/Likes';

//[2]
/** Global state of the app
* - Search object
* - Current recipe object
* - Shopping list obj.
* - Liked recipes
**/
const state = {}; //starting with the empty state

/*
// makes the state available in th e'global window' obj. for testing
window.state = state;
*/

/*
*SEARCH CONTROLLER
*/
const controlSearch = async () => {//**That is asynchronous f.
    // 1) Get query from view
    const query = searchView.getInput(); //[4] 

    /*
    //FOR TESTING:
    const query = 'pizza'; //[4] 
    //console.log(query);
    */

    // ***Creating a new search object
    if (query) { //[5] 

        // 2) New search object and add to state
        state.search = new Search(query); //[6] 

        // 3) Prepare UI for results
        //[7] 
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes); //renders the loader

        try {

            // 4) Search for recipes 
            //[8]
            await state.search.getResults(); //[9]

            // 5) Render results on UI

            //before rendering results, need to remove a 'loader':
            clearLoader();

            //[11]
            searchView.renderResults(state.search.result); //[10]

        } catch (err) {
            alert('Something is wrong with search!');
            clearLoader();
        }

    }
}

elements.searchForm.addEventListener('submit', e => {
    //[12] 

    e.preventDefault(); // stops default behaviour
    controlSearch();
});

/*
//FOR TESTING
window.addEventListener('load', e => {
    //[12] 

    e.preventDefault(); // stops default behaviour
    controlSearch();
});
*/


// 'e' - is the event, i.e. a 'click' in this case
elements.searchResPages.addEventListener('click', e => {
    //[13]
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);//[14]

        searchView.clearResults(); //[15]
        searchView.renderResults(state.search.result, goToPage);
    }
})
//[16]


/*
*RECIPE CONTROLLER
*/
const controlRecipe = async () => {

    //Get ID from URL
    const id = window.location.hash.replace('#', ''); //[18]


    if (id) { //[19]
        // Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe); //passing in the PARENT, so the loader knows where to 'display itself'

        //Highlight selected search item (it happens as soon as we load recipe)
        if (state.search) {
            //if this exists then it means that it was a search

            searchView.highlightSelected(id);
        }



        // Create new recipe object
        state.recipe = new Recipe(id); //[20]

        /*
        //FOR TESTING
        window.r = state.recipe; // now we have a##ess to re#ipe obje#t in the #onsole, be#ause now it is on our ***global window obje#t***
        */

        // in case there is no errors with eg. getting data
        try {
            // Get recipe data AND parse ingredients
            await state.recipe.getRecipe(); //[21] 

            state.recipe.parseIngredients();

            // Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            // Render recipe to UI
            // clearing the loader
            clearLoader();
            recipeView.renderRecipe(
                state.recipe,
                state.likes.isLiked(id)); // passing the recipe and current 'like' state (T/F)

        } catch (err) {
            console.log(err);
            alert('Error processing recipe!');
        }
    }
};

//[17]

//[23]

//same event listener for different events
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe)); //[24]



/*
*LIST CONTROLLER
*/
const controlList = () => {
    //# Create a new list if there is NONE yet
    //(e.g. we add ingredients of the recipe to the list, then open another recipe and add another ingredients as well... IN this case we **don't want to create ***new list)
    if (!state.list) state.list = new List(); // ..if there is no list..
    // We ***don't pass anything to the list, just initialising it.


    //# Add each ingredient to the list AND UI
    // 'ingredients' is an array, so we will loop through it and for each element in array, we will add new element to the list
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient); // sawing ***returnde item
        listView.renderItem(item);
    });
}



// Handling delete and update **list item events** 
// Q: Where those events need to be catched?
// A: they are ON 'elementsd.shopping'
elements.shopping.addEventListener('click', e => {

    //FIRST: Need to try to read an ID of the lement that ve have clicked on. I.e. we are trying to retrieve 'data-itemid=${item.id}'.
    const id = e.target.closest('.shopping__item').dataset.itemid;
    // Using 'closest' met. because we need to ***specificaly find the element which contains **id that we want to read. I.e. we need specificaly find an element with the class 'shopping__item' ON IT, ***close to where the click has happend. AND THEN we can use 'dataset.itemid' to track the  id of the element that we have clicked.


    // Handle the delete button (of shopping list)
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {

        // if it is True, we want to delete from 'state' and UI
        state.list.deleteItem(id);
        listView.deleteItem(id);


        // Handle the count update
    } else if (e.target.matches('.shopping__count-value')) {
        //need to read the data from the **interface, AND the update it in our 'statte'

        // 'val' will be stored **in the element that was clicked (??)**. Our target is that exact **input element**
        //So we need to read the current value of the element, WHICH was clicked:
        const val = parseFloat(e.target.value, 10);

        //updating 'state'
        state.list.updateCount(id, val);


    } // ****Using 'matches' because it is going to return ***True or False value. What we are trying to test here is if our **'target' matches 'shopping__delete' class (it is the class of delete button). SO we have to test if it is the one that we clicked on.
});



/*
*LIKE CONTROLLER
*/

const controlLike = () => {

    // if there is no such 'state.likes', then it will be created:
    if (!state.likes) state.likes = new Likes();

    //TWO DIFFERENT STATES THAT CAN HAPPEN

    //1) Recipe that is already liked; when button is hit, then this recipe has to be removed from the list of liked recipes

    //2) Recipe is not yet liked


    const currentID = state.recipe.id;


    if (!state.likes.isLiked(currentID)) {
        // recipe is NOT liked yet


        // Add like to the state
        const newLike = state.likes.addLike(
            currentID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        ); // 'addLike' returns the newly added like which is saved in 'newLike'

        // Toggle the like button
        likesView.toggleLikeBtn(true);


        // Add like to the UI list
        likesView.renderLike(newLike);

    } else {

        // it is liked 


        // Remove like from the state
        state.likes.deleteLike(currentID);

        // Toggle the like button
        likesView.toggleLikeBtn(false);


        // Remove like to the UI list
        likesView.deleteLike(currentID);

    }

    likesView.toggleLikeMenu(state.likes.getNumLikes());

};

// Restore liked recipies on the page load (from localStorage)
window.addEventListener('load', () => {
    // Each time the page loads, we want to **create new Likes obj.

    state.likes = new Likes();

    // Restore likes
    state.likes.readStorage();

    // Toggle like menu button
    likesView.toggleLikeMenu(state.likes.getNumLikes());

    // Render the existing likes
    state.likes.likes.forEach(like => likesView.renderLike(like));

});


//Q: Where the NEW like is triggered?
//A: On the 'like' button, which ***is in the recipe**, SO we will control that click with the same event listenner.





//*********************************
// **HANDLING RECIPE BUTTON CLICKS
// need event handler for two buttons
// have to use ***event delegation*** coz those buttons are // NOT YET THERE BY THE TIME WE LOAD THE PAGE

// THIS EVENT LISTENER WILL HANDLE ALL THE EVENTS THAT HAPPEN INSIDE OF 'RECIPE' OBJECT. WE NEED TO DO THIS (?) BECAUSE WE NEED EVENT DELEGATION, BECAUSE ALL OF THESE ELEMENTS, THAT WE ARE TRYING TO SELECT HERE ARE NOT YET ON THE *DOM BY THE TIME WHEN WE LOAD UP THE PAGE

// attaching the event listenner to the 'elements.recipe' - that is the element that is already there at the load time.
elements.recipe.addEventListener('click', e => {
    // we will test what was clicked and will react accordingly; will use 'matches' method INSTEAD of 'closest'
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {// if 'target matchess '.btn-decrease', OR any child element of it. 
        // '.btn-decrease' - is the #lass name
        //Adding here 2 selectors. The se#ond one '.btn-decrease *' means '.btn-decrease' AND THEN ANY CHILD. It is like universal selector inside of this parent element. 

        //Decrease button is clicked
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);

        }

    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        // Increase button is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);

        // FOR THE BUTTON THAT ADDS INGREDIENTS TO SHOPPING LIST
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        //GOING TO TEST IF THE ELEMENT THAT WAS TARGETET, MATCHES THE STRING THAT WE ARE LOOKING FOR

        //'.recipe__btn--add *' - is a CSS **selector for all the child elements of this element. It is important to include it because the 'click' may happen not 


        //when the target matches '.recipe__btn--add' button, we will call 'controlList' f-ion.

        //Add ingredients to shopping list
        controlList();

    } else if (e.target.matches('.recipe__love, .recipe__love *')) {

        //Like controller
        controlLike();

    }
});

/*
// Creating a new List element to test List in the console
//and
//attaching to the global 'window' obj.:
window.l = new List();
*/



/*
[1]
THEORY: IMPORT-EXPORT

//1.
// Import (from default export)

import stingName from './models/Search'; // for import don't have to specify '.js'


//2.
////////////////////////////////
//NAMED Import from ***named export:

    //We have to specify what exactly we want to import from the module:
//import {add, multiply, ID} from './views/searchView';

//console.log(`Using imported f-ions! ${add(ID, 2)} and ${multiply(3, 5)}. ${stingName}`);


//3.
//////////////////////////////
// Third way of using import-export

// import ***everything:
import * as someName  from './views/searchView';

console.log(`****V3. Using imported f-ions! ${someName.add(someName.ID, 2)} and ${someName.multiply(3, 5)}. ${stingName}`);


AJAX - Asynchronous JavaScript And Xml
It alloves asynchronously comunicate with remote servers.

Eg.
Let say we have JS App running in Browser, which is called 'client', AND we want some data from our server. BUT WITHOUT HAVING TO RELODE THE ENTIRE PAGE. With AJAX we can do ***''get'' Http request to our server, which will then send a ***response CONTAINING THE DATA THAT WE HAVE REQUESTED. 
AND ALL THIS HAPPENS ASYNCHRONOUSLY IN THE BACKGROUND.

It not only works for ***getting data from the server, but ALSO to ***send DATA to the server, BY DOING ***''post'' request .

In practice there are many ways in which we can use AJAX in JS.



[2]
*** Global state of the app
* - Search object
* - Current recipe object
* - Shopping list obj.
* - Liked recipes
***

[3]
importing all of the f-ions. '*' indicates 'all'; 'searchView' will be an object where all the impoerted vars from 'searchView' module will be stored


[4]
coz we have imported 'searchView' module

[5]
if there is a 'query'

[6]
this Search obj. contains 'query'

[7]
clearing previous results; showing loading spinner; ...

[8]
**Since 'controlSearch' is ***async f-ion, we CAN USE 'AWAIT'. 'state.search.getResults();' WILL RETURN A 'PROMISE'. why? - ***EVERY ASYNC F-ION AUTOMATICALY RETURNS A PROMISE****

[9]
 we have to 'await' until the **promise **resolves and comes back with Data. Here we are GETTING results from API call

[10]
The result is stored inside of 'state' element; as well we have imported f-ions from the 'searchView'

[11]
 We want this to happen after we will receive the results from API

[12]
That is 'calback f-ion'. Passing ***'event' object 'e'*** into it

[13]
//will use the 'target' property (?) 
    //target referes to the place where exactly this event has happend.

    // 'closest' is receiving **selector. Selector that we want is the ***class of the button*** that we are looking for (button with 'btn-inline' class !!!!!)

    
    e.g.:
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
        <span>${type === 'prev' ? page - 1 : page + 1}</span>
    </button>

    //We are interested in the button with 'btn-inline' class... Sometimes we can accidently click on '<svg class="search__icon">' element, or on '<span>${type ==...' element, but we are only interested in on clicking  the button with 'btn-inline' class, SO WE USE 'CLOSEST' METHOD AND STATE THAT WE ARE ONLY INTERESTED IN ONES WITH CLASS 'btn-inline'... SO it will find the closest element with the 'btn-inline' class


[14]
will read the data that is stored in that 'data atribute'

[15]
clears the list befor rendering new one

[16]
//////////////////////////////////////////////
//////////////////////////////////////////////
// Controller will be placed in here
/////////////////////////////////////////////
// Each model and each view will get its ***own file*** for each of the functionality.
// ****FOR CONTROLLERS:- all of them will be located in the same file.

//*************************************************
//Q: What is the ***state*** for app in any given moment?
//A: All of the 'things' (e.g.: current search query; current recipe; number of servings that currently are calculated; items that are currently in the shopping list, etc.) in one given moment is the STATE. SO ALL OF THIS DATA IS A STATE. AND WE WANT THAT TO BE IN ****ONE CENTRAL PLACE*** i.e. - one central variable, like an object in which we have all the data that defines app in the given moment. 


// Problem: 
//          Where to attach event listeners to if the padination buttons are NOT YET created when the page is loaded (why can't we wait, and render buttons together with corresponding listeners??).
// We have to use ***EVENT DELEGATION***. Concept: - We attach the event listener to an element that is already in there, and then we try to figure out, where the click happend, so that we could take an action based on that.
// THE ELEMENT that is available at the load is 'class="results__pages"'. That is where we will put an event handler.!!!!

//How do we define where the click will happen? I.e. How to say that I want something to happen when I'm clicking on the 'button', when in reality I am clicking on the text or icon, AND NOT THE BUTTON ELEMENT ITSELF(whichone I'm looking for).
// For that we can use the 'closest' method

[17]
We can use the fact that we change the hashes (e.g. http://localhost:8080/#47025, so '#47025' is the HASH) whenever we click on one of those recipes, by using ***HASH change event*** in JS.

So the event 'hash change' is fired each time when the hash in URL is changes.

[18]
 'window.location' is the entire URL, AND if you use the 'hash' property on it, it will give the 'hash'.

 'replace('#', '')' - will replace '#' with Nothing



[19]
if we don't have an id, don't want to create Recipe obj


[20]
storing obj. in 'state.recipe'


[21]
we want this to happen asyncronously, so in the BACKGROUND AND IN THE WAY THAT ***THE REST OF THE CODE IS EXECUTED WHEN WE GET BACK WITH THE DATA FROM SERVER***

Therefore we will use 'await' and need 'async' in f-ion declaration

This 'await' can get rejected, therefore we need to wrap code into try...catch


[22]
need an event listenner to the 'load' event, which fires whenever the page is loaded


[23]
// event listener to change of 'hash'
window.addEventListener('hashchange', controlRecipe);

// event listenner to the 'load' event
window.addEventListener('load', controlRecipe); //[22]

// how to add the same event listener to different events?? That is usefull here because we are calling the same f-ion ('controlRecipe') for both - 'load' event and change of 'hash' event.


[24]
//// how to add the same event listener to different events??
// make array with two events, and adding a loop to it, WHERE each of the elements is **THE EVENT








*/






























// Global app controller

