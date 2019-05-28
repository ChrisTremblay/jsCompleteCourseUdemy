import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import {elements, renderLoader, clearLoader} from './views/base';
import Likes from './models/Likes';

const state = {};

/* SEARCH CONTROLLER */
const controlSearch = async () => {
    const query = searchView.getInput();
    if(query){
        state.search = new Search(query);
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchResult);

        try{
            await state.search.getResults();
            clearLoader();
            searchView.renderResults(state.search.result);
        }catch(error){
            alert(error);
            clearLoader();
        }
    }
}


elements.searchForm.addEventListener("submit", e =>{
    e.preventDefault();
    controlSearch();
});

elements.searchResultPages.addEventListener("click", e =>{
    const btn = e.target.closest('.btn-inline');
    if(btn){
        searchView.clearResults();
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.renderResults(state.search.result, goToPage);
    }
});

/*RECIPE CONTROLLER */
const controlRecipe = async () =>{
    const id = window.location.hash.replace('#','');

    if(id){
        recipeView.clearRecipe();
        renderLoader(elements.recipe);
        if(state.search){
            searchView.highlightSelected(id);
        }
        state.recipe = new Recipe(id);
        try{
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
            state.recipe.calcServings();
            state.recipe.calcTime();
            clearLoader();
            recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
        }catch(error){
            alert(error);
        }
    }
};

['hashchange', 'load'].forEach(event=>window.addEventListener(event, controlRecipe));

const controlList = () => {
    if(!state.list) state.list = new List();

    state.recipe.ingredients.forEach(el =>{
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    });
}

elements.shopping.addEventListener("click", e=>{
    const id = e.target.closest(".shopping__item").dataset.itemid;
    if(e.target.matches(".shopping__delete, .shopping__delete *")){
        state.list.deleteItem(id);
        listView.deleteItem(id);
    }else if(e.target.matches(".shopping__count-value")){
        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id, val);
    }
});

window.addEventListener('load', () =>{
    state.likes = new Likes();
    state.likes.readStorage();
    likesView.toggleLikeMenu(state.likes.getNumLikes());
    state.likes.likes.forEach(like => likesView.renderLike(like));
});

const controlLike = () => {
    if(!state.likes) state.likes = new Likes();
    const currentID = state.recipe.id;

    if(!state.likes.isLiked(currentID)){
        const newLike = state.likes.addLike(
            currentID, 
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        );
        likesView.toggleLikeBtn(true);
        likesView.renderLike(newLike);
    }else{
        state.likes.deleteLike(currentID);
        likesView.toggleLikeBtn(false);
        likesView.deleteLike(currentID);
    }
    likesView.toggleLikeMenu(state.likes.getNumLikes());
};

elements.recipe.addEventListener("click", e => {
    if(e.target.matches('.btn-decrease, .btn-decrease *')){
        if(state.recipe.servings > 1){
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    }
    else if(e.target.matches('.btn-increase, .btn-increase *')){
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    }else if(e.target.matches(".recipe__btn--add, .recipe__btn--add *")){
        controlList();
    }else if(e.target.matches(".recipe__love, .recipe__love *")){
        controlLike();
    }
});