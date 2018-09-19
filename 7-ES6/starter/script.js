// Lecture 104: let and const

/*
// ES5

var name5 = 'Jane Smith';
var age5 = 23;
name5 = 'Jane Miller'; // we #an mutate variable
console.log(name5);


//ES6

// #an #hoose between 'const' and 'let'

// const - for constants, i.e. for values which we
// dont want to #hange

// let - it is as it was 'var'. It is for values 
// that we want to change.

const name6 = 'Jane Smith';
let age6 = 23;
name6 = 'Jane Miller';
console.log(name6);
*/



//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// IN ES6 VERSION OF JS NO LONGER 'var' IS USED. INSTEAD THERE IS 'const' AND 'let'.



////////////////////////////////////////////////
///////////////////////////////////////////////
//IMPORTANT:
// Variables declared with 'var' in ES5 are FUNCTION SCOPED

// Vars declared with 'let' and 'const' in ES6 are BLOCK SCOPED

// That is a big diference!



/*
// ES5

function driversLicense5(passedTest) {

    if (passedTest) {
        console.log(firstName);
        var firstName = 'John';
        var yearOfBirth = 1990;

        
    }
    
    console.log(firstName + ', born in ' + yearOfBirth + ', is now officialy allowed to drive the car.');

}


driversLicense5(true);







// ES6

function driversLicense6(passedTest) {
    //console.log(firstName); -> will cause an error
    let firstName;
    const yearOfBirth = 1990;
    
    if (passedTest) {
        firstName = 'John';
    }
    
     console.log(firstName + ', born in ' + yearOfBirth + ', is now officialy allowed to drive the car.');
    
    // It is not going to work be#ause 'let' and 'const' the variables are NOT F-ION S#OPED but BLOCK SCOPED.
    
    // NOTE: Block is a code, that is wraped between 
    // curly bra#es. Ea#h time when we have if, for 
    // or while blo#k, we are #reating a new blo#k 
    // and variables with 'let' or 'const' are only 
    // a##essible in the #ode, inside of the same 
    // blo#k.

}


driversLicense6(true);







///////////////////////////
// e.g.

let i = 23;

for (let i = 0; i < 5; i++) {
    console.log(i);
}

console.log(i);

// sin#e i is blo#k s#ouped, both i inside and 
// outside of 'for' are diferent variables. 

//////////////////////////////////////
*/







////////////////////////////////////////////
// L105: Blocks and IIFEs
////////////////////////////////////////////

/*


// In ES6 is mu#h simpler way to a achieve a DATA
// PRIVACY. Al what we have to use is a BLOCK. 
// Block is not only restri#ted to 'if' statements, 
// 'for' or 'while' loops. We can write a block like this:

// Enought to write the #ode in #urly bra#es and the 
// blo#k will be #reated:


// ES6
{
    const a = 1;
    let b = 2;
    var c = 3;
}

// if we do this:
console.log(a+b); // error
console.log(c); // it will be printed out, #oz
// variables with 'var' are not block scoped, they 
// are f-ion scoped

// we are getting error #oz those vars are not 
// a##essible from outside of the blo#k.
// They are block scoped, NOT f-ion scoped!
// That is like IIFE (Immediately invo#ed f-ion 
// expression)!!!


// ES5 IIFE
(function() {
    var c = 3;
})();

//console.log(c);

*/









///////////////////////////////////////
// L106: STRINGS IN ES6 / ES2015
//////////////////////////////////////
// Template Literals!!!!!!!!!!!!!

/*

let firstName = 'John';
let lastName = 'Smith';
const yearOfBirth = 1990;
function calcAge(year) {
    return 2018 - year;
}



//ES5

console.log('This is ' + firstName + ' ' + lastName + '. He was born in ' + yearOfBirth + '. Today he is ' + calcAge(yearOfBirth) + ' years old.');


//!!!!!!!!!!!!!!!
// ES6

//In ES6 we got Template literals. In order to use them we need a 'back tiks' (`) instead of quotation marks.

// Use of Template literal:
    //Now we #an write a text and put our variables right inside of the text!
console.log(`This is ${firstName} ${lastName}.`);

//////////////////////////

const n = `${firstName} ${lastName}`;


////////////////////////////
// Some new STRING methods:

console.log(n.startsWith('J')); // it returns bool if the string
// starts with J or not.

console.log(n.endsWith('th'));

console.log(n.includes('oh')); // #he#ks whether the string in#ludes something

console.log(`${firstName} `.repeat(5));

*/









///////////////////////////////////////////
//L107
///////////////////////////////////////////
// Arrow F-ions: Basic
//////////////////////////////////////////

/*

const years = [1990, 1965, 1982, 1937];

//EG5

// RECAP: 'map' method to LOOP THROUGH ARRAY

// in 'map' mth. we have a##ess to current element, current index, and 
// entire 'years' array.
var ages5 = years.map(function(el) {
        // 'el' - for 'element'
    return 2016 - el;
    // returned value WILL GET STORED IN 'ages5' array
    
});
console.log(ages5); // > [26, 51, 79]



/////////////////////////////////////////////////////////////

// ES6
//v1

// We can use an 'Arrow f-ion':
    // EXAMPLE WITH ONE ARGUMENT:
const ages6 = years.map(el => 2016 - el); 
// The result is going to be the same as we have in previous example. 
// I.e.:
// 'years.map(el => 2016 - el)' does the same as 'years.map(function(el) {
//    return 2016 - el; })'

// It makes things simpler. There is noe 'function', no 'return', etc.
// Need to write less code.
// We need just an argument, the arrow and some expression that need to be 
// returned. 
console.log(ages6); // > [26, 51, 79]

// EXAMPLE WITH MORE THAN ONE ARGUMENT:
// v2
                
let ages62 = years.map((element, index) => `Age element ${index + 1}: ${2016 - element}.`); 
                       // a##essing element and the index
                       // will use 'template literals'

console.log(ages62); 
// > ["Age element 1: 26.", "Age element 2: 51.", "Age element 3: 79."]

////////////////////////////////////////////////////////////////////////
//e.g.
// v3 of writing Arrow f-ions
let ages63 = years.map((el,index) => {
    const now = new Date().getFullYear();
    const age = now - el;
    return `Age element ${index + 1}: ${age}.`
    // !!!!!! If we use more than one line, we need to have 'return' statement
});

console.log(ages63);

*/









//////////////////////////////////////////////////////
// 108
////////////////////////
// ARROW FUNCTIONS: LEXICAL 'THIS' KEYWORD


// NOTE: The bigest advantage of using ARROW F-IONS IS THAT THEY SHARE THE SURROUNDING(??) 'THIS' KEYWORD.
// Meaning: Unlike normal f-ions, Arrow F-ions dont get their own 'this'
// keyword.
// A.F. use 'this' of the f-ion that they are written in 
//!!!!!!!!!!!!!!!!!!!!!
//SO can say that A.F. has a lexical(??) 'this' variable.

/*

// ES5
var box5 = {
    color: 'green',
    position: 1,
    clickMe: function () {

        var self = this; // 'self' will point to 'this'
        // this 'trick' will allow to point to box5 object

        //f-ion will attach event handler to green element
        document.querySelector('.green').addEventListener('click', function () {
            var str = 'This is box number ' + self.position + ' and it is ' + self.color;
            alert(str);
        });
    }
}


//box5.clickMe();

// IT DOESN'T WORK.
// Only in the method call 'this' keyword points to that object.

// BUT IN THE REGULAR F-ION CALL 'this' KEYWORD WILL ALWAYS POINT TO TGE GLOBAL OBJECT, WHICH IN THE CASE OF THE BROWSER IS THE WINDOW OBJECT.

// In our code we have a method attached to the objct. And from that 
// method we have an access to the color and the position by using 'this' 
// keyword. 
// BUT the calback f-ion that we have in event hendler, is NOT a method, it is a REGULAR F-ION CALL. THEREFORE, 'this' keyword here DOESN'T POINT TO 'box5' object, instead it points to the window object. Ofcorse 'position' and 'color' are not defined in 'window' obje#t. (!!!!!!!!!!!!)

// Ta void this ERROR we can simply create a new variable and store 'this' 
// variable in there. Will use 'self' variable to a#hieve that.




// Re#ap: Arrow f-ions share surrounding 'this' keyword.

// ES6

// Will use Arrow f. instead of anonymous f-ion.
const box6 = {
    color: 'green',
    position: 1,
    clickMe: function () {

        // NOTE: In arrow f., when we don't have any arguments, or if we 
        // have more than 1 argument, we have to use the parentheses ()
        document.querySelector('.green').addEventListener('click', () => {
            var str = 'This is box number ' + this.position + ' and it is ' + this.color;
            alert(str);
        }); 
        // NOTE: Here we have a f-ion, that shares 'this' keyword with its
        // surrounding, so with 'clickMe' method and in there the 'this' 
        // keyword points to 'box5' object.
    }
}


//box6.clickMe();


// ANOTHER SCENARIO

const box66 = {
    color: 'green',
    position: 1,
        //!!!!!!!!!!!!
        // tHIS METHOD NOW SHARES THE LEXI#AL 'this' KEYWORD FROM ITS 
        // SURROUNDINGS. AND THE SURROUNDING OF IT IS A GLOBAL CONTEXT.
        // SO IT MEANS THAT METHOD HERE DOESN'T HAVE ITS OWN 'this' 
        // keyword, IT SHARES THE GLOBAL 'this' KEYWORD, WHI#H POINTS TO 
        // GLOBA; PBJ. - WINDOW.
    clickMe: () => { //!!!!!!!!!!!

        // NOTE: In arrow f., when we don't have any arguments, or if we 
        // have more than 1 argument, we have to use the parentheses ()
        document.querySelector('.green').addEventListener('click', () => {
            var str = 'This is box number ' + this.position + ' and it is ' + this.color;
            alert(str);
        }); 
        // NOTE: Here we have a f-ion, that shares 'this' keyword with its
        // surrounding, so with 'clickMe' method and in there the 'this' 
        // keyword points to 'box5' object.
    }
}


//box66.clickMe();








///////////////////////////////////////////
//EG.:

//Creating f-ion constructor in order to create 'person' obj.:
function Person(name) {
    this.name = name;
}

//ES5

//adding Prototype property to the Person:
Person.prototype.myFriends5 = function(friends) {
    // return an array, whi#h says that the name of the person is friends 
    // with each of these elements in this array.
    
    // We can create a copy of this f-ion with 'this' var set to 
    // 'this'
    var arr = friends.map(function(el) { // at this point, where anonymous
        // f-ion is called, 'this' keyword is not pointing to the Person 
        // obje#t, but it will point to the global obj..
        return this.name + ' is friends with ' + el;
    }.bind(this)); //!!!!!!!!!!! 
    // !!!!!!!!!!!!!!!!!!!!!!!!!!
    // what we eant the 'this' keyword in here 
    // to be? A: - 'this' (??)
    // Creating a copy of this f-ion by using 'bind' method.
    
    //SO WE HAVE CREATED A COPY OF THAT ANONYMOUS F-ION WITH MANUALLY DEFINED 'this' KEYWORD.
    console.log(arr);
}

var friends = ['Bob', 'Jane', 'Mark'];

new Person('John').myFriends5(friends); 

// This WAS NOT WORKING for the same resons as before




// ES6
// Using Arrow f-ion


//adding Prototype property to the Person:
Person.prototype.myFriends6 = function(friends) {
   
    var arr = friends.map(el => `${this.name} is friends with ${el}`);
    
    // Re#ap: Arrow f-ion doesn't have his own 'this' keyword and 
    // therefore it shares 'this' with surroundings. Surroundings in this 
    // case is this method.
    
    console.log(arr);
}


new Person('Mike').myFriends6(friends); 


*/














/////////////////////////////////////////////////////////////
// L109
////////////////////////////////////////////////////////////
// Destructuring - 

/*

// ... - it gives a conveniant way to extract data from data structure 
// like an obje#t or an array. 

//SCENARIO:
// Let say we have an array filled with some data and now we want to store 
// each elements of that array in a SINGLE variable:

// ES5
//var john = ['John', 26];
//var name = john[0];
//var age = john[1];

// for this purpose we #an use 'destructuring'

// ES6

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// with 'destructuring' we can destructure a data structure:

const [name, age] = ['John', 26]; 
// It will #reate #onstant #alled 'name' and #onstant #alled 'year'. And
// data will be stored in each variables.

//console.log(name);
//console.log(age);

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// it also works with obje#ts:
const obj = {
    firstName: 'John',
    lastName: 'Smith'
};

const {firstName, lastName} = obj;
// here we created 2 new constants that store the data OUT OF THE OBJE#T
//console.log(firstName);
//console.log(lastName);


// if we don't want the variable names to match keynames:
const {firstName: a, lastName: b} = obj;

//console.log(a);
//console.log(b);




//***********************************
//////////////////////////////////////
/////////////////////////////////////
// Practical application of 'destructuring' is to return multiple values
// from the f-ion.


// In ES5 if we would like to return more than 1 walue we would return an obje#t. With 'destructuring' will be easier.

function calcAgeRetirement(year) {
    const age = new Date(). getFullYear() - year;
    // suppose 65 is the retirement age
    return [age, 65 - age];
}



const [age1, retirement] = calcAgeRetirement(1990);

console.log(age1);
console.log(retirement);



*/

























//////////////////////////////////////////////////////////////
// L110
////////////////////////////////////////////////////////////
// ARRAYS IN ES6/ES2015

/*



//
const boxes = document.querySelectorAll('.box'); 

// 'querySelectorAll' - does NOT return an array af elements but instead it returns a 'node list'. We have transform it to the array:


// ES5
var boxesArr5 = Array.prototype.slice.call(boxes); // now we have an array and can use all array methods
boxesArr5.forEach(function(cur) {
   cur.style.backgroundColor = 'dodgerblue'; // will #hange #olor of all boxes
});





// ES6
const boxesArr6 = Array.from(boxes);
        //it will transform node list 'boxes' to an array !!

boxesArr6.forEach(cur => cur.style.backgroundColor = 'dodgerblue');

















////////////////////////////////////////////////////////////
// Looping throug an array

// To loop though an array we have used forEach() or map() methods

// !! Problem is that we can't BRAKE from them. AND we can't use CONTINUE statement.



// Let say we want to change the text of first box and 3rd box
// In the loop, for the second box we want to use CONTINUE  and NOT to do 
// anything.

//ES5
//for(var i = 0; i < boxesArr5.length; i++) {
//    
//    if(boxesArr5[i].className === 'box blue') {
//        continue;
//        // - it will skip this iteration of the loop and will go right to the next one   
//    }
//    
//    boxesArr5[i].textContent = 'I changed to blue';
//    
//}



// In ES6 we have a new loop that combines 'forEach' and 'for'. It is called 'for-of'.





// ES6

// for-Of loop

// 'cur' - is current element which we can call whatever we want.
for(const cur of boxesArr6) {
    
    // it combines 'forEach' and 'map' methods with the 'for' loop;
    // here we can use the 'continue' or 'brack' statements (THEY CAN'T BE 
    // USED IN map and forEach)
    
    if (cur.className === 'box blue') {
        continue;
    }
    
    cur.textContent = 'I changed to blue';
}









////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
//eg x.
// Suppose that we have a groop of children and only one of them is full-
// aged. Lets find out who and how old that person is.



// ES5

var ages = [12, 17, 8, 21, 14, 11];


var full = ages.map(function(cur) {
    return cur >=18;
});
console.log(full);

// we need to find out the index of that full-aged member in array:
console.log(full.indexOf(true));

// If we want to see how old is that person, we need to retrieve that
// element from array:
console.log(ages[full.indexOf(true)]);




// ES6

// 'findIndex' method. Can pass a callback f-ion into it and it will
// return the index of the array where the callback f-ion RETURNS true.

//there is the callback f. that has an a##ess to the current element, cur. 
// index and the entire array.
console.log(ages.findIndex(cur => cur >= 18));
        // returns the index of the element in whi#h that callback f. 'cur 
        // >= 18' returns the value 'true'.

// to find the value that is greater than 18 in the array:
console.log(ages.find(cur => cur >= 18));


*/















///////////////////////////////////////////////
// L111
//////////////////////////////////////////////
// The SPREAD Operator

// - USED TO EXPAND ELEMENTS OF AN ARRAY, in pla#es like arguments and f-ion #alls.


/*


// What does 'expand elements' mean?

function addFourAges(a, b, c, d) {
    return a + b + c + d;
}

var sum1 = addFourAges(18, 30, 12, 21);
console.log(sum1);

// Let say we had those 4 numbers in an array...
// Q: How would we pass an entire array in that f-ion?


//ES5

var ages = [18, 30, 12, 21];

// Recap: Apply method uses elements of an array as the arguments. We will use that here(??)

        //for 'apply' we have to spe#ify 'this' variable (like in 'bind' and 'call'). Since we are not interested in that we #an #all it 'null' now.
var sum2 = addFourAges.apply(null, ages);
        // 'apply' method will take array 'ages', then will call f-ion 'addFourAges', USING ELEMENTS OF THE ARRAY AS THE ARGUMENTS!!
console.log(sum2);

//...there is a better way of doing this in ES6...



// ES6

// '...' - is a SPREAD operator it will allow to pass elements of the array as the arguments to the f-ion:
const max3 = addFourAges(...ages); 

//SO, spread op. will expand the array INTO ITS COMPONENTS !!

console.log(max3)


///////////////////////////////////////////////////////////
// Another USE CASE OF 'SPREAD' OPERATOR: - JOINING ARRAYS

// lET SAY WE HAVE 2 ARRAYS REPRESENTING FAMILIES:

const familySmith = ['John', 'Jane', 'Mark'];

const familyMiller = ['Marry', 'Bob', 'Ann'];

// TO JOIN THOSE ARRAYS WE CAN USE 'SPREAD'
const bigFamily = [...familySmith, 'Lily', ...familyMiller]; // 'spread' takes the element out of the array and 'puts' them together
console.log(bigFamily);





/////////////////////////////////
// Can use 'spread' on NODE LIST

// Re#ap: 'querySelectorAll' returns node list !!

const h = document.querySelector('h1'); // sele#ting by element's name, therefore we 
// don't need '.' or '#' symbols in front.

const boxes = document.querySelectorAll('.box');

// Let say we want to #hange a text #olor of 'h' element and of all elements of #lass 'box'. We #ould do that separately for h, and then loop through node list 'boxes' and #hange one by one...


// BUT it will be esier, if we will have all those elements in the same stru#ture. SO we #an use 'spread' operator again:
const all = [h, ...boxes];
// Will get node list !!

// Now need to CONVERT node list into array, and then will be able to loop through it with forEach method...

//conversion:
// Array.from(all) // - that returns an array
                        //using 'Arrow f-ion'. 'cur' - is the argument of the f-ion:
Array.from(all).forEach(cur => cur.style.color = 'purple'); // 'color' is the css property for styling text colors. 'purple' is the css color name.



*/


















/////////////////////////////////////////
// L112
////////////////////////////////////////
// Rest parameters
//////////////////////////////////////


// Rest parameters allows us to pass arbitrary nr of arguments into a f-ion, and use these arguments in that f-ion.

// Rest p. look like 'spread' operator ('...'), but thay are diferent.


// 'Rest parameters are exa#t opposite of 'spread' operator (!!??)
// 'Spread' op. takes an ARRAY and transforms it into single values, WHILE 'Rest parameters' re#eive a #ouple of single values and transforms them into an array, when we call a f-ion with multiple parameters.


//eg.:
//*********************************************************************
// Suppose you want to #reate af-ion that re#eives an arbitrary nr. of years, and then, prints nr. to the console whether ea#h person, corresponding to these years is a full-aged or not.



//ES5
/*

//If you want to re#eive an undefined nr. of arguments in ES5, then, we simply DON'T DEFINE ANY PARAMETERS FOR A F-ION, AND THEN USE 'ARGUMENTS' KEYWORD. 'ARGUMENTS' variable - is simmilar to 'this' variable. That is a var. that each exe#ution #ontext gets a##ess to(???)
function isFullAge5() {
    console.log(arguments); // SO 'arguments' is a spe#ial var. that we have a##ess to IN ALL F-IONS.
}



isFullAge5(1990, 1999, 1965);

// IT RETURNS OBJE#T(!!!) THAT RESEMBLES ARRAY. 
// SO 'ARGUMENTS' IS NOT AN ARRAY - IT IS ARRAY-LIKE STRU#TURE

// If you want to use it as array, e.g. - to loop through it, THEN WE NEED TO TRANSFORM IT TO AN ARRAY:

function isFullAge52() {
    var argsArr = Array.prototype.slice.call(arguments); // transforming to ARRAY
    
    // 'cur' - is the current element of the array, and array 'comes' from the 'arguments' !!
    argsArr.forEach(function(cur) {
        console.log((2016 - cur) >= 18);
    });
}

//isFullAge52(1990, 1999, 1965); // it will work with any nr. of parameters







// ES6           
// Using 'Rest Parameters'

function isFullAge6(...years) { // using 'Rest Parameters' operator and type the name of the variable
    
    
    years.forEach(cur => console.log((2016 - cur) >= 18));
    
    // As soon as we call the f-ion, it will transform multiple arguments 
    // into an array, AND it will pass it INTO THIS F-ION.
    // We can then access this 'years' array automati#ally in the f-ion and
    // use it as before:
   
}

isFullAge6(1990, 1999, 1965); // GETTING AN ARRAY

*/

// SO WE DON'T HAVE TO TRANSFORM INTO AN ARRAY #OZ WE ALREADY HAVE ONE !!



///////////////////////////////////////////////////
// NOTE:
// Diference:
//*** 'Spread' op. is used in f-ion #all.
//*** 'Rest Parameters' are used in f-ion declaration(??)



///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
// Now we will a##ept another parameter, that will a#t as age limit.
// Instead of having 18, we will pass a parameter whi#h will determins at
// what age person is 'full-aged'.


//ES5
/*

function isFullAge52(limit) { // 'limit' will be part of the 'arguments'
    //console.log(arguments);
    var argsArr = Array.prototype.slice.call(arguments, 1); 
    // 'slice' method allows to 'cut a peace' of an array. If we are adding
    // '(arguments, 1)', slice will start copying array at posittion 1. SO 
    // LIKE THIS WE CAN EXCLUDE THE FIRST ARGUMENT.
    
    //console.log(argsArr);
    
    
    argsArr.forEach(function(cur) {
        console.log((2016 - cur) >= limit);
    });
}

//isFullAge52(16, 1990, 1999, 1965); // it will work with any nr. of parameters







// ES6           
// Using 'Rest Parameters'

function isFullAge6(limit, ...years) { 
    
    
    years.forEach(cur => console.log((2016 - cur) >= limit));

}

isFullAge6(16, 1990, 1999, 1965);


*/



















//////////////////////////////////////////////////////////
// L113
/////////////////////////////////////////////////////////
// Default parameters
////////////////////////////////////////////////////////


// We use them when we want one ore more parameters of a f-ion tobe preset 
// (we want them to have a default value).

/*
//ES5

function SmithPerson(firstName, yearOfBirth, lastName, nationality) {
    
    // FOR THE #ASE WHEN 'lastName' and 'nationality' are undefined
    lastName === undefined ? lastName = 'Smith' : lastName = lastName; // in ternary op. we have to spe#ify else #ondition
    nationality === undefined ? nationality = 'american': nationality = nationality;
    
    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfBirth = yearOfBirth;
    this.nationality = nationality;
    
}


var john = new SmithPerson('John', 1998);
//!!! JS allows to #all any f-ion without spe#ifying all of the arguments !!!!!!!
// Int his #ase JS assigns 'undefined' to missing parameters.


// What if you want to add 'default' value for the last name and nationality? We #an use if statement of 'ternary' operator to make it work.

var emily = new SmithPerson('Emily', 1983, 'Diaz', 'spanish');
// Default parameters will be OVERWRITTEN in this #ase


*/

//ES6

/*

// Specifying default parameters right after declaration:
function SmithPerson(firstName, yearOfBirth, lastName = 'Smith', nationality = 'american'){
    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfBirth = yearOfBirth;
    this.nationality = nationality;
}

var john = new SmithPerson('John', 1998);
var emily = new SmithPerson('Emily', 1983, 'Diaz', 'spanish');

//NOTE: this way makes easier to work with f-ions in JS


*/

























///////////////////////////////////////////////////////
//////////////////////////////////////////////////////
// L114
///////////////////////////////////////////////////////
// MAPS
//////////////////////////////////////////////////////

/*

// 'map' - is a data structure.

// Common use of JS obje#ts is to use them as 'hash maps' (???). It means that eg. we map String keys to arbitrary values (!!!).

//!!!!!!!!!!!!!!!
// 'map' is a new key-value datastru#ture in ES6. In maps we can use 
// ANYTHING for the 'keys' (in obje#t we are limited to strings, but in 
// 'maps' we #an use any kind of primitive value eg. numbers, Strings, or 
// boolians). We can even use f-ions OR obje#ts as keys (!!!!).


//creating a map:

const question = new Map();
// to add some data to map we use 'set' method:
        // first is the 'key' and then 'value':
question.set('question', 'What is the official name of the latest major JavaScript version?');

// THIS WORKS SIMMILAR LIKE A 'PROPERTY' IN AN OBJECT. WE COULD HAVE A 'QUESTION' PROPERTY AND THEN ASSIGN SOME STRING TO IT (THIS PROPERTY).

question.set(1, 'ES5');
question.set(2, 'ES6');
question.set(3, 'ES2015');
question.set(4, 'ES7');
question.set('correct', 3);
question.set(true, 'Correct answer !');
question.set(false, 'Wrong answer... Try again, budy !');

//* Q: How to retrieve a data from this map?
// A: get()
console.log(question.get('question'));

//* map size:
//console.log(question.size);

//*deleting data. Passing the key to it.
//question.delete(4)

//*checking for data (searching for certain key)
// eg.
if(question.has(4)) { // passing a key
    //question.delete(4);
   // console.log('Answer 4 is here')
}

//* To delete all the elements in map: 'clear()':
//question.clear();






////////////////////////////////////////
// Maps are iterable, i.e. we can loop through them (CAN'T do that with 
// objects):

// forEach
// 'forEach()' - EACH MAP GETS forEach METHOD (forEach() is in PROTOTYPE 
// property of 'map' f-ion constructor, so all of the maps inherit this 
// method and can use it)


// question.forEach((value, key) => console.log(`This is ${key}, and it\'s set to ${value}`)); // forEach has an a##ess to #urrent element, #urrent key, and to the entire map


///////////////////////////////////////////////////////
// for-of

        // 'entries()' returns all KEY:VALUE PAIRS of 'question' map, then we can 
        // use 'destructuring' ([...]) to store the key and value IN TWO SEPARATE 
        // VALUES:
for (let [key, value] of question.entries()) {
    // Let say we only want to print a value if the key is the number:
    if (typeof(key) === 'number') {
        console.log(`Answer ${key}: ${value}`);
    }
    
    
    
     //console.log(`This is ${key}, and it\'s set to ${value}`);
}


///////////////////////////////////////////////
//'prompt' - opens popup window

const ans = parseInt(prompt('Write the correct answer')); // JS will interpret this as a String, so we need to conwert it to the number with 'parseInt'.
//console.log()

///////////////////////////////////////////////////////////
//!!!!!!!!!!1 checks the answer
console.log(question.get(ans === question.get('correct')));


*/




//////////////////////////////////////////////////////////////
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Q: Why maps are better than obje#ts to #reate hashmaps?
// A: 
//      1. Anything can be used as keys.
//      2. maps are itterable, so it is easy to loop through tmem and to manipulate its content
//      3. Easy to get the size of a map, by using 'size property'.
//      4. Easy to add and remove data from/in map.


















//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
// L115
//////////////////////////////////////////////////////////////
// Classes
/////////////////////////////////////////////////////////////

// "Classes don't add anything new to the language. They are just sintactic sugar over the way we do prototype(-ing??) inheritan#e in JS.
// It means that classes simply make easier to impliment inheritan#e, and to #reate obje#ts based on blueprints. 

// IN ES5, these blueprints are #alled 'f-ion #onstru#tors', and we have added METHODS to their PROTOTYPE properties in order to make all the instan#es, created through f-ion #onstru#tor, inherit these methods."

/*


// ES5 

// Creating a person f-ion constructor
var Person5 = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

// adding a method to PROTOTYPE property of the f-ion constructor:
Person5.prototype.calculateAge = function() {
    var age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
}


var john5 = new Person5('John', 1990, 'teacher');
john5.calculateAge();

///////////////////////////////////////////////////////
// NOW LETS DO THE SAME THING IN ES6 BY USING CLASSES:


//using 'class' keyword and state the name of the class:
class Person6 { // - CLASS DECLARATION. 
    // All the classes has to have a constructor method. 
    
    // EVERY CLASS DECLARATION HAS TO HAVE A 'constructor' PART
    //here we define initial properties, that we want our object to have
    constructor (name, yearOfBirth, job) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }
    
    // METHODS ARE ADDED IN THE CLASS:
    calculateAge() {
         var age = new Date().getFullYear() - this.yearOfBirth;
         console.log(age);
    }
}


// Class Person6 is effectively (iš ismės) the same thing as Person5
// It is easier to write code by using class

const john6 = new Person6('John', 1990, 'teacher');

// in Console we can see that john5 and john6 are exactly the same kind of thing


*/



//////////////////////////////////////////////////
// WE CAN ADD ''STATIC METHODS'' TO THE CLASSESS

// ''STATIC METHODS'' ARE THE METHODS, THAT ARE SIMPLY ''ATTACHED'' TO THE CLASS, BUT NOT '''INHERITED'''(!!!) BY THE CLASS INSTANCES (THE OBJECTS THAT WE CREATE THROUGH THAT CLASS)

/*

class Person62 { 
    constructor (name, yearOfBirth, job) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }
    
    
    calculateAge() {
         var age = new Date().getFullYear() - this.yearOfBirth;
         console.log(age);
    }
    
    // STATIC METHOD:
    static greeting() {
        console.log('Hey there !');
    } // We can use this like a '''helper f-ions'''
    // We CAN NOT use it on 'john62', #oz it is a stati# method and instances of the class will not inherit this method(??!!!)
}


const john62 = new Person62('John', 1990, 'teacher');

//!!!!!!!!!!!!!!!!!!!!!!!!
// USING STATIC METHOD:
Person62.greeting();
        // it is basi#ally a method that is attached to the CLASS DEFINITION.
        // AND this #lass definition behind the s#ene (under the hood) is a '''f-ion definition''', and SO it is an object. AND we CAN ATTACH A METHOD TO AN OBJECT (!!!!)


//NOTE I
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// CLASS DEFINITIONS ARE NOT '''HOISTED''' (???), so unlike a f-ion #onstru#tors, we need first to implement a class and only later in our code, we can start using it.

//NOTE II
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// We can only add methods to classes, BUT NOT PROPERTIES (!!!???)
// That is not a problem, be#ause inheriting proprties to the obje#t instan#es IS NOT THE BEST PRACTICE any way (??)


*/
























////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
// L116
///////////////////////////////////////////////////////////////////
// Classes with Subclasses
///////////////////////////////////////////////////////////////////


// Will implement inheritan#e between #lasses, using sub#lasses.



// ES5 

/*

// Creating a person f-ion constructor
var Person5 = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

// adding a method to PROTOTYPE property of the f-ion constructor:
Person5.prototype.calculateAge = function() {
    var age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
}



// n0w will create a subclass, which will be the athlete class:
            // IN F-ION WE HAVE TO PASS THE EXA#T THE SAME PARAMETERS AS IT IS IN '''SUPPER CLASS'''
var Athlete5 = function(name, yearOfBirth, job, olympicGames, medals){
    
    //FIRST THING: in sub#lass we have to '''call''' a '''supperclass''' - Person5:
    Person5.call(this, name, yearOfBirth, job); 
    // we \an pass yhose ę arguments in here because we receive them in this function(....) call as well.
    this.olympicGames = olympicGames;
    this.medals = medals;
    
    // Q: Why do we have to #all a super#lass f-ion #onstru#tor with 'this' as a 'this' keyword ???
    // A: We need to remember how does '''new''' operator works (whi#h is an operator used to #reate a new instan#e).
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // When #reating a new Athlete obje#t, '''new''' #reates a new empty obje#t, #als to '''athlete''' f-ion #onstru#tor AND SETs THE '''this''' KEAYWORD TO THE NEWLY CREATED EMPTY OBJECT.
    // In the execution context, where we are here the '''this''' keyword will point to the new empty obje#t. If we want a Person5 properties 'name', 'yearOfBirth' and 'job' to be set on the new Athlete obje#t, then we need to #all Person5 f-ion #onstru#tor with the '''this''' keyword also set  to the newly created Athlete object. AFTER this, all the properties will be set in the new Athlete obje#t 
    
}


//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// NOW to #reate Correct '''prototype chain''', we will use ''object.create'' BEcAUSE ''object.create'' ALLOWES US TO MANUALY SET A PROTOTYPE OF AN OBJEcT.
//                      AND WE WANT A PROTOTYPE OF AN ATHLETE TO BE THE PROTOTYPE OF THE PERSON, SO THAT THEY BECOME CONNECTED (!!!!!!!!!!!)
Athlete5.prototype = Object.create(Person5.prototype); // it sets that Athlete5 #lass inherits from Person5 #lass (!!!!!!!!!!!!!!!!!!!)

// Now two f-ion #onstru#tor's are connected and PROTOTYPE CHAIN SHOULD WORK FINE.


// First we set Athlete5 prototype property AND NOW we can add methods to this p.p.

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//As ell we #an set methods on the PROTOTYPE PROPERTY of Athlete5 f-ion #onstru#tor:
Athlete5.prototype.wonMedal = function() {
    this.medals++;
    console.log(this.medals);
}
    //This method is specifi# only to Atlete5s, so all the Athlete5 instan#es are going to inherit this method. Person5 will NOT inherit this method.



var johnAthlete5 = new Athlete5('John', 1990, 'swimmer', 3, 10); // we have to set all of the properties that we would set on the Person.


//!!!!!!!!!!!!!!!
// In console we can see that the prototype of ''johnAthlete5'' is Person5. That means that Athlete5 f-ion constructor's prototype property is the same as Person5's prototype property.



johnAthlete5.calculateAge();

// > 28

// That works be#ause not only instatn#es of Person5 #an inherit method calculateAge(), but as well, the instan#es of an Athlete5 #an inherit it.

johnAthlete5.wonMedal();

*/



/////////////////////////////////////////////
// ES6

// Supper#lass
class Person62 { 
    constructor (name, yearOfBirth, job) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }
    
    
    calculateAge() {
         var age = new Date().getFullYear() - this.yearOfBirth;
         console.log(age);
    }
}

// Sub#lass:
class Athlete6 extends Person62 {
        // we have to repeat Person62 properties if we want to be able to have it
    constructor(name, yearOfBirth, job, olympicGames, medals) { //all classes has to have it
        
        super(name, yearOfBirth, job) // will #all a super#lass. Passing the same parameters as we had in superlas' constructor. 
        
        // Recap: In ES5 we had to write: - "Person5.call(this, name, yearOfBirth, job)" - that does same thing.
        
        
        this.olympicGames = olympicGames;
        this.medals = medals;
    }
    
    // addind a method
    wonMedal(){
        this.medals++;
        console.log(this.medals);
    }
}


const johnAthlete6 = new Athlete6('John', 1990, 'swimmer', 3, 10);

johnAthlete6.wonMedal();
johnAthlete6.calculateAge();


//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// SO IT IS MUCH EASIER TO USE CLASS INHERITANCE IN ES6





































