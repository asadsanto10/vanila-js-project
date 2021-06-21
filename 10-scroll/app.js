// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.

// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.

// slice extracts a section of a string without modifying original string
//offsetTop - A Number, representing the top position of the element, in pixels

// ********** set date ************
const date = document.getElementById("date");
date.innerHTML = new Date().getFullYear();

// ********** close links ************
const navToggle = document.querySelector(".nav-toggle");
const linksContainer = document.querySelector(".links-container");
const links = document.querySelector(".links");

navToggle.addEventListener("click", () => {
  linksContainer.classList.toggle("show-links");
  const containerHeight = linksContainer.getBoundingClientRect().height;
  const linkHeight = links.getBoundingClientRect().height;

  if (containerHeight === 0) {
    linksContainer.style.height = `${linkHeight}px`;
  } else {
    linksContainer.style.height = 0;
  }
});

// ********** fixed navbar ************
const nav = document.getElementById("nav");
const topLink = document.querySelector(".top-link");

// scrool event
window.addEventListener("scroll", () => {
  const scroolHeight = window.pageYOffset;
  const navHeight = nav.getBoundingClientRect().height;

  if (scroolHeight > navHeight) {
    nav.classList.add("fixed-nav");
    topLink.classList.add("show-link");
  } else {
    nav.classList.remove("fixed-nav");
    topLink.classList.remove("show-link");
  }
});

// ********** smooth scroll ************
const scroolLinks = document.querySelectorAll(".scroll-link");
scroolLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    // get specific link id
    const id = e.currentTarget.getAttribute("href").slice(1);
    const element = document.getElementById(id);

    // calculate the height
    const navHeight = nav.getBoundingClientRect().height;
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const fixeNav = nav.classList.contains("fixed-nav");

    let position = element.offsetTop - navHeight;
    if (!fixeNav) {
      position -= navHeight;
    }
    if (navHeight > 82) {
      position += containerHeight;
    }
    window.scrollTo({
      left: 0,
      top: position,
    });
    linksContainer.style.height = 0;
  });
});
