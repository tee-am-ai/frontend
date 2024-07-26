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
let botMessage;
let textBotMessage;
function responseData(result) {
    const chatBox = document.getElementById("chat-box");
    botMessage.innerHTML = `
        <img src="assets/images/logo kecik.png" alt="Bot" class="profile-pic" />
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

        botMessage = document.createElement("div");
        botMessage.className = "message bot";
        textBotMessage = document.createElement("div");
        textBotMessage.className = "bubble";
        textBotMessage.id = "typing-message";
        textBotMessage.innerHTML = `
            <div class="chat-loading">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
        `;
        chatBox.appendChild(botMessage);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}

document.getElementById("submit-btn").addEventListener("click", Chat);

document.getElementById("chat-input").addEventListener("keypress", function (event) {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        Chat();
    }
});

// document.getElementById("chat-input").addEventListener("keydown", function (event) {
//     if (event.key === "Enter" && event.shiftKey) {
//         const cursorPosition = this.selectionStart;
//         this.value = this.value.substring(0, cursorPosition) + "\n" + this.value.substring(cursorPosition);
//         this.selectionStart = cursorPosition + 1;
//         this.selectionEnd = cursorPosition + 1;
//         event.preventDefault();
//     }
// });

document.getElementById('toggle-dark-mode').addEventListener('click', function () {
    const body = document.body;
    body.classList.toggle('dark-mode');

    const header = document.querySelector('.header');
    header.classList.toggle('dark-mode');

    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('dark-mode');

    const main = document.querySelector('#main');
    main.classList.toggle('dark-mode');

    const chatContentArea = document.querySelector('.chat-content-area');
    chatContentArea.classList.toggle('dark-mode');

    const chatBox = document.querySelector('#chat-box');
    chatBox.classList.toggle('dark-mode');

    const inputArea = document.querySelector('#input-area');
    inputArea.classList.toggle('dark-mode');

    const chatInput = document.querySelector('#chat-input');
    chatInput.classList.toggle('dark-mode');

    const submitBtn = document.querySelector('#submit-btn');
    submitBtn.classList.toggle('dark-mode');

    document.querySelectorAll('.bi').forEach(function (icon) {
        icon.classList.toggle('dark-mode');
    });

    document.querySelectorAll('.bubble').forEach(function (bubble) {
        bubble.classList.toggle('dark-mode');
    });

    const toggleSidebarBtn = document.querySelector('.toggle-sidebar-btn');
    toggleSidebarBtn.classList.toggle('dark-mode');

    const dropdownToggle = document.querySelector('.dropdown-toggle');
    dropdownToggle.classList.toggle('dark-mode');

    const newChat = document.querySelector('.new-chat');
    newChat.classList.toggle('dark-mode');

    const dropdownMenu = document.querySelector('.dropdown-menu');
    dropdownMenu.classList.toggle('dark-mode');

    const modeText = document.getElementById('mode-text');
    const modeIcon = document.getElementById('mode-icon');

    if (body.classList.contains('dark-mode')) {
        modeText.textContent = 'Light Mode';
        modeIcon.classList.remove('bi-moon');
        modeIcon.classList.add('bi-sun');
    } else {
        modeText.textContent = 'Dark Mode';
        modeIcon.classList.remove('bi-sun');
        modeIcon.classList.add('bi-moon');
    }
});