import {
    clearInputsFromModal,
    clearInputs,
    addItemToPage,
    getInputValues,
    renderItemsList,
    renderTotalReviews,
    EDIT_BUTTON_PREFIX,
}
    from './dom_util.js';


const addButton = document.getElementById("submit-button");
const findButton = document.getElementById("search-button");
const findInput = document.getElementById("search-input");
const sortButton = document.getElementById("sort-button");

const nameInput = document.getElementById("name-input");
const durationInput = document.getElementById("duration-input");
const reviewInput = document.getElementById("reviews-input");
const errorMessage = document.getElementById("error-message");

const nameInputModal = document.getElementById("name-input-modal");
const durationInputModal = document.getElementById("duration-input-modal");
const reviewInputModal = document.getElementById("reviews-input-modal");
const errorMessageModal = document.getElementById("error-message-modal");

const modal = document.getElementById("modal-window-background");
const submitButtonModal = document.getElementsByClassName("submit-button-modal")[0];

const itemList = document.getElementById("items-container");

let movies = [];
let renderedItems = [];
let selectedItemForEdit = null;

renderTotalReviews(0);

itemList.addEventListener('click', (e) => {
    if (e.target.classList.contains("edit-button")) {
        modal.removeAttribute("hidden");
        selectedItemForEdit = document.getElementById(`item-${e.target.id.replace(EDIT_BUTTON_PREFIX, "")}`);
    }
})

submitButtonModal.addEventListener('click', (event) => {
    event.preventDefault();
    const errors = [];

    if (nameInputModal.value.trim() === "") {
        errors.push("Name required");
    }

    if (isNaN(durationInputModal.value) || isNaN(reviewInputModal.value)) {
        errors.push("Reviews and duration are integers");
    }

    if (errors.length > 0) {
        errorMessageModal.toggleAttribute("hidden");
        errorMessageModal.innerHTML = errors.join(', ');
    }
    else {
        selectedItemForEdit.querySelector(".item-name").innerText = `"${nameInputModal.value}"`;
        selectedItemForEdit.querySelector(".item-duration").innerText = `${durationInputModal.value} min`;
        selectedItemForEdit.querySelector(".item-reviews").innerText = `${reviewInputModal.value} reviews`;
        modal.setAttribute("hidden", true);
        const u_id = selectedItemForEdit.id.replace("item-","");
        const u_name = nameInputModal.value;
        const u_duration = durationInputModal.value;
        const u_review = reviewInputModal.value;
        console.log(movies);
        movies = movies.filter(function(obj) {
            return obj.id != selectedItemForEdit.id.replace("item-", "");
        })
        console.log(movies);
        const updatedItem = {
            id: u_id,
            name: u_name,
            duration: u_duration,
            reviews: u_review,
        }
        movies.push(updatedItem);
        console.log(movies);
        countTotalReviews(movies);
        selectedItemForEdit = null;
        clearInputsFromModal();
    }
})


addButton.addEventListener('click', (event) => {
    const errors = [];

    if (nameInput.value.trim() === "") {
        errors.push("Name required");
    }

    if (isNaN(durationInput.value) || isNaN(reviewInput.value)) {
        errors.push("Reviews and duration are integers");
    }

    if (errors.length > 0) {
        event.preventDefault();
        errorMessage.toggleAttribute("hidden");
        errorMessage.innerHTML = errors.join(', ');
    }
    else {
        renderValidItem(event);
        errorMessage.toggleAttribute("hidden");
    }
})


const addItem = ({ name, duration, reviews }) => {
    const id = Date.now().toString();
    const newItem = {
        id,
        name,
        duration,
        reviews,
    };

    movies.push(newItem);
    renderedItems = movies;
    addItemToPage(newItem);
}


function renderValidItem(event) {
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
}

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
        return totalReviews + parseInt(b.reviews);
    }, 0)
    renderTotalReviews(totalReviews);
}

renderItemsList(movies);