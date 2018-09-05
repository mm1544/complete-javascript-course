// Will write the module with the module pattern
// 
// This var. will be immediately invoked f-ion expression (IIFE), that will return an obje#t
var budgetController = (function() {
    var x = 23;
    
    var add = function(a) {
        return x + a;
     
        
    }
    
    return {
        publicTest: function(b) {
           return add(b);
        }
    }
    
    
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

var UIcontroller = (function() {
    
    //some #ode
    
})();







// 'budgetController' and 'UIcontroller' modules are #ompleately independent modules. There will be no interaction between them ever. They are intentionaly made as INDEPENDANT as possible. 

    
 // BUT we need some way to #onne#t these two modules. E.g. we need to read data from UI and then add that data as the new expence to the budgetController. Therefore we #reate a third module  - app 'controller'.



var controller = (function(budgetContr, UIcontr) {
    
    var z = budgetContr.publicTest(5);
    
    return {
        anotherPubl: function() {
            console.log(z);
        }
    }
    
    
})(budgetController, UIcontroller); // NOTE: modules #an re#eive arguments. Modules are just f-ion expressions, so we #an pass arguments into them. WE will pass other two modules as arguments to the #ontroller so this #ontroller about the other two modules and #an #onne#t them.















    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    