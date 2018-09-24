import axios from 'axios';

/*
THEORY

// It is a convention to write model file name 
// with upper case letter



// have created Search.js and searchView.js
// files  and Index.js will be a controller.

//////////////////////////////////////////
// How named and default **imports and **exports 
// work in ES6 modules

//******************************************
// ***defaults exports
// We only use them when we want to EXPORT only 
// ***one thing from a module

// eg.

export default 'I am an exported string'; // so it will be exported from this file
*/









// Data for Search is the Query and the Search Results.
// The only thing that we will export from this model here will
// be *****this class***.
//!!!!!!!!!!!!!!!!!!!!!!!
export default class Search {
    // RECAP: For class always need to add constructor method, 
    // which is the method that is called as soon as we create a 
    // new object

    constructor(query) { //will need to specify 'query' parameter whenever new object of 'Search' class is created.
        this.query = query;

        //Will use a method in here, that we will use to **get results** for the ***search query***.
    }

    // This is acynchronous method of this class
    async getResults() {

        // Going to make http requests for AJAX call
        // 'fetch' doesn't work on all browsers

        // will use http requests library 'axios'(??)
        // We have installed it and now we need to ***import it.

        // 'axios' works the same way as fetch
        // 'axios' automaticaly returns JSON


        //    Search Parameters
        //key: API Key
        //q: (optional) Search Query (Ingredients should be separated by commas). If this is omitted top rated recipes will be returned.
        //sort: (optional) How the results should be sorted. See Below for details.
        //page: (optional) Used to get additional results


        //URL
        // https://www.food2fork.com/api/search
        // API KEY
        // d22e05225d28796a2a55f7512b1c058c

        //////////////////////////////////////////////////
        // It will do a **AJAX call** and will return a ***promise
        const key = 'd22e05225d28796a2a55f7512b1c058c';

        try {

            const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`); //THE RESOLVED VALUE OF THE PROMISE, WILL BE SAVED IN 'res' variable. 
            //console.log(res);


            // recipies will be saved in object
            this.result = res.data.recipes; // WHY 'this.result' is not in constructor??
            //console.log(this.result);

            //console.log(this.result);
        } catch (error) { // loging the error
            alert(error);
        }
    }
}

// Will have **query and corresponding **result both stored inside of ***Search object. That has some advantages(??)



































