function getCookie(name) {
  let cookieArr = document.cookie.split(";");

  for (let i = 0; i < cookieArr.length; i++) {
    let cookiePair = cookieArr[i].split("=");
    if (name === cookiePair[0].trim()) {
      return decodeURIComponent(cookiePair[1]);
    }
  }
  return null;
}
const loginToken = getCookie("Authorization");
// Check if the user is logged in
if (loginToken === null) {
  Swal.fire({
    icon: "warning",
    title: "Akses Ditolak",
    text: "Anda harus login terlebih dahulu agar bisa masuk ke halaman chat",
    confirmButtonText: "OK",
  }).then(() => {
    window.location.href = "./signin.html";
  });
} else {
  // User is logged in, proceed to chat page or other logic
  console.log("User is logged in, proceeding to chat page.");
  // Add your logic here if needed when user is logged in
}
