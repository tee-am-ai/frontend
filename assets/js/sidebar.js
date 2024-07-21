// Mengambil elemen-elemen DOM yang diperlukan
const sidebar = document.getElementById("sidebar"); // Elemen sidebar
const sidebarCollapse = document.getElementById("sidebarCollapse"); // Tombol untuk mengcollapse/expand sidebar
const inputArea = document.getElementById("input-area"); // Area input
const backToTop = document.querySelector(".back-to-top"); // Tombol "back to top"
const chatBox = document.getElementById("chat-box"); // Kotak chat

// Menambahkan event listener pada tombol sidebarCollapse untuk menangani klik
sidebarCollapse.addEventListener("click", function () {
  const screenWidth = window.innerWidth; // Mendapatkan lebar layar saat ini
  let active = sidebar.classList.contains("active"); // Memeriksa apakah sidebar sedang dalam keadaan aktif

  // Toggle class 'active' pada sidebar
  if (active) {
    sidebar.classList.remove("active"); // Menghapus class 'active' jika ada
  } else {
    sidebar.classList.add("active"); // Menambahkan class 'active' jika tidak ada
  }

  active = sidebar.classList.contains("active"); // Memperbarui status aktif setelah toggle

  // Menyesuaikan gaya elemen-elemen berdasarkan lebar layar dan status aktif sidebar
  if (screenWidth <= 1199) { // Jika lebar layar lebih kecil atau sama dengan 1199px (layar kecil)
    if (active) {
      // Jika sidebar aktif, ubah margin elemen dan posisi tombol 'back to top'
      inputArea.style.marginLeft = "335px";
      chatBox.style.marginLeft = "335px";
      backToTop.style.right = "49%";
    } else {
      // Jika sidebar tidak aktif, reset margin elemen dan posisi tombol 'back to top'
      inputArea.style.marginLeft = "0";
      chatBox.style.marginLeft = "0";
      backToTop.style.right = "41%";
    }
  } else { // Jika lebar layar lebih besar dari 1199px (layar besar)
    if (active) {
      // Jika sidebar aktif, ubah margin elemen dan posisi tombol 'back to top'
      inputArea.style.marginLeft = "32px";
      chatBox.style.marginLeft = "32px";
      backToTop.style.right = "49%";
    } else {
      // Jika sidebar tidak aktif, ubah margin elemen dan posisi tombol 'back to top'
      inputArea.style.marginLeft = "335px";
      chatBox.style.marginLeft = "0";
      backToTop.style.right = "41%";
    }
  }
});
