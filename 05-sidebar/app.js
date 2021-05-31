const sidebarToggle = document.querySelector(".sidebar-toggle");
const sidebar = document.querySelector(".sidebar");
const closeBtn = document.querySelector(".close-btn");
// toggle button
sidebarToggle.addEventListener("click", () => {
  sidebar.classList.toggle("show-sidebar");
});
// close button
closeBtn.addEventListener("click", () => {
  sidebar.classList.remove("show-sidebar");
});
