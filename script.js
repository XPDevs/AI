// script.js

let currentChatId = localStorage.getItem("currentChatId") || 'chat_1'; // Keeps track of the current chat session
let chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || {}; // Store multiple chat histories

function handleKeyPress(event) {
    if (event.key === "Enter") sendMessage();
}

function sendMessage() {
    let input = document.getElementById("user-input");
    let text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    input.value = "";

    setTimeout(() => {
        let response = getBotResponse(text);  // Fetch response from data.js
        addMessage(response, "bot");

        // Save chat after message is sent
        saveChat(text, response);
    }, 500);
}

function addMessage(text, sender) {
    let chatBox = document.getElementById("chat-box");
    let msg = document.createElement("div");
    msg.classList.add("message", sender);
    msg.textContent = text;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function saveChat(userMessage, botResponse) {
    if (!chatHistory[currentChatId]) chatHistory[currentChatId] = [];
    chatHistory[currentChatId].push({ user: userMessage, bot: botResponse });
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
    updateHistory();
}

function updateHistory() {
    let historyDiv = document.getElementById("history");
    historyDiv.innerHTML = "";
    Object.keys(chatHistory).forEach((chatId) => {
        let historyItem = document.createElement("div");
        historyItem.textContent = `Chat ${chatId.replace('chat_', '')}`;
        historyItem.style.cursor = "pointer";
        historyItem.onclick = () => loadChat(chatId);
        historyDiv.appendChild(historyItem);
    });
}

function loadChat(chatId) {
    currentChatId = chatId;
    localStorage.setItem("currentChatId", currentChatId);

    let chatBox = document.getElementById("chat-box");
    chatBox.innerHTML = "";

    let chat = chatHistory[chatId];
    chat.forEach((msg) => {
        addMessage(msg.user, "user");
        addMessage(msg.bot, "bot");
    });
}

function clearHistory() {
    chatHistory = {};
    localStorage.removeItem("chatHistory");
    updateHistory();
}

function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("show");
}

function newChat() {
    // Clear the current chat messages and reset input
    document.getElementById("chat-box").innerHTML = "";
    document.getElementById("user-input").value = "";

    // Create a new chat session with an incremented chat ID
    const highestChatId = Math.max(...Object.keys(chatHistory).map(chat => parseInt(chat.replace('chat_', ''))), 0);
    currentChatId = 'chat_' + (highestChatId + 1);
    localStorage.setItem("currentChatId", currentChatId);
}

// Initialize the history
updateHistory();
loadChat(currentChatId); // Load the current chat session