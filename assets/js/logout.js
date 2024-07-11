import { deleteCookie } from "https://jscroot.github.io/cookie/croot.js";

const logout = () => {
  Swal.fire({
    icon: "question",
    title: "Konfirmasi",
    text: "Apakah Anda benar ingin logout?",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Benar",
    cancelButtonText: "Tidak",
  }).then((result) => {
    if (result.isConfirmed) {
      deleteCookie("Authorization"); //Destroy cookies
      window.location.href = "./signin.html";
    }
  });
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
