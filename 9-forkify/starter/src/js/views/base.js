// will create an object that will contain all of the elements, that we select from DOM (i.e. all the elements that we need for app). AND we will then ***export that.

//***named export
export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchResList: document.querySelector('.results__list')

};

//IT IS GOOD TO HAVE ***ONE CENTRAL VARIABLE*** WITH ALL THOSE ***DOM ELEMENTS***, THAT WE NEED IN OUR APP. FOR THAT WILL CREATE A NEW MODULE.

