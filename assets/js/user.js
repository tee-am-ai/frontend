// Function to get a cookie by name
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
    // Display the fetched username and email
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

// Function to fetch and display user data
// async function fetchAndDisplayUserData() {
//     const myHeaders = new Headers();
//     myHeaders.append("Authorization", getCookie("Authorization"));

//     const apiUrl = "https://api-tee-am-ai.up.railway.app/user";

//     try {
//         const response = await fetch(apiUrl, {
//             headers: myHeaders,
//         });

//         if (!response.ok) {
//             throw new Error(HTTP error! status: ${response.status});
//         }

//         const data = await response.json();
//         console.log("User data:", data);

//         // Display the fetched username and email
//         document.getElementById("username-display").textContent = Username: ${data.username};
//         document.getElementById("email-display").textContent = Email: ${data.email};
//     } catch (error) {
//         console.error("Error fetching user data:", error);
//     }
// }