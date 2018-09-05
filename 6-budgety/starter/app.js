// Will write the module with the module pattern
// 
// This var. will be immediately invoked f-ion expression (IIFE), that will return an obje#t


//BUDGET CONTROLLER
var budgetController = (function () {

    //Here we need data model for expen#es and in#ams
    //# ea#h new 'item' will have 'des#ription' and 'value'
    //# we should have way to distinguish between different in#omes or 
    // expen#es, SO we want them to have unique ID number.

    // Probably the best #hoi#e is an OBJE#T, that has 'des#ription', 'value', and ID

    //Q: What to do when we want to #reate lots of obje#ts????
    //A:-Need to #reate f-ion #onstru#tors, whi#h we #an then use to instan#iate many 'expen#e' and 'in#am' obje#ts.

    //RE#AP: for '''f-ion #onstru#tor''' we use first #apital letter:
    var Expense = function (id, description, value) {
        this.id = id; // 'this.id' is equal the 'id' that we passing in...
        this.description = description;
        this.value = value;
    }; // IN #ASE THAT WE NEED SOME METHODS FOR THEM(??), WE #AN PUT THESE METHODS IN THE PROTOTYPE PROPERTY OF 'Expense' or 'In#ome', SO that all obje'ts #reted through these f-ion #onstru#tors, will INHERIT these methods.

    //INSTEAD of writing these methods right into #onstru#tors, we #an put them into the PROTOTYPES.
    // It is BETTER BE#AUSE IN THIS WAY, METHODS ARE NOT ATTA#HED TO INDIVIDUAL OBJE#T, BUT INSTEAD EA#H OBJ. WILL THEN INHERIT IT (method) FROM THE PROTOTYPE. 


    var Income = function (id, description, value) {
        this.id = id; // 'this.id' is equal the 'id' that we passing in...
        this.description = description;
        this.value = value;
    };
    
    
    
    
    //budgetController keeps track of all the in#oms and expenses
    // and also of the Budget itself and later also the Per#entages
    //Therefore we need good data stru#ture for that. 
    
    // Probably the best solution is to store those obje#ts in ARRAY.
    
    

    // it is ALWAYS better to have one data stru#ture where all the data goes, instead of having lots of rand. variables 'flowing' around:
    
    // it is an obje#t where we will put all that data
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
        
    };
    
    
    
    // Lets #reate a PUBLI#k method, that will allow other modules to add a new item to our data stru#ture!!!!!!!!
    
    // will return obje#t, that will #ontain all of our publi#k methods:
    return {
        //'type' denotes whether it is an In#om or Expense
        addItem: function(type, ) { // 1:17 to be continued....
            
        }
        
    };
    
    
    
    


})(); // RECAP: IIFE alloves to have data priva#y, be#ause it #reates a new 
//s#ope that is not visible from the outside s#ope (ie. var and f-ion #ant 
//be a##essed from the outside).

//SPECIFICS OF MODULE PATTERN: IT RETURNS AN OBJE#T #ONTAINING ALL OF THE F-IONS THAT WE WANT TO BE PUBLI# (ie. we want to give the outside s#ope the a##ess to them)

// NOTA BENE: After all this runs, the 'budgetController' variable is simply an obj. containing the method called 'publickTest'

//IMORTANT 
// THIS WORKS BECAUSE OF CLOSURES: 
//Be#ause of #losures the inner fun-ion always has a##ess to the variables and parameters of its outher f-ion, even after the outer f-ion has returned. 


//In here IIFE returns immediately and it is 'gone', but 'publi#Test' f-ion will always has a##ess to the x var. and 'add' f-ion be#ause #losure was #reated in here.






//Module that is going to take care of user interface.

// UI CONTROLLER
// RE#AP: OBJE#T that will be returned by this IIFE will be assigned to this variable, AND ALL THE VARS AND F-IONS THAT WE DEFINE INSIDE OF THIS F-ION, WILL STAY IN THE CLOSURE EVEN AFTER THIS OUTER F-ION RETURNS. THE OBJE#T THAT IS GOING TO BE RETURNED IS GOING TO HAVE A##ESS TO THESE PRIVATE METHODS(F-IONS) AND VARS.
var UIcontroller = (function () {

    //we were a##essing UI segments by #alling them by #lass names e.g. 'add__type'. To make #ode more bug-resilient we will #reate private var, whi#h is going to be an obj. and we will store all strings in here:
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    } // If we will de#ide all the #lass names in UI, then it is not a big problem!!!


    //f-ion to get an user input
    // this is a f-ion, that we want to use in the OTHER #ONTROLLER, SO WE DON'T WANT IT TO BE 'PRIVATE'!
    return {
        getInput: function () {

            //will return an obje#t
            return {

                //THERE ARE 3 input FIELDS in UI, SO WE NEED TO GET THE VALUE OF EA#H OF THEM:

                // we sele#t some 'thing' and we do something with it
                type: document.querySelector(DOMstrings.inputType).value, // it will read the value of the 'add__type'.
                // HER WILL BE EITHER 'income' or 'expense'.
                description: document.querySelector(DOMstrings.inputDescription).value,

                value: document.querySelector(DOMstrings.inputValue).value

                // WE HAVE 3 INPUT VALUES STORED IN THOSE 3 VARS. CONTROLLER IS GOING TO CALL THIS METHOD AND IT WANTS TO RE#EIVE BA#K ALL OF THESE VALUES SO WE HAVE TO RETURN 'SOMETHING' IN HERE..
                // HOW TO RETURN 3 VALUES AT THE SAME TIME??? - SOLUTION IS TO RETURN AN OBJE#T #ONTAINING THESE 3 VALUES AS PROPERTIES.!!!   
            };
        },

        //we need 'DOMstrings' obje#t to be a##essed in another 
        //modules, therefore we need a way to pass this obje#t from 
        //one  module to the other.
        getDOMstrings: function () {
            return DOMstrings;
        }
    }


})();







// 'budgetController' and 'UIcontroller' modules are #ompleately independent modules. There will be no interaction between them ever. They are intentionaly made as INDEPENDANT as possible. 


// BUT we need some way to #onne#t these two modules. E.g. we need to read data from UI and then add that data as the new expence to the budgetController. Therefore we #reate a third module  - app 'controller'.



/////////////////////////
// GLOBAL APP CONTROLLER
var controller = (function (budgetContr, UIcontr) {

    //In here we will de#ide what happens on ea#h event and THEN, will delegate tasks to the other #ontrollers.



    //TO MAKE A STRU#TURE BETTER, WE WILL #REATE A F-ION IN WHI#H ALL THE EVENT LISTENNERS WILL BE PLA#ED:
    var setupEventListeners = function () {

        //var that will 'hold' DOMstrings
        var DOM = UIcontr.getDOMstrings();

        //first sele#t an element and the atta#h event listenner to it.
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem); // it is alright to pass a fun#tion into 
        // addEventListener method
        // '.' - is #lass sele#tor



        //For key event listener
        // will add this event listener to the 'global' do#ument
        // This key press event doesn't happen on any spe#ifi# element, BUT IT HAPPENS ON THE GLOBAL WEBPAGE (on global 'document').
        document.addEventListener('keypress', function (event) {
            //'keypress' will rea#t if ANY key is pressed, but we want to exe#ute #ode only when 'enter' is pressed.
            // WILL A##IEVE THIS BY PASSING 'EVENT ARGUMENT' TO FUNCTION.
            // (The fun#tion that is passed to event listenner #an 
            // re#eive an argument.)
            // 'event' - is an arbitrary #osen name

            // event is an OBJE#T and 'keyCode' is one of its properties
            // BUT some OLDER browsers dont use 'keyCode' property but 
            // use  'which' property instead. SO we will use both!
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }

        });

    };








    // fun#tion that will be exe#uted when 'add__btn' button is 
    // pressed or when 'enter' is pressed
    var ctrlAddItem = function () {

        // 1. Get the field input data
        var input = UIcontr.getInput(); // UIctrl - is the module that we have a##ess to AND getInput - publi#k method that we #an a##ess.

        // 2. Add the item to the budget #ontroller

        // 3. Add the item to the UI

        // 4. #al#ulate the budget

        // 5. Display the budget on UI     
    };




    // 'setupEventListeners' f-ion needs to be #alled
    // FOR THAT PURPOSE WE WILL #REATE A PUBLI#K INITIALISATION F-ION, THAT IS #ALLED 'init'   !!!
    // sin#e we want it to be publi#k, we need to return it in an OBJE#T:
    return {
        init: function () {
            console.log('Appli#ation has started.');
            // here need to #all settupEventListenners f-ion (that is the 
            // purpose of 'init' f.)

            // our event listenners are going to be set up after #alling 
            // init f-ion. It need to be done outside of #ontrollers.
            setupEventListeners();

        }
    };



})(budgetController, UIcontroller); // NOTE: modules #an re#eive arguments. Modules are just f-ion expressions, so we #an pass arguments into them. WE will pass other two modules as arguments to the #ontroller so this #ontroller about the other two modules and #an #onne#t them.



// THAT WILL BE THE ONLY LINE OF #ODE THAT WILL BE PLA#ED OUTSIDE OF MODULES
// our event listenners are going to be set up after #alling 
// init f-ion. It need to be done outside of #ontrollers.
controller.init();
