import { getValue } from "https://jscroot.github.io/element/croot.js";

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
    const chatBox = document.getElementById("chat-box");
    const botMessage = document.createElement("div");
    botMessage.className = "message bot";
    botMessage.innerHTML = `
        <img src="assets/images/logo kecik.png" alt="Bot" class="profile-pic" />
        <div class="bubble">${result.answer || result.message || "No response"}</div>
    `;
    chatBox.appendChild(botMessage);
    chatBox.scrollTop = chatBox.scrollHeight;
}

const Chat = () => {
    const chatBox = document.getElementById("chat-box");
    const userInput = getValue("chat-input");

    if (userInput.trim() !== "") {
        const userMessage = document.createElement("div");
        userMessage.className = "message user";
        userMessage.innerHTML = `
            <img src="assets/images/user-icon1.jpeg" alt="User" class="profile-pic" />
            <div class="bubble">${userInput}</div>
        `;
        chatBox.appendChild(userMessage);

        const target_url = "https://api-tee-am-ai.up.railway.app/chat";
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

document.getElementById('toggle-dark-mode').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    document.querySelector('.header').classList.toggle('dark-mode');
    document.querySelector('.sidebar').classList.toggle('dark-mode');
    document.querySelector('#main').classList.toggle('dark-mode');
    document.querySelector('.chat-content-area').classList.toggle('dark-mode');
    document.querySelector('#chat-box').classList.toggle('dark-mode');
    document.querySelector('#input-area').classList.toggle('dark-mode');
    document.querySelector('#chat-input').classList.toggle('dark-mode');
    document.querySelector('#submit-btn').classList.toggle('dark-mode');

    document.querySelectorAll('.bi').forEach(function (icon) {
        icon.classList.toggle('dark-mode');
    });

    document.querySelectorAll('.bubble').forEach(function (bubble) {
        bubble.classList.toggle('dark-mode');
    });

    // Toggle dark mode for specific icons
    document.querySelector('.toggle-sidebar-btn').classList.toggle('dark-mode');
    document.querySelector('.dropdown-toggle').classList.toggle('dark-mode');

    // Toggle dark mode for new chat link
    document.querySelector('.new-chat').classList.toggle('dark-mode');

    // Toggle dark mode for dropdown menu
    document.querySelector('.dropdown-menu').classList.toggle('dark-mode');
});

