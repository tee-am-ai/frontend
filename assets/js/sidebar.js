const sidebar = document.getElementById("sidebar");
const sidebarCollapse = document.getElementById("sidebarCollapse");
const inputArea = document.getElementById("input-area");
const backToTop = document.querySelector(".back-to-top");

sidebarCollapse.addEventListener("click", function () {
  sidebar.classList.toggle("active");
  if (sidebar.classList.contains("active")) {
    inputArea.style.marginLeft = "32px"; 
    backToTop.style.right = "49%";
  } else {
    inputArea.style.marginLeft = "335px";
    backToTop.style.right = "41%";
  }
});

