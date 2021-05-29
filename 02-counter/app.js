// set initial value
let count = 1;

const value = document.querySelector("#value");
const btns = document.querySelectorAll(".btn");
const dec = document.getElementById("dec");

btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const style = e.currentTarget.classList;
    if (style.contains("decrease")) {
      count--;
    } else if (style.contains("increase")) {
      count++;
    } else {
      count = 0;
    }
    if (count <= 0) {
      dec.disabled = true;
    } else {
      dec.disabled = false;
    }

    value.textContent = count;
  });
});
