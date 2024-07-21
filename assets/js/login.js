// Mengimpor fungsi getValue dari URL yang diberikan
import { getValue } from "https://jscroot.github.io/element/croot.js";

// Fungsi untuk melakukan POST request ke target_url dengan data yang diberikan dan memproses responsenya
function postLogin(target_url, data, responseFunction) {
  // Menentukan opsi untuk request
  const requestOptions = {
    method: "POST", // Menggunakan metode POST
    body: JSON.stringify(data), // Mengubah data menjadi format JSON
    redirect: "follow", // Mengikuti pengalihan (redirect) jika ada
  };

  // Mengirim request ke target_url
  fetch(target_url, requestOptions)
    .then((response) => response.text()) // Mengubah respons menjadi teks
    .then((result) => responseFunction(JSON.parse(result))) // Mengubah hasil respons menjadi objek JSON dan memanggil fungsi responseFunction
    .catch((error) => console.log("error", error)); // Menangani error jika ada
}

// Fungsi untuk melakukan login
const Login = () => {
  const target_url = "https://api-tee-am-ai.up.railway.app/login"; // URL target untuk login

  // Mengambil nilai input dari form menggunakan getValue
  const data = {
    email: getValue("email"),
    password: getValue("password"),
  };

  // Mengirim data login dan memproses responsenya dengan responseData
  postLogin(target_url, data, responseData);
};

// Fungsi untuk menangani hasil respons login
function responseData(result) {
  if (result.error === undefined || !result.error) {
    // Jika tidak ada error, simpan token di cookie dan tampilkan notifikasi sukses
    document.cookie = `Authorization=${encodeURIComponent(
      result.token
    )}; path=/;`; // Menyimpan token dalam cookie dengan nama 'Authorization'

    Swal.fire({
      icon: "success",
      title: "Login Successful",
      text: result.message,
    }).then(() => {
      window.location.href = "./chat.html"; // Arahkan pengguna ke halaman chat
    });
  } else {
    // Jika ada error, tampilkan notifikasi gagal
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: result.message,
    });
  }
}

// Menambahkan event listener pada tombol dengan ID 'button' untuk melakukan login ketika diklik
document.getElementById("button").addEventListener("click", Login);

// Fungsi untuk menampilkan atau menyembunyikan password
function togglePassword() {
    var passwordInput = document.getElementById("password"); // Mengambil elemen input password
    var eyeIcon = document.getElementById("eye-icon"); // Mengambil elemen ikon mata
    if (passwordInput.type === "password") {
        // Jika input adalah password, ubah menjadi text dan ubah ikon mata
        passwordInput.type = "text";
        eyeIcon.classList.remove("fa-eye");
        eyeIcon.classList.add("fa-eye-slash");
    } else {
        // Jika input adalah text, ubah menjadi password dan ubah ikon mata
        passwordInput.type = "password";
        eyeIcon.classList.remove("fa-eye-slash");
        eyeIcon.classList.add("fa-eye");
    }
}

// Menambahkan event listener pada ikon dengan ID 'toggle-password' untuk menampilkan/menyembunyikan password
document.getElementById("toggle-password").addEventListener("click", togglePassword);
