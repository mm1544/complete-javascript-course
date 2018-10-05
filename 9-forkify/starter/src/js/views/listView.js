import {elements} from './base';

// Will be 2 meth.: 1) to render the item
//                  2) to delete from user interface



export const renderItem = item => {
    //will receive the item as an input

    //creating markup variable:
    const markup = `
        <li class="shopping__item" data-itemid=${item.id}> <!-- ADDING DATA ATRIBUTE (same as in the 'searchView'), SO WE CAN LATER ***SELECT ELEMENTS BASED ON THAT DATA ATRIBUTE AND ID***  -->
            <div class="shopping__count">
                <input type="number" value="${item.count}" step="${item.count}" class="shopping__count-value">
                <!-- want to add aclass here, so that we can later select this input, read 'value'  -->
                <!-- 'STEP' IS THE CHANGE THAT HAPPENS WHEN ARROW BUTTONS ARE PRESSED. The 'count' will be stored in here, AND it will be possible to update it. -->
                <p>${item.unit}</p>
            </div>
            <p class="shopping__description">${item.ingredient}</p>
            <button class="shopping__delete btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                    </svg>
            </button>
        </li>
    `;

    //inserting 'markup'
    elements.shopping.insertAdjacentHTML('beforeend', markup);
};



export const deleteItem = id => {
    //selecting element that we want to delete based on id
    const item = document.querySelector(`[data-itemid="${id}"]`);

    // to remove item we have to move up to the parent AND then remove the child:
    if(item) item.parentElement.removeChild(item); // testing first if there is an item 
};































