// Mengimpor fungsi deleteCookie dari URL yang diberikan
import { deleteCookie } from "https://jscroot.github.io/cookie/croot.js";

// Fungsi untuk melakukan logout
const logout = () => {
  // Menghapus cookie dengan nama 'Authorization'
  deleteCookie("Authorization");
  // Mengarahkan pengguna ke halaman signin
  window.location.href = "./signin.html";
};

// Menambahkan event listener pada event 'DOMContentLoaded' untuk memastikan DOM sudah sepenuhnya dimuat
document.addEventListener("DOMContentLoaded", () => {
  // Mengambil elemen tombol logout dengan ID 'btnLogout'
  const btnLogout = document.getElementById("btnLogout");
  if (btnLogout) { // Memeriksa apakah elemen tombol logout ada
    // Menambahkan event listener pada tombol logout untuk menangani klik
    btnLogout.addEventListener("click", (event) => {
      event.preventDefault(); // Mencegah aksi default (misalnya, jika tombol berada dalam form, mencegah form submit)
      logout(); // Memanggil fungsi logout
    });
  }
});
