const nameInput = document.getElementById("name-input");
const durationInput = document.getElementById("duration-input");
const reviewInput = document.getElementById("reviews-input");
const itemsContainer = document.getElementById("items-container");
const totalReviews = document.getElementById("total-reviews");

const totalReviewsTemplate = (totalReviews) => `
Total reviews: ${totalReviews}
`;

const getItemId = (ID) => `item-${ID}`;

const itemTemplate = ({ id, name, duration, reviews }) => `
<li id="${getItemId(id)}" class="item">
    <img src="images/Dark-Knight-70822-scaled-768x1137.jpg" />
    <div>
        <h1>"${name}"</h1>
            <div>
                <h3>${duration} min</h3>
                <h3>${reviews} reviews</h3>
            </div>
    </div>
</li>`;

export const clearInputs = () => {
    nameInput.value = "";
    durationInput.value = "";
    reviewInput.value = "";
};

export const addItemToPage = ({ id, name, duration, reviews }) => {
    itemsContainer.insertAdjacentHTML(
        "afterbegin",
        itemTemplate({ id, name, duration, reviews })
    );
};

export const renderItemsList = (items) => {
    itemsContainer.innerHTML = "";

    for (const item of items) {
        addItemToPage(item);
    }
};

export const getInputValues = () => {
    return {
        name: nameInput.value,
        duration: durationInput.value,
        reviews: reviewInput.value,
    };
};

export const renderTotalReviews = (reviews) => {
    totalReviews.innerHTML = "";
    totalReviews.insertAdjacentHTML(
        "afterbegin",
        totalReviewsTemplate(reviews),
    )
}