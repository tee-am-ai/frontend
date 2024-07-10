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
        deleteCookie("Authorization");
        window.location.href = "./../signin.html";
      }
    });
  };
  
const btnLogout = document.getElementById("btnLogout");

btnLogout.addEventListener("click", logout);