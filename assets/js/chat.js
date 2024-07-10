// import { getValue } from "https://jscroot.github.io/element/croot.js";

// function postChat(target_url, data, responseFunction) {
//     const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data),
//         redirect: 'follow'
//     };

//     console.log("Sending data:", data); // Tambahkan log ini

//     fetch(target_url, requestOptions)
//         .then(response => response.json())
//         .then(result => {
//             console.log("Response from server:", result); // Tambahkan log ini
//             responseFunction(result);
//         })
//         .catch(error => console.log('error', error));
// }

// function responseData(result) {
//     const chatBox = document.getElementById("chat-box");
//     const botMessage = document.createElement("div");
//     botMessage.className = "message bot";
//     botMessage.textContent = result.answer || result.message || "No response"; // Tampilkan pesan kesalahan jika ada
//     chatBox.appendChild(botMessage);
//     chatBox.scrollTop = chatBox.scrollHeight; // Scroll ke bawah
// }

// const Chat = () => {
//     const chatBox = document.getElementById("chat-box");
//     const userInput = getValue("chat-input");

//     if (userInput.trim() !== "") {
//         const userMessage = document.createElement("div");
//         userMessage.className = "message user";
//         userMessage.textContent = userInput;
//         chatBox.appendChild(userMessage);

//         const target_url = "https://asia-southeast2-teeamai-427702.cloudfunctions.net/teeamai/chat";
//         const data = { query: userInput }; // Ubah menjadi { query: userInput }

//         postChat(target_url, data, responseData);

//         document.getElementById("chat-input").value = ""; // Bersihkan field input
//         chatBox.scrollTop = chatBox.scrollHeight; // Scroll ke bawah
//     }
// }

// document.getElementById("submit-btn").addEventListener("click", Chat);
// document.getElementById("chat-input").addEventListener("keypress", function(event) {
//     if (event.key === "Enter") {
//         Chat();
//     }
// });


document.addEventListener("DOMContentLoaded", function () {
    const chatBox = document.getElementById("chat-box");

    function postChat(target_url, data, responseFunction) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            redirect: 'follow'
        };

        console.log("Sending data:", data);

        fetch(target_url, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log("Response from server:", result);
                responseFunction(result);
            })
            .catch(error => console.log('error', error));
    }

    function responseData(result) {
        const botMessage = document.createElement("div");
        botMessage.className = "message bot";
        botMessage.textContent = result.answer || result.message || "No response";
        chatBox.appendChild(botMessage);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    const Chat = () => {
        const userInput = getValue("chat-input");

        if (userInput.trim() !== "") {
            const userMessage = document.createElement("div");
            userMessage.className = "message user";
            userMessage.textContent = userInput;
            chatBox.appendChild(userMessage);

            const target_url = "https://asia-southeast2-teeamai-427702.cloudfunctions.net/teeamai/chat";
            const data = { query: userInput };

            postChat(target_url, data, responseData);

            document.getElementById("chat-input").value = "";
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    }

    document.getElementById("submit-btn").addEventListener("click", Chat);
    document.getElementById("chat-input").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            Chat();
        }
    });
});
