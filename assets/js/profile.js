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

// function getUser(target_url, responseFunction) {
//     const myHeaders = new Headers();
//     myHeaders.append("Authorization", getCookie("Authorization"));

//     const requestOptions = {
//         method: 'GET',
//         headers: myHeaders,
//         redirect: 'follow'
//     };

//     fetch(target_url, requestOptions)
//         .then(response => response.text())
//         .then(result => responseFunction(JSON.parse(result)))
//         .catch(error => console.log('error', error));
// }

// const apiUrl = "https://api-tee-am-ai.up.railway.app/user";

// function displayUserData(data) {
//     document.getElementById("username-display").textContent = data.data.namalengkap;
//     document.getElementById("email-display").textContent = data.data.email;
// }

// function responseUserData(result) {
//     if (result.error === undefined || !result.error) {
//         displayUserData(result);
//     } else {
//         console.error("Error fetching user data:", result.message);
//     }
// }

// getUser(apiUrl, responseUserData);