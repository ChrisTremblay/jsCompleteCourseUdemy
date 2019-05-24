import Search from './models/Search';
import * as searchView from './views/searchView'
import {elements, renderLoader, clearLoader} from './views/base';

/* Global state of the app
- Search object
- Current recipe object
- Shopping list object
- Liked recipes
*/
const state = {};

const controlSearch = async () => {
    const query = searchView.getInput();
    if(query){
        state.search = new Search(query);
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchResult);

        await state.search.getResults();
        
        clearLoader();
        searchView.renderResults(state.search.result);
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