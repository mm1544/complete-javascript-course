import axios from 'axios';
import {key, proxy} from '../config'; //[4]

export default class Recipe {

    constructor(id) { //[1]

        this.id = id; //[2] 
    }

    async getRecipe() {
        try {
            const res = await axios(`${proxy}https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`); //[3] 

            //saving aquired data to the **same object
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.ingredients = res.data.recipe.ingredients;
            this.url = res.data.recipe.source_url;
        } catch (error) {
            console.log(error);
            //alert('Something went wrong :(');
        }
    }

    // calculates *estimated preparation time
    calcTime() {

        //assume for every 3 ingrediants we need 15min
        
        const numIng = this.ingredients.length

        //calc how many 15min *periods we have (?)
        const periods = Math.ceil(numIng / 3);
        this.time = period * 15;
    }

    // Number of servings. Just a guess
    calcServings() {
        this.servings = 4;
    }
}
//[5] 


/*# Overview
Will use 'axios' for AJAX call. 
Will create a Class for Recipe, that will hold data for one recipe object

[1] 
when we create new Recipe **object we will pass an id of relevant Recipe.

[2] 
Based on id, later we can do AJAX call IN ORDER TO GET THE REST OF THE DATA FOR THE RECIPE

[3] 
Result of what we await from the AJAX call by using 'axios'.
This 'axios' call will return a promise, which we **await because we are in ***async f-ion.

async...await is probably the best way of using asynchronous JS

[4]
'..' - meaning: one folder above

[5]
Will import this recipe model to main controller and then will create a new Recipe obj. from it


*/

