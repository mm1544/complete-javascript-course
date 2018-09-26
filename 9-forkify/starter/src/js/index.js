//[1]
import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';//[3] 
import { elements, renderLoader, clearLoader } from './views/base';

//[2]
/** Global state of the app
* - Search object
* - Current recipe object
* - Shopping list obj.
* - Liked recipes
**/
const state = {}; //starting with the empty state


/*
*SEARCH CONTROLLER
*/
const controlSearch = async () => {//**That is asynchronous f.
    // 1) Get query from view
    const query = searchView.getInput(); //[4] 
    console.log(query);

    // ***Creating a new search object
    if (query) { //[5] 

        // 2) New search object and add to state
        state.search = new Search(query); //[6] 

        // 3) Prepare UI for results
        //[7] 
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes); //renders the loader

        // 4) Search for recipes 
        //[8]
        await state.search.getResults(); //[9]

        // 5) Render results on UI

        //before rendering results, need to remove a 'loader':
        clearLoader();

        //[11]
        searchView.renderResults(state.search.result); //[10] 
    }
}

elements.searchForm.addEventListener('submit', e => {
    //[12] 

    e.preventDefault(); // stops default behaviour
    controlSearch();
});

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
const r = new Recipe(46956);

//calling 'getRecipe' method on 'r' object
r.getRecipe();
console.log(r);




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



*/






























// Global app controller

