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

function getUser(target_url, responseFunction) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", getCookie("Authorization"));

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(target_url, requestOptions)
        .then(response => response.text())
        .then(result => responseFunction(JSON.parse(result)))
        .catch(error => console.log('error', error));
}

const apiUrl = "https://api-tee-am-ai.up.railway.app/user";

function displayUserData(data) {
    document.getElementById("username-display").textContent = data.data.namalengkap;
    document.getElementById("email-display").textContent = data.data.email;
}

function responseUserData(result) {
    if (result.error === undefined || !result.error) {
        displayUserData(result);
    } else {
        console.error("Error fetching user data:", result.message);
    }
}

getUser(apiUrl, responseUserData);


// Dark Mode Toggle Script

  document.getElementById("toggle-dark-mode").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    // Update the dropdown text and icon based on the mode
    const modeText = document.getElementById("mode-text");
    const modeIcon = document.getElementById("mode-icon");
    if (document.body.classList.contains("dark-mode")) {
      modeText.textContent = "Light Mode";
      modeIcon.classList.remove("bi-moon");
      modeIcon.classList.add("bi-sun");
    } else {
      modeText.textContent = "Dark Mode";
      modeIcon.classList.remove("bi-sun");
      modeIcon.classList.add("bi-moon");
    }

    // Save mode preference to localStorage
    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  });

  // Apply the saved theme on page load
  document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark-mode");
      document.getElementById("mode-text").textContent = "Light Mode";
      document.getElementById("mode-icon").classList.remove("bi-moon");
      document.getElementById("mode-icon").classList.add("bi-sun");
    } else {
      document.getElementById("mode-text").textContent = "Dark Mode";
      document.getElementById("mode-icon").classList.remove("bi-sun");
      document.getElementById("mode-icon").classList.add("bi-moon");
    }
  });
