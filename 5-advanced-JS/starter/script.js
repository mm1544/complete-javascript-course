// About #reating an obje#t by using f-ion #onstru#tor.
/*

// Function constructor

// obj. #reated by usng obj. literal(?)
var john = {
    name: 'John',
    yearOfBirth: 1990,
    job: 'teacher'
};


// by the #onvention, f-ion #onstru#tor name starts with #apital letter
var Person = function(name, yearOfBirth, job) {
    // we atta#h these arguments to 'this' variable OF THIS FUN#TION'S EXE#UTION #ONTEXT:
    this.name = name; // 'this' var. is simply an obj. as well
    this.yearOfBirth = yearOfBirth;
    this.job = job;
   
}



// FIRST

// What NEW operator does?
// When we use NEW operator, the brand new empty obje#t is #reated. After that, the #onstru#tor fun#tion (in this #ase 'Person') is #alled with the arguments that we have passed.

// RE~AP: #alling a f-ion #reates a new Exe#ution Context, that also has a 'this' variable.
// In regular f-ion #all 'this' var. points to the global OBJE#T. If we now look at 'Person' f-ion #onstru#tor here, then having 'this' variable pointing at the global obje#t would not be so usefull (right??), be#ause like this we would set all those PROPRTIES on the global obje#t. And that is NOT what we want. The 'new' operator take #are of this (!!!). IT makes that 'this' variable of the f-ion points to the empty obje#t, that was #reated in the beginning by the 'new' operator.
// So after that, when we set the 'name', year and job properties to 'this', THEN THAT IS THE SAME AS SETTING THEM RIGHT ON A NEW EMPTY OBJET. 

// FINALY
// If the #onstru#tion f-ion doesn't return anything, then the result is simply the obje#t that was #reated in the first step ie. - a NEW EMPTY OBJE#T.

//Inheritan#e in pra#tis

//PROTOTYPE
// The method '#al#ulateAge' is not in the #onstru#tor but we #an still use this method. IT IS BE#AUSE IT IS IN THE PROTOTYPE PROPERTY of our f-ion #onstru#tor (!!!!!!!!!). That is inheritan#e in pra#tise.
Person.prototype.calculateAge = function() {
        console.log(2016 - this.yearOfBirth);
    }

// as we did with a method, we #an do the same with property
Person.prototype.lastName = 'Smith'; // that will make all the person obje#ts to inherit this 'lastName'.


var john = new Person('John', 1990, 'teacher');
var jane = new Person('Jane', 1969, 'designer');
var mark = new Person('Mark', 1948, 'retired');


john.calculateAge();
jane.calculateAge();
mark.calculateAge();

console.log(john.lastName);
console.log(jane.lastName);
console.log(mark.lastName);
//'lastName' property was added to all obje#ts
// john, jane and mark INHERITED this PROPERTY

//Prototype of John is the prototype prperty of Person f-ion #onstru#tor.
// Proof in #onsole:
// john.__proto__===Person.prototype

*/





//////////////////////
//S5L63
/////////////////
// 'Object.create' method


/*
// There is another way how we #an #reate obje#ts, that inherit from the prototype. That is 'Object.create' method.


// In this #ase FIRST we will define an 
//OBJE#T that will a#t as a prototype. 
// And THEN we will #reate a new obje#t 
// based on that prototype:

var personProto = {
    calculateAge: function() {
        console.log(2016- this.yearOfBirth)
    }
};


// here we are passing an obje#t, that we defined to be the prototype Obje#t
var john = Object.create(personProto);
//in this way we #an add properties to our 'john' obje#t

john.name = 'John';
john.yearOfBirth = 1998;
john.job = 'teacher';


////////////////
////////////////
// Lets do it different way be#ause
// Object.create accepts second parameter.

var jane = Object.create(personProto,
                        {
    name: { value: 'Jane' },
    yearOfBirth: { value: 1969 },
    job: { value: 'designer' }
});

*/






/////////////////////
// S5L64
//////////////////
// Primitives vs. Objects

/*


// PRIMITIVES


// primitives holds the a#tual value
var a = 23;
var b = a;
a = 46;
console.log(a);
console.log(b);







//OBJE#TS


//obje#ts holds referen#et o that obje#t
// just to prove that point:

var obj1 = {
    name: 'John',
    aga: 26
};

var obj2 = obj1;
obj1.age = 30;

console.log(obj1.age);
console.log(obj2.age);
// age of both oje#ts is 30

// variables obj1 and obj2, both holds referen#e that hold to the exa#tly the same Obje#t in the memory. THAT IS WHY, when we have #hanged the age in obj1, this #hange is also refle#ted in obje#t 2. 






// FUN#TIONS


// With f-ions it works in the same way.
// Lets see what happens when we pass a primitive and an obje#t into a f-ion.


var age = 27;
var obj = {
    name: 'Jonas',
    city: 'Lisbon'
};

function change(a, b) {
    a = 30;
    b.city = 'San Francisco';
}


// will pass age as a argument AND OBJE#t as the b argument.
change(age, obj);

console.log(age);
console.log(obj.city);

// it demonstrates that when we pass a primitive into the f-ion, a simple #opy is #reated, so we #hange 'a', but it do not affe#t the variable on the outside BE#AUSE it is a primitive. 
// BUT when we pass obje#t it is not realy an obje#t that we pass, BUT the REFEREN#E to the obje#t. 

*/









//////////////////////
// S5L65
//////////////////
//Passing FUNCTIONS as arguments

/*

//Fun#tions are also Obje#ts in JS.
// So we #an do the samr things with f-ions what we #an do with Obje#ts.




// example of how f-ion #an a##ept another f-ion as an argument:

var years = [1990, 1965, 1937, 2005, 1998];


// #an write a f-ion that will re#eive an array and will return a new result array and will do the #al#ulations based on the f-ion that we pass into the #al#ulation f-ion.

function arrayCalc(arr, fn){
    //we will pass a fun#tion that is doing a#tual #al#ulations
    
    var arrRes = [];
    
    for (var i = 0; i <arr.length; i++){
        arrRes.push(fn(arr[i])); // push() inserts an element at the end of the array
    }
    
    return arrRes;
    
}


function calculateAge(el) {
    return 2016 - el;
}



function isFullAge(el) {
    return el >= 18;
    
}



function maxHeartRate(el){
    if (el >= 18 && el <= 81) {
        return Math.round(206.9 - (0.67 * el)); // formula is walid for people of ages 18-81
    } else {
        return -1;
    }
    
}




var ages = arrayCalc(years, calculateAge); // we dont pass 'calculateAge()' be#ause we want 'calculateAge' to be exe#uted later by 'arrayCalc' f-ion.
// calculateAge - is #alled #allba#k f-ion be#ause it is #alled ba#k later.

var fullAges = arrayCalc(ages, isFullAge);

var rates = arrayCalc(ages, maxHeartRate);


console.log(ages);
console.log(fullAges);
console.log(rates);


*/








//////////////////////
// S5L66
/////////////////////
// Fun#tions returning fun#tions
///////////////////////////////

/*

// lets #reate f-ion that #reates diferent job interview
// questions for diferent jobs


// For ea#h job we will return f-ion that builds a string using a persons name as an input (f-ion will return a f-ion).
function interviewQuestion(job){
    // 'job' is a string
    
    // a##ording to ea#h of the diferent jobs we will return
    // a diferent f-ion, whi#h will then log a question to
    // the #onsole
    
    if (job === 'designer') {
        return function(name) {
            // it is anonymous f-ion, it doesn't have a name
            
            console.log(name + ' can you please explane what UX design is?');
            
        }
    } else if (job === 'teacher') {
        return function(name) {
            console.log('What subject do you teach, ' + name + '?');
        }
    } else {
        return function(name) {
            console.log('Hello ' + name + '. What do you do?');
        }
    }
    
}
// It will return f-ion, whi#h we #an use later, AND this is 
//possible be#ause f-ions are always first #lass f-ions(?) 
// in JS, be#ause they are Obje#ts.

var teacherQuestion = interviewQuestion('teacher'); // so result will be a f-ion
var designerQuestion = interviewQuestion('designer');





//!!!!!!!!!!!!!!!!!!!!!!!
teacherQuestion('John'); // I will put 'John' into the returned question
designerQuestion('John');
designerQuestion('Jane');
designerQuestion('Mark');
designerQuestion('Mike');

// other way to #all it
interviewQuestion('teacher')('Ben'); // it works be#ause it is EVALUATED FROM LEFT TO RIGHT


*/









/////////////////////////
//S5L67
///////////////////////

// IMMEDIATELY INVOKED FUN#TION EXPRESSIONS (IIFE)
//////////////////////////////////////////////////

/*

//RE#AP: Variables defined inside the f-ion, #an't be a##essed from 
// outside s#ope. S#oping #hane works other way around.

function game() {
    var score = Math.random() * 10 // between 0 and 9
    console.log(score >= 5);
}

game();

// we #an do that in different way...
// If the only purpose is to hide the s#ore variable from the outside (i.e. #reating a PRIVATE variable), then we don't need to de#lare a whole f-ion with the name and the #all it. We #an do it in better way. 
// It is to use IMMEDIATELY INVOKED FUN#TION EXPRESSION
// SO...starting with writing a anonymous f-ion...

(function () {
  var score = Math.random() * 10 // between 0 and 9
    console.log(score >= 5);
 })(); // fun#tion is invoked like this...
// THAT IS IIFE//

//How does it work?

//1. If you write fun#tion like this, the parser would think that it is fun#tion de#laration:

//function () {
//    
//}

// ... but we dont have a name for f-ion so it (parser?) would throw an error, so we need to "tri#k" parser to make it believe THAT WHAT WE HAVE HERE IS AN EXPRESSION AND NOT DE#LARATION...
// Solution is to wrap the entire thing into parentases, be#ause in JS, that what is in parentases - #an't be a statement... Therefore JS will know that it should treat the #ontent of parantases as an EXPRESSION (NOT a de#laration). 
//After that we only have to invo#e the f-ion, #oz if we didn't do this, then it would be newer #alled and would newer do anything.

// We #an't a##ess the 's#ore' var from the outside.

//WE #REATED DATA PRIVA#Y IN HERE


// EXAMPLE 2

// We #an pass parameter to IIFE: 

(function (goodluck) {
  var score = Math.random() * 10 // between 0 and 9
    console.log(score >= 5 - goodluck); // HOW TO PASS AN ARGUMENT INTO THE F-ION?...
 })(5); //.... WE ARE ADDING IT IN HERE


////////////////////////
// Wit IIFE we are #reating a s#ope that is hidden from the outside s#ope, and with this we obtane DATA PRIVA#Y and also DON'T INTERFERE WITH OTHER VARIABLES IN OUR GLOBAL EXE#UTION #ONTEXT

// IIFE IS FOR DATA PRIVA#Y
//////////////////////////////////////////////////////////////////
// Later will see the importan#e if IIFE in real life appli#ations:
// In order to stru#ture #ode, obtain data priva#y and #ode modularity
/////////////////////////////////////////////////////////////////////


*/









////////////////////////////////////////////////
// S5L68
///////////////////////////////////////////////
// Closures

/*

// Will write a f-ion that return a F-ion, that #al#ulates how many 
// years we have left until retirement.

function retirement(retirementAge) {
    var a = ' yers left until retirement';
    
    // this f. returns another f., whi#h will a#tually #al#ulate what
    //we need
    
    //returning anonymous f-ion:
    return function(yearOfBirth) {
        var age = 2018 - yearOfBirth;
        console.log((retirementAge - age) + a);
    }
    
}

// it returns a f-ion, so we #an store the returned f-ion in the variable and 
// this var will be the f-ion ass well. 

// sin#e retirement age is diferent from #ountry to #ountry, we #an #REATE ONE F-ION FOR EA#H #OUNTRY:

var retirementUS = retirement(63);
//... So if we now #all the new #reated f-ion:
retirementUS(1990); // should pass in a yearOfBirth


// IMPORTANT NOTE:
//
// Inner anonymous f-ion is able to use 'retirementAge' var and 'a' var of outer fun#tion, that is ALREADY GONE!!! IT IS ALREADY RETURNED. But somehow the variables are still 'there'. 
// THAT IS THE #LOSURE !!!!!!!!!!!!

//////////////////////////////////////////
// IMPORTANT NOTE
// Inner f-ion has always a##ess to the variables and parameters of its outer f-ion, even after the outer f-ion has returned.
//////////////////////////////////////////

//f-ion for Germany
var retirementGermany = retirement(65);
var retirementIceland = retirement(67);
// NOW WE #AN USE THESE F-IONS FOR DIFERENT PEOPLE IN DIFERENT #OUNTRIES



retirementGermany(1990);
retirementIceland(1990);


//OTHER WAY TO #ALL THIS F-ION:
//retirement(63)(1984);






//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// 'challenge': Rewrite Interview question f-ion using closures.

function interviewQuestion(job){

    return function(name) {
        if (job === 'designer') {
            console.log(name + ' can you please explane what UX design is?');
            
        } else if (job === 'teacher') {
            console.log('What subject do you teach, ' + name + '?');
        
        } else {
        
            console.log('Hello ' + name + '. What do you do?');
        
        }
            
        
    }
}

var questionBuilder = interviewQuestion('builder');
questionBuilder('Pete');

var questionTeacher = interviewQuestion('teacher');
questionTeacher('Andrew');

interviewQuestion('designer') ('Petras');

/////////////////////////////
/// The diferen#e between those two was of doing 'things' (i.e. using closure and using just f-ion that returns another f-ion without closure) is that NOW THE DECISION IS TAKEN RIGHT INSIDE OF THE F-ION THAT WE RETURN.  
//That is possible because we can use 'job' variable to take this decision here, EVEN AFTER interviewQuestion() f-ion has already returned.

// It is better to use CLOSURES it gives a better/cleaner(???) code.
// We got one f-ion and 'if's' are inside of it.

//


*/




////////////////////////////////////////////////
//S5L69
////////////////////////////////////////
// Bind, Call and Apply (methods)
///////////////////////////////////////



// Re#ap: F-ions are some spe#ial #ind of obje#ts.
// Therefore f-ions alse GET a COUPLE of spe#ial methods, whi#h they inherit from the f-ion #onstru#tor obje#t. Will be reviewed Bind, Call and Apply methods. 
//////////////////////////////////////////////////////////////
//These methods allows us to #all a f-ion and set 'this' variable 
//manualy.
//////////////////////////////////////////////////////////



// e.g.

// #reating an obje#t:


var john = {
    name: 'John',
    age: 26,
    job: 'tacher',
    
    //here we want a method for John obje#t:
    presentation: function(style, timeOfDay) {
        if (style === 'formal') {
            console.log('Good ' + timeOfDay + ' ladies and gentelmen. I\'m '  + 
                        this.name + ' I\'m ' + 
                        this.job + ' and I\'m ' + 
                        this.age + ' years old.');
        } else if (style === 'friendly') {
            console.log('Hey! What\'s up? I\'m '  + 
                        this.name + ' I\'m ' + 
                        this.job + ' and I\'m ' + 
                        this.age + ' years old.' + ' Have a nice '  + timeOfDay + '.');
        }
    }
    
};


var emily = {
    name: 'Emily',
    age: 35,
    job: 'designer'
};


///////////////////////
// CALL method
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
///////////////////
//Suppose that we want to use 'presentation' method for the emily obje#t, whi#h doesn't have su#h method
// CAN USE 'call' method to do this:
john.presentation.call(emily, 'friendly', 'afternoon');
//first argument is 'this' VARIABLE. SO IF WE ARE SETTING 'this' to 
//'emily', then all the 'this' variables from 
// presentation: function(style, timeOfDay) {............
// will be NO LONGER john, BUT it will be emily.
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// THIS IS #ALLED 'METHOD BORROWING'




/////////////////////////////
// APPLY method
////////////////////
// It is simmilar to CALL and the ONLY DIFEREN#E IS THAT 
// APPLY a##epts argument as an ARRAY. So it tahes two arguments: first one - 'this' variable and se#ond argument is an array where all the other arguments go:
//john.presentation.apply(emily, ['friendly', 'afternoon']); // THIS NOT GONA WORK IN THIS #ASE #OZ OUR F-ION DOESN'T EXPE#T TO GET AN ARRAY.

john.presentation('formal', 'morning');




///////////////////////
// BIND method
/////////////////////
// It is as well similar to 'call' method. It also aloves to set 'this' variable explicitly(aiškiai). DIFEREN#E is that the BIND doesn't immediately #all the f-ion, but instead it generates the #opy of a f-ion, so we #an store it somewhere. It returns f-ion.

// Note:
// It #an be useful to #reate a f-ion with preset(??) arguments

// BIND method will return a f-ion. We have to store that f-ion 
// somewhere.

// We will use BIND method to #reate a f-ion with PRESET arguments.
// We gona preset 'friendly' argument so that we don't have to input it again and again.
var johnFriendly = john.presentation.bind(john, 'friendly'); // //'friendly' is the first argument of 'presentation: //function(....,....)'
//So 'friendly' is a 'style'. But we don't set a 'timeOfDay' AT THIS POINT
//!!!!!!!!!!!!!!!!!!!
// f-ion will get stored in 'johnFriendly' variable.
// THERE IS ONE ARGUMENT LEFT TO BE SET (timeOfDay).
johnFriendly('morning');

// HOW IT CAN BE USEFUL?
// We have a f-ion now which is always for the 'friendly' version of 
//the presentation method

// #an use this 'johnFriendly' for another time of the day
johnFriendly('night');

//SO 'BIND' ALLOWES US TO PRESET SOME ARGUMENTS
// We #reated f-ion based on another f-ion with some preset parameters.


//e.g.
// #an write the same for emily

var emilyFormal = john.presentation.bind(emily, 'formal');

emilyFormal('afternoon');









// USING EXAMPLE #ODE FROM THE LE#TURE L65
// example of how f-ion #an a##ept another f-ion as an argument:

var years = [1990, 1965, 1937, 2005, 1998];


// #an write a f-ion that will re#eive an array and will return a new result array and will do the #al#ulations based on the f-ion that we pass into the #al#ulation f-ion.

function arrayCalc(arr, fn){
    //we will pass a fun#tion that is doing a#tual #al#ulations
    
    var arrRes = [];
    
    for (var i = 0; i < arr.length; i++){
        arrRes.push(fn(arr[i])); // push() inserts an element at the end of the array
    }
    
    return arrRes;
    
}


function calculateAge(el) {
    return 2016 - el;
}


// AGE IS VARIES FROM #OUNTRY TO #OUNTRY
// so we #an pass in the se#ond argument for the age 'limit'
function isFullAge(limit, el) {
    return el >= limit;
    
}

// #al#ulating ages
var ages = arrayCalc(years, calculateAge);
// problem with isFullAge(...,...) f-ion is that it a##epts two arguments, BUT arrayCalc(...,...) #an only use it with one argument (be#ause ...arrRes.push(fn(arr[i]));... is #alled with one argument).
// What is the solution?
//A: TO PASS IN isFullAge() F-ION BUT WITH 'limit' already preset.
// Need to use BIND method, #oz it allowes to #reate a #opy of a f-ion
// with a PRESET argument.

var fullJapan = arrayCalc(ages, isFullAge.bind(this, 20)); // in this #ase we don't realy #are about 'this' keyword so we just use 'this' !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// preset 'limit' is 20

// NOW INTO arrayCalc() F-ION WILL BE PASSED NOT SIMPLY THE isFullAge() F-ION BUT THE #OPY OF THIS F. WITH 20 AS THE PRESET ARGUMENT FOT 'limit'


console.log(ages);
console.log(fullJapan);
























































































































































































































