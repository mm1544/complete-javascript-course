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
            alert('Something went wrong :( ');
        }
    }

    // calculates *estimated preparation time
    calcTime() {

        //assume for every 3 ingrediants we need 15min
        
        const numIng = this.ingredients.length;

        //calc how many 15min *periods we have (?)
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }

    // Number of servings. Just a guess
    calcServings() {
        this.servings = 4;
    }


    parseIngredients() {
        
        const unitsLong = ['tablespoons', 'tablespoon', 'ounce', 'ounces', 'teaspoon', 'teaspoons', 'cups', 'pounds']; // will loop through this array and see if some of the units is there, and if it is, then we will replace it by the short verssion
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        
        //It will allow to recognise 'kg' and 'g' as units
        const units = [...unitsShort, 'kg', 'g' ] // ***destru#turing, i.e. instead of having array inside array, 'unitsShort' will be destructured, i.e. elements will be 'taken out' and put into 'units' array


        // will create a new array, with some new ingreadients, based on some old ones
        const newIngredients = this.ingredients.map(el => {
            //'map' takes an element and uses it in calback f-ion

            // 1) Uniform units
                //Will create two arrays. In one array we will have the 'units' as they appear in 'ingreadients', in second array we will have them written exactly like we want them to be
            let ingredient = el.toLowerCase(); // 'ingredient' is each of the elements of the array
            unitsLong.forEach((unit, i) => {
                //we need both - the current element and current index
                ingredient = ingredient.replace(unit, units[i]); // if it founds the long word in the 'ingredient', then it will be replaced with the short word at the same position from the array of corresponding short word's array

            });


            // 2) Remove parentheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' '); // ***regular expression there is used; the parenteses and all between them will be replaced with nothing. (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)


                    //******** The most dificult part *************
            // 3) Parse ingredients into count, unit and ingreadient
                // Going to test if there is a unit in the string, and if it is, then - where it is located
            const arrIng = ingredient.split(' '); //converting ingreadient to an array

            //** Finding index at which the unit is located
            const unitIndex = arrIng.findIndex(el2 => units.includes(el2)); // will pass a callback f-ion. For each el2 it will make a test, whether it is in array unitsShort or not; 'includes' returns True if there is an element in the array. 'findIndex' will return an index of an element, for which 'includes' have returned True****

            //RECAP: 'let' and 'const' are **block scouped**, so we need to define vars outside of the blocks and mutate them in blocks
            let objIng;// FINAL OBJE#T THAT WE ARE GOING TO RETURN; It's 'object ingredient'

            if (unitIndex > -1) {
                // *If there is a unit
                // E.g.1. 4 1/2 cups, arrCount is [4, 1/2]. NOW we have to FIGURE OUT THE number out of these values
                //E.g.2. arrCount is [4]
                const arrCount = arrIng.slice(0, unitIndex); // will slice from the beginning untill 'unitIndex', excluding it.
                let count;
                if(arrCount.length === 1) {
                    count = eval(arrIng[0].replace('-', '+')); // if there is a '-', then it will be replaced by '+'
                } else { //if there are 2 values in 'arrCount'

                //1)will join two strings in array 'arrIng', 2)then will 'evaluate' that string
                    count = eval(arrIng.slice(0, unitIndex).join('+')); //e.g. eval(4+1/2)=4.5 


                }

                objIng = {
                    count, // same as 'count: count'
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                };
                



            } else if (parseInt(arrIng[0], 10)) { 
                // *There is NO unit but the first element **is a number
                //(parsing to an integer witha a BASE OF 10. SO IF IT CAN BE CONVERTED TO THE NUMBER, THEN THE NUMBER ITSELF WILL BE RETURNED AND IT WILL 'COARSE' IN TO TRUE; if it is not a number it will return 'nan' and that will 'coarse' to FALSE)
                objIng = {
                    count: parseInt(arrIng[0], 10), // count==quantity of ingredient
                    unit: '', // NO unit
                    ingredient: arrIng.slice(1).join(' ')//entire array *except first element; START 'slice' at posittion nr.1, AND if second arg is not specified, then it goes all the way to the end; join() - puts all the elements back to the string
                }

            } else if (unitIndex === -1) {
                // *There is NO unit and NO number in first posittion

                // ingredient *object
                objIng = {
                    count: 1,
                    unit: '', // NO unit
                    ingredient //if there is no number and no unit, all we want is the entire ingredient - 'ingredient'
                    // HERE to say just 'ingredient' is the **same as to say 'ingredient: ingredient;'
                }


            }


            return objIng; //THAT IS HOW 'MAP' METHOD WORKS. FOR EA#H ITERATION WE HAVE TO **RETURN SOMETHING, WHI#H WILL BE SAVED IN #URRENT POSITION OF THE **NEW ARRAY.




        }); // will loop over ingredients, where on each iteration we can save item into new array 'newIngredients'. SO on each of iteration we have to Return a value, which then will be stored in 'newIngredients' array.
        this.ingredients = newIngredients;
    }


    updateServings (type) { // passing the string saying 'increase' or 'de#rease'

        // Servings
        const newServings = type === 'dec' ? this.servings -1 : this.servings + 1; // THE NEW VALUE WILL BE ASSIGNED TO 'newServings', BUT it will not update 'this.servings'

        //Ingreadients
            // need to update all of the #ount numbers
            // 'this.ingreadients' is array of obje#ts
            this.ingredients.forEach(ing => {
                ing.count *= (newServings / this.servings); // so it #hanges proportionaly
            });
        

        this.servings = newServings;

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


F-ion that will convert decimal numbers into the fraction. For that we will use ***external third party package***. Demonstrates how to include external packages through the 'npm' package manager. The one is used is 'fraction.js'. That is the library that allowes us to put in a number and then get **enumerator  and **denuminator out of the number. e.g. 0.75 => en=3, de=4.



*/

