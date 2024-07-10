import { getValue } from "https://jscroot.github.io/element/croot.js";

function postLogin(target_url, data, responseFunction) {
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow'
    };

    fetch(target_url, requestOptions)
        .then(response => response.text())
        .then(result => responseFunction(JSON.parse(result)))
        .catch(error => console.log('error', error));
}

const Login = () => {
    const target_url = "https://asia-southeast2-teeamai-427702.cloudfunctions.net/teeamai/login";

    const data = {
        "username": getValue("username"),
        "password": getValue("password")
    };
    
    postLogin(target_url, data, responseData);
}

function responseData(result) {
    if (!result.error) {
        Swal.fire({
            icon: "success",
            title: "Login Successful",
            text: result.message,
        }).then(() => {
            window.location.href = "https://tee-am-ai.github.io/frontend/dashboard.html";
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
