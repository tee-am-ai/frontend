// Mengimpor fungsi getValue dari URL yang diberikan
import { getValue } from "https://jscroot.github.io/element/croot.js";

// Fungsi untuk melakukan POST request ke target_url dengan data yang diberikan dan memproses responsenya
function postRegister(target_url, data, responseFunction) {
    // Menentukan opsi untuk request
    const requestOptions = {
        method: 'POST', // Menggunakan metode POST
        body: JSON.stringify(data), // Mengubah data menjadi format JSON
        redirect: 'follow' // Mengikuti pengalihan (redirect) jika ada
    };

    // Mengirim request ke target_url
    fetch(target_url, requestOptions)
        .then(response => response.text()) // Mengubah respons menjadi teks
        .then(result => responseFunction(JSON.parse(result))) // Mengubah hasil respons menjadi objek JSON dan memanggil fungsi responseFunction
        .catch(error => console.log('error', error)); // Menangani error jika ada
}

// Fungsi untuk melakukan pendaftaran
const Register = () => {
    const target_url = "https://api-tee-am-ai.up.railway.app/signup"; // URL target untuk pendaftaran

    // Mengambil nilai input dari form menggunakan getValue
    const data = {
        "namalengkap": getValue("namalengkap"),
        "email": getValue("email"),
        "password": getValue("password"),
        "confirmpass": getValue("confirmpass"),
    };

    // Mengirim data pendaftaran dan memproses responsenya dengan responseData
    postRegister(target_url, data, responseData);
}

// Fungsi untuk menangani hasil respons pendaftaran
function responseData(result) {
    if (result.error === undefined || !result.error) {
        // Jika tidak ada error, tampilkan notifikasi sukses
        Swal.fire({
            icon: "success",
            title: "Register Successful",
            text: result.message,
        }).then(() => {
            window.location.href = "./signin.html"; // Arahkan pengguna ke halaman login
        });
    } else {
        // Jika ada error, tampilkan notifikasi gagal
        Swal.fire({
            icon: "error",
            title: "Register Failed",
            text: result.message,
        });
    }
}

// Menambahkan event listener pada tombol dengan ID 'button1' untuk melakukan pendaftaran ketika diklik
document.getElementById("button1").addEventListener("click", Register);

// Menambahkan event listener pada event 'keydown' untuk melakukan pendaftaran ketika tombol Enter ditekan
document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        Register();
    }
});

// Fungsi untuk menampilkan atau menyembunyikan password
function togglePassword(inputId, iconId) {
    var passwordInput = document.getElementById(inputId); // Mengambil elemen input password
    var eyeIcon = document.getElementById(iconId); // Mengambil elemen ikon mata
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
document.getElementById("toggle-password").addEventListener("click", function () {
    togglePassword("password", "eye-icon-password");
});

// Menambahkan event listener pada ikon dengan ID 'toggle-confirmpass' untuk menampilkan/menyembunyikan konfirmasi password
document.getElementById("toggle-confirmpass").addEventListener("click", function () {
    togglePassword("confirmpass", "eye-icon-confirmpass");
});
