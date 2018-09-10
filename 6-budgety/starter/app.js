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
        this.percentage = -1; // when percentage is not defined it will be equal to -1

    }; // IN #ASE THAT WE NEED SOME METHODS FOR THEM(??), WE #AN PUT THESE METHODS IN THE PROTOTYPE PROPERTY OF 'Expense' or 'In#ome', SO that all obje'ts #reted through these f-ion #onstru#tors, will INHERIT these methods.

    //INSTEAD of writing these methods right into #onstru#tors, we #an put them into the PROTOTYPES.
    // It is BETTER BE#AUSE IN THIS WAY, METHODS ARE NOT ATTA#HED TO INDIVIDUAL OBJE#T, BUT INSTEAD EA#H OBJ. WILL THEN INHERIT IT (method) FROM THE PROTOTYPE. 


    // Not just adding method in f-ion #onstru#tor, but INSTEAD WILL ADD IT TO its PROTOTYPE. 
    // SO, all the objects that are created through this ''Expense'' prototype will inherit this method be#ause of prototype chain (This method will be in PROTOTYPE property of 'Expense'):

    // will #all this method 'calcPercentage'
    Expense.prototype.calcPercentage = function (totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100); // will get 'int' value
        } else {
            this.percentage = -1;
        }
    };

    // 'getPercentage' method for 'Expense' object (of f-ion constructor):
    Expense.prototype.getPercentage = function () {
        return this.percentage;
    };




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

        // It is going to be called by the 'budgetController'
        deleteItem: function (type, id) {
            var ids, index;

            // we gonn loop through all the elements in the 'inc' or 'exp' arrays:
            // map() re#eives a callback f-ion, which has access to the current element, current index, and entire array
            ids = data.allItems[type].map(function (current) {

                // map() returns a brand new array, of the same length as allItems[type], but all members will be IDs of 'current' elements:
                return current.id;
            });

            // finds index of id (that we have passed to the method) in 'ids' array:
            index = ids.indexOf(id); // index can be '-1' if index is not found in the array in which we are searching

            // we need to delete this item from the array:
            if (index !== -1) {
                //'splice' method is used to remove elements from array:
                data.allItems[type].splice(index, 1); // FIRST argument is position nr., at which we want to start deleting. SECOND argument is the nr. of element that we want to delete.
            }
        },


        calculateBudget: function () {

            //*** #al#ulate total in#ome and expenses. Should make a new f-ion, to not write #ode twi#e: for in#ome and expenses. Sin#e we don't want anyone else to use this f-ion, we #an make it private f-ion.
            calculateTotal('exp');
            calculateTotal('inc');


            //*** #al#ulate the budget: in#ome - expenses
            data.budget = data.totals.inc - data.totals.exp;

            if (data.totals.inc > 0) {

                //*** #al#ulate per#entage of in#ome that we spent
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);

                //eg. Expense=100 and In#ome=200, spent 50%=100/200 * 100

                //'Math.round()' rounds to the #losest integer
            } else {
                data.percentage = -1; //indi#ates that per#entages doesn't exist
            }

        },


        calculatePercentages: function () {
            // need to calculate the Expense percentage for each of the expence object that are stored in the 'exp' array.

            // e.g.

            // Expenses:
            // a=20
            // b=10
            // c=40
            // Total income:
            // income=100
            // What is the per#entage of a?
            // a% = 20/100=20%
            //............

            // We need a method for each of these Expense objects (that are stored in data structure) that calculates this percentage

            // callback f-ion specifies what we want to happen for each of the elements. 'cur' - current element.
            data.allItems.exp.forEach(function (cur) {

                //for ea#h of the elements need to #all 'calcPercentage' method:
                cur.calcPercentage(data.totals.inc);
            });
        },


        getPercentages: function () {
            // need to loop through the all expenses
            // we also want to store the returned values. Will use map()
            // method for that

            // 'allPerc' - array with all the percentages
            var allPerc = data.allItems.exp.map(function (cur) {
                return cur.getPercentage();
            });
            // map() returns and stores something in variable while forEach() doesn't store.
            return allPerc;


            // eg.
            // If we have 5 obj. in 'exp' array. Then ''return cur.getPercentage()'' will be called 5 times, and each time percentage will be stored in 'allPerc' array. AND in the end this array will be returned.
        },


        // creating method ONLY for returning something from data stru#ture or module. THAT IS HOW IT SHOULD BE DONE. There should be f-ions that only retrieve data or only set data.
        getBudget: function () {
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
        expensesContainer: '.expenses__list', // ... 'expenses'
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container', // class in HTML, that is a parent of in#ome and expense elements
        expensesPercLabel: '.item__percentage'

    }; // If we will de#ide all the #lass names in UI, then it is not a big problem!!!(???)


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

                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer;

                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
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

        // will delete an element from  UI (remove it from DOM)
        deleteListItem: function (selectorID) {
            // To remove something from DOM we have 'removeChild' method.
            // Therefore we need to know the parent. We need to move up in 
            // the DOM, so that we can then remove the child.
            // !!!! WE CAN'T DELETE THE ELEMENT, WE CAN JUST DELETE ITS CHILD.

            // selecting element by ID, then
            // ..moving up to the parent, then
            // ..removing child with 'removeChild()', THEN
            // .. need again to select it therefore passing 'document.getElementById(selectorID)' to 'removeChild()':

            // selecting an item and saving it into variable:
            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
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

        displayBudget: function (obj) {
            // #anging text #ontent
            document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget; // it is equal to the budget, and that budget #omes from an obje#t that we pass to this method.
            document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMstrings.expenseLabel).textContent = obj.totalExp;


            if (obj.percentage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';

            }


        },

        // method is going to receive the percentage array that we have stored in app controller
        displayPercentages: function (percentages) {

            //need to select all the elements that has "item__percentage" class. 
            //Can't use 'querySelector' because it selects the first one. Instead will use ''querySelectorAll''.

            var fields = document.querySelectorAll(DOMstrings.expensesPercLabel); // this returns a 'node list', because in the DOM tree where all the HTML elements of page are stored, each element is called a ''NODE''.
            // Need to loop through all the elements (all these NODES), and then change the text content property for all of them.



            // 'Node list' doesn't have forEach method. We will need again convert 'node list' into an array by using previous techniek, but this time we will create our own 'forEach' f-ion BUT for 'note lists'.
            // 'list' - node list
            // 'callback' - callback f-ion
            ///////////////////////////////////////////
            // IT MAY BE REUSED FOR ANY 'NODE LISTS'
            ///////////////////////////////////////////
            var nodeListForEach = function (list, callback) {
                // each iteration will call callback f-ion
                for (var i = 0; i < list.length; i++) {
                    callback(list[i], i); // using the power of FIRST CLASS F-IONS. F-ions can be passed like this...(??)
                } // NOTE: 'node list' has 'length' property

            };


            //!!!!!!!!!!!!!!!!!
            // EXPLANATION:     When we call 'nodeListForEach' f-ion, we pass a callback f-ion into it. This f-ion is assigned to 'callback' parameter. We will loop over 'list' AND in each iteration the 'callback' f-ion gets called WITH THE ARGUMENTS THAT WE SPECIFY DOWN THERE (where we all 'nodeListForEach').
            // SO the code that we got in ANONYMOUS F-ION will be executed as many times as there will be iterations. We will have access to the 'current' element and current 'index' because we have passed them into the callback f-ion in there: 'callback(list[i], i)'.

            nodeListForEach(fields, function (current, index) { // 'current' is a list element at possition 'index'

                if (percentages[index] > 0) {

                    //need to display percentages to the webpage
                    current.textContent = percentages[index] + '%';
                    // using 'textContent' property of 'current' element
                    // At first element we want first per#entages, at se#ond - se#ond and et#.

                } else {
                    current.textContent = '---';
                }
            });

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


        /////////////////////////////////////
        // We will set up an event on a parent element of the elements that 
        // we are interested in.
        //////////////////////////////////////
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem); // adding event listenner to the parrent of our elements that will need to handle some events. 'ctrlDeleteItem' - f-ion, that is going to be called when someone clicks on 'container'.




    };

    // it is #alled ea#h time we add a new item to UI
    var updateBudget = function () {

        // 1. #al#ulate the budget (for it will #reate a publi#k method in budgetController)
        budgetContr.calculateBudget();

        // 2. return the budget
        var budget = budgetContr.getBudget();

        // 3. Display the budget on UI 
        UIcontr.displayBudget(budget);


        // NOTE: ea#h f-ion has a spe#ifi# task, SO we will have one f. to  #al#ulate the budget and separate f. to return the budget. Simply getting some information from a module IS A GOOD TASK for simple f-ion.

    };


    // It will be used by ctrlAddItem() and ctrlDeleteItem():
    var updatePercentages = function () {

        // 1. Calculate the percentages
        budgetContr.calculatePercentages();


        // 2. Read percentages from 'budgetController'
        var percentages = budgetContr.getPercentages();

        // 3. Update the UI with the new percentages
        UIcontr.displayPercentages(percentages);
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

            //## 6. Calculate and update percentages
            updatePercentages();
        }
    };




    var ctrlDeleteItem = function (event) {
        var itemID, splitID, type, ID;
        //We can say that we want access to the 'event obj.' by puting
        //parameter 'event' in here ('event' is an arbitrary chosen name)
        // Reason why we need this event here is that we want to know WHAT THE 
        //TARGET ELEMENT IS!!!
        // In 'event delegation' an event bubbles up and then we can know 
        //where it came from (where it was first fired) by looking to TARGET 
        //property of the event.

        //When we #li#k on 'delete' button, we a#tually #li#k on 'i' element
        //When we #li#k the button, it is not only the button that we want to delete. We want to delete all of the html #ode, that is representing our added element (whether it is expense or in#ome).
        // Ea#h of those items are identified by unique ID name e.g. 'income-0'. 
        //RESUME: i element (target element) that we #li#k, is not the one that we are interested in, it is its parant element e.g. <div class="item clearfix" id="income-0">. We want to have a##ess to it.
        //SO WE WANT TO MOVE UP IN DOM. IT IS CALLED ''DOM TRAVERSING''.


        // READING THIS ID FROM DOM
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id; // We want a parent node of this 'target'. This 'target' property returns html NODE IN THE DOM. When we want to move up from that can add '.parentNode'
        // now we are a##essing the button element NOT the 'i' element. Button element is the parent of 'i'. 
        // If we want to move to "<div class="item clearfix" id="income-0">", we need to use 'parentNode' property 4 times!!!!
        ///SO NOW WE REA#HED DIV ELEMENT, THAT WE ARE INTERESTED IN. PARTI#ULARLY WE ARE INTERESTED IN ID #OZ IT IS UNIQUE IDENTIFIRE OF THIS ITEM.


        // other elements of the page don't have an ids.
        if (itemID) { // itemId will be COERCED (IE. CONVERTED) to true if it EXIST, othervise it will be coerced to false.


            // Initially the string is primitive.
            // As soon as we call one of methods on a string, then JS 
            // automati#ally puts a wrapper around THE STRING AND CONVERTS 
            // IT FROM PRIMITIVE TO AN OBJECT. Then this OBJECT has a##ess 
            // to lots of string methods.
            // The same happens to NUMBERS!!!

            // using split method on string:
            splitID = itemID.split('-'); // 'split() returns array with a
            // members of a broken string parts'
            type = splitID[0]; //...
            ID = parseInt(splitID[1]); // 'split' method returns string, SO we need parseInt to convert it to 'int'

            // now we can delete the item from UI and the data model (budgetController).

            //## 1. delete the item from the data structure
            budgetContr.deleteItem(type, ID);

            //## 2. Delete the item from the UI
            UIcontr.deleteListItem(itemID);

            //## 3. Update and show the new budget
            updateBudget();

            //## 4. Calculate and update percentages
            updatePercentages();
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

            //to set everything to 0:
            UIcontr.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });

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
