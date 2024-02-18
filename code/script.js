const chat = document.getElementById("chat");
const chatForm = document.getElementById("name-form");

// Functions goes here 👇

// A function that will add a chat bubble in the correct place based on who the sender is
const showMessage = (message, sender) => {
  if (sender === "user") {
    chat.innerHTML += `
      <section class="user-msg">
        <div class="bubble user-bubble">
          <p>${message}</p>
        </div>
        <img src="assets/user.png" alt="User" />  
      </section>
    `;
  } else if (sender === "bot") {
    chat.innerHTML += `
      <section class="bot-msg">
        <img src="assets/bot.png" alt="Bot" />
        <div class="bubble bot-bubble">
          <p>${message}</p>
        </div>
      </section>
    `;
  }

  // This little thing makes the chat scroll to the last message when there are too many to
  // be shown in the chat box
  chat.scrollTop = chat.scrollHeight;
};

// A function to start the conversation
const greetUser = () => {
  showMessage("Hello there, what's your name?", "bot");
};

const typeOfSemla = (name) => {
  showMessage(`Hello ${name}, what type of semla would you like?`, "bot");
};

// Function that handles all types in the form
const handleFormSubmission = () => {
  const formElements = chatForm.elements;

  for (let i = 0; i < formElements.length; i++) {
    const input = formElements[i];

    console.log(input);
    if (input.type === "text") {
      // Get value from the input
      const name = input.value;
      showMessage(`My name is ${name}!`, "user");
      setTimeout(() => {
        typeOfSemla(name);
      }, 1000);
      input.value = "";
    }
  }
};

// Eventlisteners goes here 👇
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  handleFormSubmission();
});
setTimeout(greetUser, 1000);
