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

// Get the login token from cookies
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
    console.log("User is logged in, proceeding to fetch user data.");
    fetchAndDisplayUserData(loginToken);
}

// Function to fetch and display user data
async function fetchAndDisplayUserData(token) {
    const apiUrl = "https://api-tee-am-ai.up.railway.app/user";

    try {
        const response = await fetch(apiUrl, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("User data:", data);

        // Display the fetched username and email
        document.getElementById("username-display").textContent = `Username: ${data.username}`;
        document.getElementById("email-display").textContent = `Email: ${data.email}`;
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
}
