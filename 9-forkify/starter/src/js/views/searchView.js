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
export const getInput = () => elements.searchInput.value; // getting input value. ***FOR ARROW f.: since it is just one line, it is **IMPLICIT RETURN***, I.E. WE DON'T NEED ***'return'


//IT IS GOOD TO HAVE ***ONE CENTRAL VARIABLE*** WITH ALL THOSE ***DOM ELEMENTS***, THAT WE NEED IN OUR APP. FOR THAT WILL CREATE A NEW MODULE.



































