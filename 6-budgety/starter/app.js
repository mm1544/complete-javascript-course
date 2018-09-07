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

    // need to spe#ify whether we are #al#ulating total expenses or 
    // in#omes
    var calculateTotal = function (type) {
        var sum = 0;
        // forEa#h method a##epts #allba#k f-ion, AND that f. has an a##ess to 3 parameters: -#urrent val, -#urrent index, -#omplete array. IN THIS #ASE WE ONLY NEED A #URRENT ELEMENT
        data.allItems[type].forEach(function (cur) {
            //'cur' - be#ause we #an #all it whatever we want
            
            sum += cur.value; // 'cur' refers to either 'Income' or 'Expense' obje#t, THAT IS STORRED AT THE CURRENT POSSITION OF 'exp' or 'inc' arrays.
            
            // this F-ion will be applyed to ea#h obje#t of #ossen array
        });
        
        //we could return this 'sum', BUT it is better(why??) to store it in global 'data' stru#ture in 'totals' obj.
        data.totals[type] = sum;    
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
        },
        budget: 0,
        percentage: -1 // -1 indi#ates that there is no per#entage #al#ulated now (doesn't exist at this point)

    };



    // Lets #reate a PUBLI#k method, that will allow other modules to add a new item to our data stru#ture!!!!!!!!

    // will return obje#t, that will #ontain all of our publi#k methods:
    return {
        //'type' denotes whether it is an 'In#am' or 'Expense'
        //'des' - des#ription
        //'val' - value

        addItem: function (type, des, val) {
            var newItem;

            // CREATE NEW ID
            // it is a unique nr. of an item
            // e.g. [1 2 4 6 8] - there are ids of array items are shown
            // ID = last ID + 1;
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1; // takes from 'allItems' obj. 'exp' or 'in#' array and sele#ts the last ITEM. THEN takes ID of that last item and adds 1 to it.
            } else {
                ID = 0;
            }



            //CREATE NEW ITEM based on 'inc' or 'exp' type.
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }

            //after #reating new item, we #an add it to our data 
            //strru#ture

            //All these new data items will be stored in 'data' obje#t, AND inside of 'data' obj., in 'allItems' obje#t. AND in there we have 2 arrays - 'epx' and 'inc'.

            data.allItems[type].push(newItem); // 'type' is either 'exp' or 'inc'. 
            //e.g. if type=='exp', then 'exp' array will be sele#ted from 'allitems' obje#t..., then push() method will add newItem to the end of an array.


            //RETURN NEW ELEMENT
            return newItem; // need to return newItem be#ause diferent module or f-ion is going to #all this one () and will get dire#t a##ess to the item, that we just #reated (it will be useful).

        },


        calculateBudget: function () {

            //*** #al#ulate total in#ome and expenses. Should make a new f-ion, to not write #ode twi#e: for in#ome and expenses. Sin#e we don't want anyone else to use this f-ion, we #an make it private f-ion.
            calculateTotal('exp');
            calculateTotal('inc');


            //*** #al#ulate the budget: in#ome - expenses
            data.budget = data.totals.inc - data.totals.exp;
            
            if(data.totals.inc > 0) {
                
            //*** #al#ulate per#entage of in#ome that we spent
            data.percentage = Math.round ((data.totals.exp / data.totals.inc) * 100);
            
            //eg. Expense=100 and In#ome=200, spent 50%=100/200 * 100
            
            //'Math.round()' rounds to the #losest integer
            } else {
                data.percentage = -1; //indi#ates that per#entages doesn't exist
            }

        },
        
        // creating method ONLY for returning something from data stru#ture or module. THAT IS HOW IT SHOULD BE DONE. There should be f-ions that only retrieve data or only set data.
        getBudget: function() {
            return { // sin#e we returning few things at on#e, need to use an OBJECT
                
                //!!!! in here we #reate 4 properties for 4 values
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            };   
        },


        // to test in the #onsole
        testing: function () {
            console.log(data);
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
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
// UI CONTROLLER
// RE#AP: OBJE#T that will be returned by this IIFE will be assigned to this variable, AND ALL THE VARS AND F-IONS THAT WE DEFINE INSIDE OF THIS F-ION, WILL STAY IN THE CLOSURE EVEN AFTER THIS OUTER F-ION RETURNS. THE OBJE#T THAT IS GOING TO BE RETURNED IS GOING TO HAVE A##ESS TO THESE PRIVATE METHODS(F-IONS) AND VARS.
var UIcontroller = (function () {

    //we were a##essing UI segments by #alling them by #lass names e.g. 'add__type'. To make #ode more bug-resilient we will #reate private var, whi#h is going to be an obj. and we will store all strings in here:
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list', // this element is sele#ted if we have 'income'
        expensesContainer: '.expenses__list' // ... 'expenses'
    }; // If we will de#ide all the #lass names in UI, then it is not a big problem!!!


    //f-ion to get an user input
    // this is a f-ion, that we want to use in the OTHER #ONTROLLER, SO WE DON'T WANT IT TO BE 'PRIVATE'!
    return {
        getInput: function () {

            //will return an obje#t
            return {

                //THERE ARE 3 input FIELDS in UI, SO WE NEED TO GET THE VALUE OF EA#H OF THEM:

                // we sele#t some 'thing' and we do something with it
                type: document.querySelector(DOMstrings.inputType).value, // it will read the value of the 'add__type'.
                // HER WILL BE EITHER 'inc' or 'exp'.
                description: document.querySelector(DOMstrings.inputDescription).value,

                value: parseFloat(document.querySelector(DOMstrings.inputValue).value) // WE READ INPUT AS A STRING, BUT WE CAN'T DO CALCULATIONS WITH IT, SO WE HAVE TO CONVERT IT TO FLOATING NUMBER

                // WE HAVE 3 INPUT VALUES STORED IN THOSE 3 VARS. CONTROLLER IS GOING TO CALL THIS METHOD AND IT WANTS TO RE#EIVE BA#K ALL OF THESE VALUES SO WE HAVE TO RETURN 'SOMETHING' IN HERE..
                // HOW TO RETURN 3 VALUES AT THE SAME TIME??? - SOLUTION IS TO RETURN AN OBJE#T #ONTAINING THESE 3 VALUES AS PROPERTIES.!!!   
            };
        },

        // ADDING NEW ITEM TO THE LIST
        // what is needed to add new item?
        // - Obje#t itself (same obj. that we #reated using f-ion #onstru#tor and passed to Controller)
        // - Type (in#ome or expense)
        addListItem: function (obj, type) {
            var html, newHtml, element;


            // ## Create HTMP string with some placeholder text
            // using %id% as a plaseholders, whi#h will be repla#ed later

            if (type === 'inc') {
                element = DOMstrings.incomeContainer;

                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer;

                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }


            // ## Replace placeholder text with some actual data
            // 'html' is a string AND string has bun#h of own methods, whi#h we #an use in here.  
            newHtml = html.replace('%id%', obj.id); //'replace' sear#hes for a given string and repla#es it with DATA THAT WE PUT INTO THE METHOD. 'id' - is obje#t property that holds ID.
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            // ## Insert HTML into the DOM

            // FIRST need to sele#t some element on the webpage (so from the DOM), then we #an insert our html next to that. Will use insertAdjacentHtml method.

            // We will add 'Expenses' to the <div class="expenses__list">.... container in .html file. In there will be a lot of CHILD ELEMENTS.
            // All 'expenses' will be CHILDS of 'expenses__list' container. Will work the same way for 'incomes'.
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml); // 'element' will be '.income__list' (if user is adding income), or '.expenses__list' (if user adding expense).
            // 'insertAdjacentHTML(), with 'beforeend' keyword makes that 'newHtml' string will be inserted as a child of containers 'income__list' or 'expenses__list', BUT AS THE LAST CHILD (I.E. as the last element in the list).

        },

        clearFields: function () {
            var fields, fieldsArr;
            // instead of using 'querySelector' like we did before, we will use 'querySelectorAll' (coz we would have to use 'querySelector' twice).
            fields = document.querySelectorAll(DOMstrings.inputDescription + ',' + DOMstrings.inputValue); // for this method is enough to separate strings with ','
            // 'fields' var is holding result of sele#tion
            // !!! 'querySelectorAll' returns a LIST (NOT array). LIST is simmilar to ARRAY, but it doesn't have all ni#e methods, that we had for arrays. 
            // SOLUTION: - Convert LIST to an ARRAY.

            //!!! TRICK: To use array method called 'slice'. 'slice' returns a copy of the array, that IT is called on. SO we call this method on an array and IT returns another array. BUT we can TRICK this metgod anp PASS THE LIST INTO IT, and method will still return an array!!!

            // cant use 'slice' like that:
            // fields.slice() - because 'fields' is a LIST.
            // BUT we can call 'slice' methods using 'call' // method(???) AND passing 'fields' variable into it, so that IT BECOMES 'this' variable. THAN IT WILL WORK FINE.



            fieldsArr = Array.prototype.slice.call(fields);
            //'slice' method is stored in array prototype. 
            // SO, Array is a f-ion constructor for all arrays. All those methods, that array inherit from array f-ion constructor, are in Array prtotype property.
            // Since 'Array.prototype' is a f-ion, WE CAN USE 'CALL' METHOD ON IT. In 'call()' we set 'this' variable to 'fields'. !!!!!!!!!! THIS WILL TRICK 'SLICE' METHOD INTO THINKING THAT WE GIVE IT AN ARRAY, AND THEREFORE IT WILL RETURN AN ARRAY.

            //!!! We can now loop through this array and clear all the fields that were selected (2 in this case).

            // will use 'forEach' method to LOOP OVER ALL ELEMENTS OF THE 'fieldsArr' array AND THEN sets the value of all of them ba#k to the empty string:
            fieldsArr.forEach(function (current, index, array) { //here we have an a##ess to 3 things: 
                //-current value (value of an array that is #urrently beying pro##essed)
                // -Index (current index)
                // -The entire array (fieldsArray)

                current.value = "";

            }); // we have to pass a callback f-ion into this method, then this callback f-ion supply to each of the elements of the array.


            // sets the FOCUS to the first element of the array
            //fieldsArr[0].focus;
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

            // it is #alled ea#h time we add a new item to UI
    var updateBudget = function () {

        // 1. #al#ulate the budget (for it will #reate a publi#k method in budgetController)
        budgetContr.calculateBudget();

        // 2. return the budget
        var budget = budgetContr.getBudget();

        // 3. Display the budget on UI 
        console.log(budget);


        // NOTE: ea#h f-ion has a spe#ifi# task, SO we will have one f. to  #al#ulate the budget and separate f. to return the budget. Simply getting some information from a module IS A GOOD TASK for simple f-ion.

    };



    // fun#tion that will be exe#uted when 'add__btn' button is 
    // pressed or when 'enter' is pressed
    var ctrlAddItem = function () {
        var input, newItem;

        //## 1. Get the field input data
        input = UIcontr.getInput(); // UIctrl - is the module that we have a##ess to AND getInput - publi#k method that we #an a##ess.

        // makes sure that 'des#ription' is not empty and 'value' is a number. isNan() returns true if passed item is NOT a NUMBER.
        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {

            //## 2. Add the item to the budget #ontroller
            // passing (type, des, val)
            newItem = budgetContr.addItem(input.type, input.description, input.value); // 'addItem' method returns an obje#t, SO we need IT to save here

            //## 3. Add the item to the UI
            UIcontr.addListItem(newItem, input.type);

            //## 4. Clear the fields
            UIcontr.clearFields();

            //## 5. Calculate and update budget
            updateBudget();

        }

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
