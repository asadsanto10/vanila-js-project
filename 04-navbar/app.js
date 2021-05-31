// classList - shows/gets all classes
// contains - checks classList for specific class
// add - add class
// remove - remove class
// toggle - toggles class

const navToggleButton = document.querySelector(".nav-toggle");
const links = document.querySelector(".links");

navToggleButton.addEventListener("click", () => {
  //? 1st waye
  //   const showLinks = links.classList.contains("show-links");
  //   if (!showLinks) {
  //     links.classList.add("show-links");
  //   } else {
  //     links.classList.remove("show-links");
  //   }
  //? 2nd waye
  links.classList.toggle("show-links");
});
