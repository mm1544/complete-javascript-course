// We want to represent the shoping list ***through an obje#t***. Will build a class, which we will use as a blueprint to generate list obj. later in the controler.

import uniqid from 'uniqid';


export default class List {
    constructor() {
        this.items = []; // empty array; new el. will be pushed into it

        // NOTE
        // We will have an array in which each of the **elements is an object, whi#h will have a '#ount', 'unit', 'ingredient'
    }

    // meth. to add new item to the list
    addItem(count, unit, ingredient) {
        // our list is a list of ingredients and it has the same stru#ture as it ingedient data

        const item = {

            id: uniqid(),
            count,
            unit,
            ingredient

            // need each of the items to have an ID, so we can later identify them to make some updates, or to delete items
            // we will include small library that will ***create IDs for us

        }
        this.items.push(item); // IT IS A GOOD PRACTICE TO RETURN A NEWLY CREATED OBJECT

        return item; // because it returns 'item', we can save it
    }



    //To delete the item
    deleteItem(id) {
        // We want to find a position of the item, that has (matches) this ID:
        const index = this.items.findIndex(el => el.id === id); // have a calback f-ion inside, which receives the current element, AND we have to test if the current element's id equals to the id that we have passed to 'deleteItem'. THEN IT WILL FIND THE INDEX OF AN ITEM THAT SATISFIES PREVIOUS CONDITION.

        // id of the item we will get 'probably' (?) from the user interface. Based on that id we are going to delete item from 'items' array.
        // To achieve that will use ***'splice' method
        this.items.splice(index, 1); // we are passing a **start index, and **how many possitions we want to take. IT will then **return these elements, and **delete them from the **original array. SO IT  ****MUTATES THE ORIGINAL AR.

        //RECAP: 'slice' met. is simmilar. It accepts the start and the end index of the portion that we want to take, and then ***returns a new array. IT DOESN'T MUTATE ORIGINAL AR.


    };

    //UPDATING THE COUNT
    updateCount(id, newCount) {
        //NOT gonna find the index, but will FIND the element ***itself:
        this.items.find(el => el.id === id).count = newCount; // it will ***Return the item that satisfie condition; THEN we set the count of the item equal to 'newCount'.

    }

}