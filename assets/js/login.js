import { getValue } from "https://jscroot.github.io/element/croot.js";
import { setCookieWithExpireHour } from "https://jscroot.github.io/cookie/croot.js";

function postLogin(target_url, data, responseFunction) {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(data),
    redirect: "follow",
  };

  fetch(target_url, requestOptions)
    .then((response) => response.text())
    .then((result) => responseFunction(JSON.parse(result)))
    .catch((error) => console.log("error", error));
}

const Login = () => {
  const target_url =
    "https://api-tee-am-ai.up.railway.app/login";

  const data = {
    email: getValue("email"),
    password: getValue("password"),
  };

  postLogin(target_url, data, responseData);
};

function responseData(result) {
  if (result.error === undefined || !result.error) {
    setCookieWithExpireHour("Authorization", result.token, 2);

    Swal.fire({
      icon: "success",
      title: "Login Successful",
      text: result.message,
    }).then(() => {
      window.location.href = "./chat.html";
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: result.message,
    });
  }
}

document.getElementById("button").addEventListener("click", Login);

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    Login();
  }
});

function togglePassword() {
  var passwordInput = document.getElementById("password");
  var eyeIcon = document.getElementById("eye-icon");
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    eyeIcon.classList.remove("fa-eye");
    eyeIcon.classList.add("fa-eye-slash");
  } else {
    passwordInput.type = "password";
    eyeIcon.classList.remove("fa-eye-slash");
    eyeIcon.classList.add("fa-eye");
  }
}

document.getElementById("toggle-password").addEventListener("click", togglePassword);