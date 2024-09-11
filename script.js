const chatBox = document.getElementById('chatBox');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const adminLoginBtn = document.getElementById('adminLoginBtn');
const adminChatPanel = document.getElementById('adminChatPanel');
const adminMessageInput = document.getElementById('adminMessageInput');
const adminSendBtn = document.getElementById('adminSendBtn');
const adminChatBox = document.getElementById('adminChatBox');

let messages = [];
let isAdminLoggedIn = false;

sendBtn.addEventListener('click', () => {
    sendMessage('customer', messageInput.value);
});

adminSendBtn.addEventListener('click', () => {
    sendMessage('admin', adminMessageInput.value);
});

function sendMessage(role, message) {
    if (message.trim() === '') return;
    const newMessage = { role, text: message };
    messages.push(newMessage);
    displayMessages();
    messageInput.value = '';
    adminMessageInput.value = '';
}

function displayMessages() {
    chatBox.innerHTML = '';
    adminChatBox.innerHTML = '';

    messages.forEach(msg => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', msg.role);
        messageDiv.textContent = `${msg.role === 'admin' ? 'Admin' : 'Customer'}: ${msg.text}`;

        chatBox.prepend(messageDiv);

        if (isAdminLoggedIn) {
            const adminMessageDiv = messageDiv.cloneNode(true);
            adminChatBox.prepend(adminMessageDiv);
        }
    });
}

adminLoginBtn.addEventListener('click', () => {
    const password = prompt('Enter admin key:');
    if (password === 'itsme') {
        isAdminLoggedIn = true;
        adminChatPanel.classList.remove('hidden');
        displayMessages();
    } else {
        alert('Incorrect admin key!');
    }
});