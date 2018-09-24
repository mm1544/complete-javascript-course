
/*
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


*/

/*
AJAX - Asynchronous JavaScript And Xml
It alloves asynchronously comunicate with remote servers.

Eg.
Let say we have JS App running in Browser, which is called 'client', AND we want some data from our server. BUT WITHOUT HAVING TO RELODE THE ENTIRE PAGE. With AJAX we can do ***''get'' Http request to our server, which will then send a ***response CONTAINING THE DATA THAT WE HAVE REQUESTED. 
AND ALL THIS HAPPENS ASYNCHRONOUSLY IN THE BACKGROUND.

It not only works for ***getting data from the server, but ALSO to ***send DATA to the server, BY DOING ***''post'' request .

In practice there are many ways in which we can use AJAX in JS.

*/

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

import Search from './models/Search';
import * as searchView from './views/searchView';// importing all of the f-ions. '*' indicates 'all'; 'searchView' will be an object where all the impoerted vars from 'searchView' module will be stored
import {elements, renderLoader, clearLoader} from './views/base';

/** Global state of the app
* - Search object
* - Current recipe object
* - Shopping list obj.
* - Liked recipes
*/
const state = {}; //starting with the empty state
            // Listener for 'submit' event

                      //**That is asynchronous f.
const controlSearch = async () => {
    // 1) Get query from view
    const query = searchView.getInput(); // coz we have imported 'searchView' module
    console.log(query);
    
    // ***Creating a new search object
    if(query) { // if there is a 'query
        // 2) New search object and add to state
        state.search = new Search(query); // this Search obj. contains 'query'
        
        // 3) Prepare UI for results
                // clearing previous results; showing loading spinner; ...
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes); // renders the loader

        // clear results from the previous search:

        
        // 4) Search for recipes 
        //**Since 'controlSearch' is ***async f-ion, we CAN USE 'AWAIT'. 'state.search.getResults();' WILL RETURN A 'PROMISE'. why? - ***EVERY ASYNC F-ION AUTOMATICALY RETURNS A PROMISE****
        await state.search.getResults(); // we have to 'await' until the **promise **resolves and comes back with Data. Here we are GETTING results from API call


        
        
        // 5) Render results on UI

        //before rendering results, need to remove a 'loader':
        clearLoader();

                // We want this to happen after we will receive the results from API
        searchView.renderResults(state.search.result);   // The result is stored inside of 'state' element; as well we have imported f-ions from the 'searchView'
    }
}

elements.searchForm.addEventListener('submit', e => {
    //That is 'calback f-ion'
    // passing ***'event' object 'e'*** into it
    
    e.preventDefault(); // stops default behaviour
    controlSearch();
} );





//////////////////////////////////////////////
//////////////////////////////////////////////
// Controller will be placed in here
/////////////////////////////////////////////
// Each model and each view will get its ***own file*** for each of the functionality.
// ****FOR CONTROLLERS:- all of them will be located in the same file.

//*************************************************
//Q: What is the ***state*** for app in any given moment?
//A: All of the 'things' (e.g.: current search query; current recipe; number of servings that currently are calculated; items that are currently in the shopping list, etc.) in one given moment is the STATE. SO ALL OF THIS DATA IS A STATE. AND WE WANT THAT TO BE IN ****ONE CENTRAL PLACE*** i.e. - one central variable, like an object in which we have all the data that defines app in the given moment. 



































// Global app controller

