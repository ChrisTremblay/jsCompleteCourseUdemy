import {elements} from './base';

export const getInput = () => {
    return elements.searchInput.value;
};

export const clearInput = () =>{
    elements.searchInput.value='';
};

export const clearResults = () =>{
    elements.searchResultList.innerHTML='';
    elements.searchResultPages.innerHTML='';
};

const limitRecipeTitle = (title, limit =  17) =>{
    const newTitle = [];
    if(title.length > limit){
        title.split(' ').reduce((acc, curr) =>{
            if(acc + curr.length <=limit){
                newTitle.push(curr);
            }
            return acc + curr.length;
        }, 0);
        return `${newTitle.join(' ')} (...)`;
    }
    return title;
};

const renderRecipe = recipe =>{
    const markup = `
    <li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    `;
    elements.searchResultList.insertAdjacentHTML('beforeend', markup);
};

const createButton = (page, type) =>{
    return `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page-1 : page+1}>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left':'right'}"></use>
        </svg>
        <span>Page ${type === 'prev' ? page-1 : page+1}</span>
    </button>
    `
};

const renderButtons = (page, numberOfResults, resultsPerPage) => {
    const pages = Math.ceil(numberOfResults/resultsPerPage);
    let button;

    if(page === 1 && pages > 1){
        button = createButton(page, 'next');
    }else if(page === pages && pages > 1){
        button = createButton(page, 'prev');
    }else{
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `;
    }
    elements.searchResultPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (recipes, page = 1, resultsPerPage = 10) =>{
    const start = (page-1) * resultsPerPage;
    const end = page * resultsPerPage;

    recipes.slice(start, end).forEach(renderRecipe);
    renderButtons(page, recipes.length, resultsPerPage);
};