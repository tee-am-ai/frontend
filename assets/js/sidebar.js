const sidebar = document.getElementById("sidebar");
const sidebarCollapse = document.getElementById("sidebarCollapse");
const inputArea = document.getElementById("input-area");
const backToTop = document.querySelector(".back-to-top");
const chatBox = document.getElementById("chat-box");

sidebarCollapse.addEventListener("click", function () {
  const screenWidth = window.innerWidth;
  const active = sidebar.classList.toggle("active");

  if (screenWidth <= 1199) {
    if (active) {
      inputArea.style.marginLeft = "335px";
      chatBox.style.marginLeft = "335px";
      backToTop.style.right = "49%";
    } else {
      inputArea.style.marginLeft = "0";
      chatBox.style.marginLeft = "0";
      backToTop.style.right = "41%";
    }
  } else {
    if (active) {
      inputArea.style.marginLeft = "32px";
      backToTop.style.right = "49%";
    } else {
      inputArea.style.marginLeft = "335px";
      backToTop.style.right = "41%";
    }
  }
});
