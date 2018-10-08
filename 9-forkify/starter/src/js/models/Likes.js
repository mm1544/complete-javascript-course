// 'Likes' will be stored in here

export default class Likes {
    constructor() {
        //initialising an empty array
        this.likes = [];
    }

    addLike(id, title, author, img) {
        const like = { id, title, author, img };
        this.likes.push(like);
        return like;
    }

    deleteLike(id) {
        const index = this.likes.findIndex(el => el.id === id); 
        this.likes.splice(index, 1);
    }

    // checks whether the recipe is liked
    isLiked(id) {
        return this.likes.findIndex(el => el.id === id) !== -1; // if there is no item with passed id in 'this.likes', then this expression will be false.
    }

    // gets number of liked recipies
    getNumLikes() {
        return this.likes.length;
    }
}