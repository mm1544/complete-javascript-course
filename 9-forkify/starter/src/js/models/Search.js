import axios from 'axios';
import {key, proxy} from '../config'; //[8]
//[1]
export default class Search {
    //[2]
    constructor(query) { //[3]
        this.query = query;
    }

    // This is **acynchronous method of this class
    async getResults() { //[4]

        try {
            const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`); //[5]

            // recipies will be saved in object
            this.result = res.data.recipes; //[6] 
        } catch (error) { // loging the error
            alert(error);
        }
    }
}
//[7] 




/*
[1]


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





// Data for Search is the Query and the Search Results.
// The only thing that we will export from this model here will
// be *****this class***.
//!!!!!!!!!!!!!!!!!!!!!!!

[2]
    // RECAP: For class always need to add constructor method, 
    // which is the method that is called as soon as we create a 
    // new object


[3]
//will need to specify 'query' parameter whenever new object of 'Search' class is created.


[4]

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
        


[5]
//THE RESOLVED VALUE OF THE PROMISE, WILL BE SAVED IN 'res' variable. 
            //console.log(res);

[6]
WHY 'this.result' is not in constructor??

[7]
Will have **query and corresponding **result both stored inside of ***Search object. That has some advantages(??)


[8]
'..' - meaning: one folder above
*/


































