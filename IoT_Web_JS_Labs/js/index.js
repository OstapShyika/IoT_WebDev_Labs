import {
    clearInputs,
    addItemToPage,
    getInputValues,
    renderItemsList,
    renderTotalReviews,

}
    from './dom_util.js';


const addButton = document.getElementById("submit-button");
const findButton = document.getElementById("search-button");
const findInput = document.getElementById("search-input");
const sortButton = document.getElementById("sort-button");

let movies = [];
let renderedItems = [];

const addItem = ({ name, duration, reviews }) => {
    const newItem = {
        name,
        duration,
        reviews,
    };

    movies.push(newItem);
    renderedItems = movies;
    addItemToPage(newItem);
}

addButton.addEventListener("click", (event) => {
    event.preventDefault();

    const { name, duration, reviews } = getInputValues();

    clearInputs();
    addItem({
        name: name,
        duration: duration,
        reviews: reviews,
    })

    countTotalReviews(movies);
    renderedItems = movies;
})

findButton.addEventListener("click", (event) => {
    event.preventDefault();

    const foundMovies = movies.filter(movie => movie.name.search(findInput.value) !== -1);

    renderItemsList(foundMovies);
    renderedItems = foundMovies;
    countTotalReviews(foundMovies);
})

sortButton.addEventListener("click", (event) => {
    event.preventDefault();
    const sortedMovies = renderedItems.sort(function (a, b) {
        return b.duration - a.duration;
    })
    
    renderItemsList(sortedMovies);
    renderedItems = sortedMovies;
})

const countTotalReviews = (movies) => {
    const totalReviews = movies.reduce(function (totalReviews, b) {
        return totalReviews + parseInt(b.duration);
    }, 0)
    renderTotalReviews(totalReviews);
}

renderItemsList(movies);