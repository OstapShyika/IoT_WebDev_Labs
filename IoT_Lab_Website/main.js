const OPEN_CLASSNAME = "open";

const toggleButton = document.getElementById('toggle-button')
const navbarLinks = document.getElementsByClassName('header__nav')[0]

toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle(OPEN_CLASSNAME)
})