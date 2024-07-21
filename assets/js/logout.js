import { deleteCookie } from "https://jscroot.github.io/cookie/croot.js";

const logout = () => {
  deleteCookie("Authorization");
  window.location.href = "./signin.html";
};

document.addEventListener("DOMContentLoaded", () => {
  const btnLogout = document.getElementById("btnLogout");
  if (btnLogout) {
    btnLogout.addEventListener("click", (event) => {
      event.preventDefault(); 
      logout();
    });
  }
});

