// import Jscroot 
import { getValue } from "https://jscroot.github.io/element/croot.js";

// Function to send POST request to the server
function postRegister(target_url, data, responseFunction) {

    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(data),
        redirect: 'follow'
    };

    fetch(target_url, requestOptions)
        .then(response => response.text())
        .then(result => responseFunction(JSON.parse(result)))
        .catch(error => console.log('error', error));
}

// Function to handle the register button click event
const Register = () => {
    const target_url = "https://api-tee-am-ai.up.railway.app/signup";

    const data = {
        "namalengkap": getValue("namalengkap"),
        "email": getValue("email"),
        "password": getValue("password"),
        "confirmpass": getValue("confirmpass"),
    };

    postRegister(target_url, data, responseData);
}

// Function to handle the response data from the server
function responseData(result) {
    if (result.error === undefined || !result.error) {
        Swal.fire({
            icon: "success",
            title: "Register Successful",
            text: result.message,
        }).then(() => {
            window.location.href = "./signin.html";
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "Register Failed",
            text: result.message,
        });
    }
}

// Event listener for the register button
document.getElementById("button1").addEventListener("click", Register);

// Event listener for the enter key
document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        Register();
    }
});

function togglePassword(inputId, iconId) {
    var passwordInput = document.getElementById(inputId);
    var eyeIcon = document.getElementById(iconId);
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

document.getElementById("toggle-password").addEventListener("click", function () {
    togglePassword("password", "eye-icon-password");
});

document.getElementById("toggle-confirmpass").addEventListener("click", function () {
    togglePassword("confirmpass", "eye-icon-confirmpass");
});