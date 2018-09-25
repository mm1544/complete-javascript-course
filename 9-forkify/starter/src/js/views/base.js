// will create an object that will contain all of the elements, that we select from DOM (i.e. all the elements that we need for app). AND we will then ***export that.

//***named export
export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchResList: document.querySelector('.results__list'),
    searchRes: document.querySelector('.results'),
    searchResPages: document.querySelector('.results__pages')

};


export const elementStrings = {
    loader: 'loader'
};


//IT IS GOOD TO HAVE ***ONE CENTRAL VARIABLE*** WITH ALL THOSE ***DOM ELEMENTS***, THAT WE NEED IN OUR APP. FOR THAT WILL CREATE A NEW MODULE.


// Loader will be reused. The best way to do that is to pass in the 'parent' and then 'say' that we want to attached the loader here as a CHILD ELEMENT of a parent (??).
// Eg. In our case we want the loader to be in the left list, SO we need to pass that left 'parent' (??) so the loader will be attached to it.
// AND when we will need loader in the middle list, we then can pas a 'middle' parent.
export const renderLoader = parent => {
    const loader = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    //attaching loader
    parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
    // need to select the loader
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) {
        // DELETING ELEMENT FROM THE DOM. Re#ap: First we have to go up the tree, to the parent element, THEN we can remove child:
        loader.parentElement.removeChild(loader); // i.e. in order to remove an element, we need to remove a child
    };
};

























