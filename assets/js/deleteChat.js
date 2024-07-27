import { deleteChat } from "./chat.js";
console.log("tes");
console.log(document.getElementById("delete-chat"));
document.getElementById("delete-chat").addEventListener("click", function () {
    console.log("delete chat");
    deleteChat();
});