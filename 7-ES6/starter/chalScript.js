/*
// create a class of  Park and Street

class Park {
    constructor (id, name, buildYear, town, area, treeCount) {
        this.id;
        this.name = name;
        this.buildYear = buildYear;
        this.town = town;
        this.area = area;
        this.treeCount = treeCount;
        this.dencity;
        
    }
    
    calcDencity() {
        this.dencity = this.treeCount / this.area;
        //console.log(this.treeCount / this.area);
    }
    
}

// 3 parks

// 1. tree density of the park

// 2. average age of each towns(!!!) park

// 3. Name of the park, that has more than 1000 trees

// #reating parks:
let firstPark = new Park(1, 'First', 1930, 'York', 8, 500);
let secondPark = new Park(2, 'Second', 1810, 'York', 15, 30000);
let thirdPark = new Park(3, 'Third', 1965, 'York', 45, 80000);

console.log(firstPark);
console.log(secondPark);
console.log(thirdPark);
firstPark.calcDensity();

console.log(firstPark);






let avAge = function() {
    
}

*/


class Element {
    constructor(name, buildYear) {
        this.name = name;
        this.buildYear = buildYear;
    }
}



class Park extends Element {
    constructor(name, buildYear, area, numTrees) {
        // need to repeat property names of supper #onstru#tor
        
        super(name, buildYear);
        this.area = area; //km2
        this.numTrees = numTrees;
    }
    
    treeDensity() {
        const density = this.numTrees / this.area;
        console.log(`${this.name} has a tree density of ${density} trees per square km.`);
    }
}


class Street extends Element {
    constructor(name, buildYear, length, size = 3 ) { // default
        super(name, buildYear); // calling a superclass
        this.length = length;
        this.size = size;
    }
    
    // CREATING A DATA MODEL
    classifyStreet() {
        // will use a number to make a clasification:
        // 'tiny - 1, 'small' - 2, etc.
        // SO WE NEED TO DO A HASHMAP IN HERE (!!!)
        
        // USE OF 'MAP':
        const classification = new Map();
        
        // PUTING DATA TO THE 'MAP'
        classification.set(1, 'tiny');
        classification.set(2, 'small');
        classification.set(3, 'normal'); // normal is used as default value
        classification.set(4, 'big');
        classification.set(5, 'huge');
        
        console.log(`${this.name}, built in ${this.buildYear}, is a ${classification.get(this.size)} street.`)
    } 
}


  //CREATING DATA:
// Creating array, which will contain all 3 parks.

const allParks = [new Park('Green Park', 1987, 0.2, 215),
                 new Park('National park', 1894, 2.9, 3541),
                  new Park('Oak Park', 1953, 8.4, 949)
                 ];


// STREETS:

const allStreets = [new Street('Ocian Avenue', 1999, 1.1, 4),
                   new Street('Evergreen Street', 2008, 2.7, 2),
                    new Street('4th Street', 2015, 0.8), //default size
                    new Street('Sunset Boulevard', 1982, 2.5, 5)
                   ];



function calc(arr) {
    
    //'reduce' method reduces array to a single value:
    // 'redu#e' loops through an array to accumulate all the values into a // single value
    
            // RECAP: ARROW FUNCTION:- '''([takes parameters]) => ([expression what is needed to return]) 
    const sum = arr.reduce((prev, cur, index) => prev + cur, 0) // #an use a callba#k f-ion inside. We not only have an a##ess to a #urrent value and #urrent index, but also to the previous value
    // se#ond parameter of reduce() is initial value of the a##umulator, i.e. - the nr. at whi#h we want to start(in this #ase - 0).
    
    //NOW lets return that sum and the average
    // WILL BE using ''destructuring'' to save those element in 2 different vars, when we call this f-ion:
    
    return [sum, (sum / arr.length) ]; 
    
    
    
    
};



function reportParks(p) {
    
    console.log('-----PARKS REPORT-----');
    
    //Density
    // to loop through array:
    p.forEach(el => el.treeDensity()); //for each element calling a method
    
    
    //Calculating the ages of parks and storing them into an array:
    const ages = p.map(el => new Date().getFullYear() - el.buildYear); // loop through array p (whi#h is array of our parks), and will use a current element 'el', then the age is easy to calculate
    
    //Average age
        // Here will create an external f-ion, whi#h is going to #al#ulate the averagea and the total for any inputed array.
    
        // USING DESTRUCTURING
    const [totalAge, avgAge] = calc(ages); // will pass an ARRAY OF ALL THE AGES OF ALL THE PARKS
    
    
    console.log(`Our ${p.length} parks have an average of ${avgAge} years.`)
    
    //Whitch park has more than 1000t.
    //''findIndex()'' !!!!!!!!!!!!!!!!!
    const i = p.map(el => el.numTrees).findIndex(el => el >= 1000); // index i. Loop through 'p' and store tree numbers in new array. THEN we sear#h for index of element that is larger than 1000
    
    console.log(`${p[i].name} has more than 1000 trees.`);
    
};


function reportStreets(s) {
     console.log('-----STREETS REPORT-----');
    
    //Total and avg length of the town's streets
    const [totalLength, avgLength] = calc(s.map(el => el.length));
    console.log(`Our ${s.length} streets have a total lenght of ${totalLength} km, with an average of ${avgLength}km`);
    
    // Classify sizes
        //Using 'forEach()'
    s.forEach(el => el.classifyStreet());
    
};


reportParks(allParks);
reportStreets(allStreets);















































