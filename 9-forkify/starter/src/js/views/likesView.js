import { elements } from './base';
import { limitRecipeTitle } from './searchView';

// F-ion to toggle the 'like' button
export const toggleLikeBtn = isLiked => {
    //'isLiked' - Boolean saying T or F, deppending if recipe is liked or not, AND will addjust the button accordingly


    // var that corresponds to 'isLiked var
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';

    //selecting the button
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconString}`); // 'use' element is a child of 'recipe__love' class; SO we have to change 'href' attribute by using 'setAttribute'; first val. is vhat we want to change, and second val. is what is changed TO  

    //icons.svg#icon-heart-outlined

};

export const toggleLikeMenu = numLikes => {
    //passing nr. of likes, based on that will figure whether the Like menu should be shown or not
    elements.likesMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden'; //will manipulate 'style' property in css
};

export const renderLike = like => {
    const markup = `
        <li>
            <a class="likes__link" href="#${like.id}">
                <figure class="likes__fig">
                    <img src="${like.img}" alt="${limitRecipeTitle(like.title)}">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${limitRecipeTitle(like.title)}</h4>
                    <p class="likes__author">${like.author}</p>
                </div>
            </a>
        </li>
    `;
    elements.likesList.insertAdjacentHTML('beforeend', markup);
};

export const deleteLike = id => {
    const el = document.querySelector(`.likes__link[href="#${id}"]`).parentElement; // special CSS selector where can ****select based on 'href' atribute; Wnat to select 'likes__link' class elements with 'href' with particular id
    if (el) el.parentElement.removeChild(el); // if there is an element that we are looking for, we move to the parent el and remove child

 
}