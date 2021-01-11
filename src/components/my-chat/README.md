<my-chat>

## Methods

### setUserName
Sets the username depending of what the client has written.

### emojiPicker
Creates an emoji-picker in the chat.

### darkModeToggle
Allows the klient to toggle between dark and lightmode.

### chatStart
Checks if username exists. Gets the username from localstorage and calls the method wsconnect.

### saveToLocalStorage
Saves the username to localstorage.

### wsConnect
Connects to server via websocket. Gets messages and put them in chatbubbles list.

### chatMessage
The chat message. Prepares the chat message into a json before sending.

Styling with CSS


Example
<my-chat></my-chat>