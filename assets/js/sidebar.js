const sidebar = document.getElementById("sidebar");
const sidebarCollapse = document.getElementById("sidebarCollapse");
const inputArea = document.getElementById("input-area");

sidebarCollapse.addEventListener("click", function () {
  sidebar.classList.toggle("active");
  if (sidebar.classList.contains("active")) {
    inputArea.style.marginLeft = "32px"; 
  } else {
    inputArea.style.marginLeft = "335px";
  }
});
