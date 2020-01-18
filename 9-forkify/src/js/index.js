// Global app controller
import Search from './models/Search';
import List from './models/List';
import Recipe from './models/Recipe';
import { elements, renderLoader, clearLoader } from './views/base';
import * as searchView from './views/searchView';
import * as listView from './views/listView';
import * as recipeView from './views/recipeView';
import * as likesView from './views/likesView';
import Likes from './models/Likes';

/** Global state of the app
 * Search object
 * Current recipe object
 * Shopping list object
 * Liked recipes
 */
const state = {};

// SEARCH CONTROLLER

const controlSearch = async () => {
    // get query from view
    const query = searchView.getInput();

    if(query) {
        // create and add new object
        state.search = new Search(query);

        // prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.loaderPlace);

        try {
            // search for recipes
        await state.search.getResults();

        // render results on UI
        clearLoader();
        searchView.renderResults(state.search.result);
        } catch(error) {
            alert('No recipe found :(')
            clearLoader();
        };
    }
};

elements.searchButton.addEventListener('submit', event => {
    event.preventDefault();
    controlSearch();
});

elements.buttonsSearch.addEventListener('click', event => {
    const btn = event.target.closest('.btn-inline');
    if(btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});

// RECIPE CONTROLLER

const controlRecipe = async () => {
    // Get id from URL
    const id = window.location.hash.replace('#', '');
    console.log(id);

    if(id) {
        // Prepare UI
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // highlight selected
        if(state.search) searchView.highlightSelected(id);

        // Create new Object
        state.recipe = new Recipe(id);

        try {
            // Get rercipe data and parse ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
            
            // Calc time and servings
            state.recipe.calcTimeCooked();
            state.recipe.calcServings();

            // Render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);
        } catch(error) {
            console.log(error);
        }
    }
}

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

// LIST CONTROLLER

const controlList = () => {
    // create a new list if it doesnt exist
    if(!state.list) state.list = new List();

    // add each recipe
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    });
};

// Delete and update list handler

elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    if(e.target.matches('.shopping__delete, .shopping__delete *')) {
        state.list.deleteItem(id);

        listView.deleteItem(id);
    } else if(e.target.matches('.shopping__count-value')) {
        const value = parseFloat(e.value.target, 10);
        if(value > 1) {
            state.list.updateCount(id, value);
        }
    }
});

// LIKE CONTROLLER 

const controlLike = () => {
    if(!state.likes) state.likes = new Likes();
    const currentID = state.recipe.id;
    console.log(state.recipe);

    if (!state.likes.isLiked(currentID)) {
        // Add like to the state
        const newLike = state.likes.addLike(
            currentID,
            state.recipe.title,
            state.recipe.publisher,
            state.recipe.img
        );
        // Toggle the like button
        likesView.toggleLikeBtn(true);

        // Add like to UI list
        likesView.renderLikes(newLike);

    // User HAS liked current recipe
    } else {
        // Remove like from the state
        state.likes.deleteLike(currentID);

        // Toggle the like button
        likesView.toggleLikeBtn(false);

        //
        // Remove like from UI list
        likesView.deleteLike(currentID);
        
    }
    
};

window.addEventListener('load', () => {
    state.likes = new Likes();
    state.likes.readStorage();
    
    state.likes.likes.forEach(like => likesView.renderLikes(like));
});
// Recipe buttons handler

elements.recipe.addEventListener('click', e => {
    if(e.target.matches('.btn-decrease, .btn-decrease *')) {
        if(state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
        }
    } else if(e.target.matches('.btn-increase, .btn-increase *')) {
        state.recipe.updateServings('inc');
    } else if(e.target.matches('.recipe__btn-add, .recipe__btn-add *')) {
        controlList();
    } else if(e.target.matches('.recipe__love, .recipe__love *')) {
        controlLike();
    }
    recipeView.updateServingsIngr(state.recipe);
});