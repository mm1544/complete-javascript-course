// 'Likes' will be stored in here

export default class Likes {
    constructor() {
        //initialising an empty array
        this.likes = [];
    }

    addLike(id, title, author, img) {
        const like = { id, title, author, img };
        this.likes.push(like);

        // Persist data in local storage
        this.persistData(); // because it is the method ***on this exact object**, therefore we need 'this' (??)

        return like;
    }

    deleteLike(id) {
        const index = this.likes.findIndex(el => el.id === id);
        this.likes.splice(index, 1);

        // Persist data in local storage
        this.persistData();

    }

    // checks whether the recipe is liked
    isLiked(id) {
        return this.likes.findIndex(el => el.id === id) !== -1; // if there is no item with passed id in 'this.likes', then this expression will be false.
    }

    // gets number of liked recipies
    getNumLikes() {
        return this.likes.length;
    }


    /*
    TO Implementing local storage:
    **Each time when we ***change this.likes array, 
    need PERSIST (store) that data IN LOCAL STORAGE
    */

    persistData() {
        // can ONLY save **strings in here, so need to convert an array into a string
        localStorage.setItem('likes', JSON.stringify(this.likes)); // When we will READ the storage, then it will be **converted back to an ARRAY

        //NOTE: all data will be stored with the same KEY - 'likes'
    }


    /* Method to read the data back from the local storage to the 'likes' list, when we reload the page. 
    */
   readStorage() {
       const storage = JSON.parse(localStorage.getItem('likes')); //  will convert a STRING to JS array. If there is not likes, then NULL will be returned, therefore need to handle this situation.


       // Restoring likes from the localStorage
       if (storage) this.likes = storage; // if storage != NULL

   }



}




































