import { deleteCookie } from "https://jscroot.github.io/cookie/croot.js";

const logout = () => {
  deleteCookie("Authorization"); // Destroy cookies
  window.location.href = "./signin.html"; // Redirect to signin page
};

document.addEventListener("DOMContentLoaded", () => {
  const btnLogout = document.getElementById("btnLogout");
  if (btnLogout) {
    btnLogout.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent the default link behavior
      logout();
    });
  }
});

