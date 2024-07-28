import { getValue } from "https://jscroot.github.io/element/croot.js";

function postChat(target_url, data, responseFunction) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", getCookie("Authorization"));
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
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
    console.log(textBotMessage)
    botMessage.innerHTML = `
        <img src="assets/images/logo kecik.png" alt="Bot" class="profile-pic" />
    `;
    botMessage.appendChild(textBotMessage);
    chatBox.appendChild(botMessage);
    chatBox.scrollTop = chatBox.scrollHeight;
    const text = result.answer || result.message || "No response";
    let index = 0;
    const typingSpeed = 10;

    function typeMessage() {
        if (index < text.length) {
            textBotMessage.textContent += text.charAt(index);
            index++;
            setTimeout(typeMessage, typingSpeed);
            window.scrollTo(0, document.body.scrollHeight);
        } else {
            button.removeAttribute('disabled');
            document.getElementById('disabled-input').setAttribute('id', 'chat-input');
            const urlParams = new URLSearchParams(window.location.search);
            const paramId = urlParams.get('topic') ? "/" + urlParams.get('topic') : "";
            if (paramId !== "") {
                return;
            }
            const chatList = document.createElement("li");
            chatList.className = "nav-chat new-chat";
            chatList.id = result.idtopic;
            let botMessage;
            if (result.question.length > 40) {
                botMessage = result.question.slice(0, 20) + "...";
            } else {
                botMessage = result.question
            }
            chatList.innerHTML = `
            <a href="chat.html?topic=${result.idtopic}">
            <span>${botMessage}</span>
            </a>
            `;
            const sidebarNav = document.getElementById("sidebar-nav");
            sidebarNav.insertBefore(chatList, sidebarNav.childNodes[2]);
            window.history.pushState({}, "", `?topic=${result.idtopic}`);
            const idChat = document.getElementById(result.idtopic);
            idChat.classList.add('active');
            const iconDelete = document.createElement('i');
            iconDelete.className = 'bi bi-trash3-fill';
            iconDelete.id = 'delete-chat';
            iconDelete.style.cursor = 'pointer';
            idChat.appendChild(iconDelete);
            document.getElementById("btnNewChat").classList.remove('active')
            deleteChat();
        }
    }

    textBotMessage.classList.add('bubble');
    typeMessage();
}

const button = document.querySelector('#submit-btn');
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

        const urlParams = new URLSearchParams(window.location.search);
        const paramId = urlParams.get('topic') ? "/" + urlParams.get('topic') : "";

        const target_url = "https://api-tee-am-ai.up.railway.app/chat" + paramId;
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
        botMessage.innerHTML = `
            <img src="assets/images/logo kecik.png" alt="Bot" class="profile-pic" />
        `;
        botMessage.appendChild(textBotMessage);
        chatBox.appendChild(botMessage);
        chatBox.scrollTop = chatBox.scrollHeight;
        window.scrollTo(0, document.body.scrollHeight);
        document.getElementById('chat-input').setAttribute('id', 'disabled-input');
        button.setAttribute('disabled', '');
    }
}

document.getElementById("submit-btn").addEventListener("click", Chat);

document.getElementById("chat-input").addEventListener("keypress", function (event) {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        Chat();
    }
});

const getChatHistory = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", getCookie("Authorization"));
    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("https://api-tee-am-ai.up.railway.app/chat", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            const chatBox = document.getElementById("sidebar-nav");
            result = result.reverse();
            for (let i = 0; i < result.length; i++) {
                const chatList = document.createElement("li");
                chatList.className = "nav-chat new-chat";
                chatList.id = result[i]._id;
                let botMessage;
                if (result[i].topic.length > 40) {
                    botMessage = result[i].topic.slice(0, 20) + "...";
                } else {
                    botMessage = result[i].topic
                }
                chatList.innerHTML = `
                        <a href="chat.html?topic=${result[i]._id}" style="text-decoration: none;">
                            <span>${botMessage}</span>
                        </a>
                `;
                chatBox.appendChild(chatList);
            }
            const urlParams = new URLSearchParams(window.location.search);
            const paramId = urlParams.get('topic')
            if (paramId !== null) {
                return getChat(paramId);
            }
            const idChat = document.getElementById("btnNewChat");
            idChat.classList.add('active');
        })
        .catch(error => console.log('error', error));
}


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