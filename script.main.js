document.addEventListener('DOMContentLoaded', () => {
            const generateEmailButton = document.getElementById('generateEmail');
            const showMessagesButton = document.getElementById('showMessages');
            const emailAddressDiv = document.getElementById('emailAddress');
            const messageListDiv = document.getElementById('messageList');
            const dialog = document.getElementById('dialog');
            const dialogContentDiv = document.getElementById('dialogContent');
            const closeDialogButton = document.getElementById('closeDialog');

            let currentEmail = '';
            const apiBaseUrl = 'https://www.1secmail.com/api/v1/';

            function generateRandomNumber(length) {
                return Math.floor(Math.random() * Math.pow(10, length));
            }
            
    function getRandomName() {
            const names = ['lintun', 'thetpaing','supiya'];
            return names[Math.floor(Math.random() * names.length)];
        }

            async function generateRandomEmail() {

                 const name = getRandomName().toLowerCase().replace(/\s+/g, '');
                
                const randomNumber = generateRandomNumber(5); // Generate a 6-digit random number
                const randomDomain = Math.random().toString(36).substring(2, 6);

                 const domains = ['vjuum.com','txcct.com','rteet.com'];
            const dom = domains[Math.floor(Math.random() * domains.length)];
                
                const email = `${name}${randomNumber}@${dom}`;
                currentEmail = email;

                emailAddressDiv.textContent = `Generated Email: ${email}`;
                messageListDiv.innerHTML = '';

                // Auto-retrieve messages after generating email
                await fetchMessages();
            }

            async function fetchMessages() {
                if (!currentEmail) {
                    messageListDiv.innerHTML = '<p>Please generate an email first.</p>';
                    return;
                }

                try {
                    const [login, domain] = currentEmail.split('@');
                    const response = await fetch(`${apiBaseUrl}?action=getMessages&login=${login}&domain=${domain}`);
                    const messages = await response.json();

                    if (messages.length > 0) {
                        displayMessageList(messages);
                    } else {
                        messageListDiv.innerHTML = '<p>No messages found.</p>';
                    }
                } catch (error) {
                    messageListDiv.innerHTML = '<p>Error fetching messages.</p>';
                    console.error('Error fetching messages:', error);
                }
            }

            function displayMessageList(messages) {
                messageListDiv.innerHTML = '<h2>Message List</h2>';
                messages.forEach(message => {
                    const messageItem = document.createElement('div');
                    messageItem.className = 'message-item';
                    messageItem.textContent = `From: ${message.from} - Subject: ${message.subject}`;
                    messageItem.dataset.messageId = message.id;
                    messageItem.addEventListener('click', () => showMessageDialog(message.id));
                    messageListDiv.appendChild(messageItem);
                });
            }

            async function showMessageDialog(messageId) {
                if (!currentEmail) {
                    dialogContentDiv.innerHTML = '<p>Please generate an email first.</p>';
                    return;
                }

                try {
                    const [login, domain] = currentEmail.split('@');
                    const response = await fetch(`${apiBaseUrl}?action=readMessage&login=${login}&domain=${domain}&id=${messageId}`);
                    const message = await response.json();
                    dialogContentDiv.innerHTML = `
                        <h2>Message Details</h2>
                        <p><strong>From:</strong> ${message.from}</p>
                        <p class="subject"><strong>Subject:</strong> ${message.subject}</p>
                        <p><strong>Message:</strong></p>
                        <p>${message.textBody}</p>
                    `;
                    dialog.classList.add('show');
                } catch (error) {
                    dialogContentDiv.innerHTML = '<p>Error fetching message.</p>';
                    console.error('Error fetching message:', error);
                }
            }

            function closeDialog() {
                dialog.classList.remove('show');
            }

            generateEmailButton.addEventListener('click', generateRandomEmail);
            showMessagesButton.addEventListener('click', fetchMessages);
            closeDialogButton.addEventListener('click', closeDialog);
        });
