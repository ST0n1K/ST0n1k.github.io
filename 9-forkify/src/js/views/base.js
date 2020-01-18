export const elements = {
    searchInput: document.querySelector('.search__field'),
    searchButton: document.querySelector('.search'),
    searchResultList: document.querySelector('.results__list'),
    loaderPlace: document.querySelector('.results'),
    buttonsSearch: document.querySelector('.results__pages'),
    recipe: document.querySelector('.recipe'),
    shopping: document.querySelector('.shopping__list'),
    likesMenu: document.querySelector('.likes__field'),
    likesList: document.querySelector('.likes__list')
};

export const elementString = {
    loader: 'loader'
};

export const renderLoader = parent => {
    const template = `
        <div class="${elementString.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', template);
}

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementString.loader}`);
    if(loader) loader.parentElement.removeChild(loader);
}