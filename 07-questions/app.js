//using selectors inside the element
// const questions = document.querySelectorAll(".question");
// questions.forEach((question) => {
//   const btn = question.querySelector(".question-btn");
//   btn.addEventListener("click", () => {
//     questions.forEach((item) => {
//       console.log(item);
//       if (item !== question) {
//         item.classList.remove("show-text");
//       }
//     });
//     question.classList.toggle("show-text");
//   });
// });

// traversing the dom
const qusBtn = document.querySelectorAll(".question-btn");
qusBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const question = e.currentTarget.parentElement.parentElement;
    qusBtn.forEach((item) => {
      const hideitem = item.parentElement.parentElement;
      if (hideitem !== question) {
        hideitem.classList.remove("show-text");
      }
    });
    question.classList.toggle("show-text");
  });
});
