import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import * as searchView from './views/searchView'
import * as recipeView from './views/recipeView'
import {elements, renderLoader, clearLoader} from './views/base';

/* Global state of the app
- Search object
- Current recipe object
- Shopping list object
- Liked recipes
*/
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
            recipeView.renderRecipe(state.recipe);
        }catch(error){
            alert(error);
        }
    }
};

['hashchange', 'load'].forEach(event=>window.addEventListener(event, controlRecipe));

elements.recipe.addEventListener("click", e => {
    if(e.target.matches('.btn-decrease, .btn-decrease *')){
        if(state.recipe.servings > 1){
            state.recipe.updateServings('dec');
        }
    }
    else if(e.target.matches('.btn-increase, .btn-increase *')){
        state.recipe.updateServings('inc');
    }
    recipeView.updateServingsIngredients(state.recipe);

});

window.l = new List();