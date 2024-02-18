const chat = document.getElementById("chat");
const nameForm = document.getElementById("name-form");
const nameInput = document.getElementById("name-input");
const start = document.getElementById("start");

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

const handleNameInput = (event) => {
  event.preventDefault();

  const name = nameInput.value;
  showMessage(name, "user");
  console.log(name);
};

// A function to display form when button gets clicked on
const startIcecreamJourney = () => {
  start.style.display = "none";
  chat.style.display = "flex";
  nameForm.style.display = "flex";
  setTimeout(greetUser, 1000);
};

// Eventlisteners goes here 👇

setTimeout(greetUser, 1000);

// Add eventlistener to start button
start.addEventListener("click", startIcecreamJourney);
