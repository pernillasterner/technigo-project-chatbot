const chat = document.getElementById("chat");
const chatForm = document.getElementById("name-form");
const nameForm = document.getElementById("name-form");

const semlaTypes = [
  { id: "regular", label: "Regular", value: "regular", name: "semla_choiced" },
  {
    id: "gluten",
    label: "Gluten free",
    value: "gluten",
    name: "semla_choiced",
  },
  {
    id: "lactose",
    label: "Lactose free",
    value: "lactose",
    name: "semla_choiced",
  },
];

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

// INTERACTIONS
const greetUser = () => {
  showMessage("Hello there, what's your name?", "bot");
};

const typeOfSemla = (name) => {
  showMessage(`Hello ${name}, what type of semla would you like?`, "bot");

  // Remove the children in the form = diplay: none
  while (chatForm.firstChild) {
    chatForm.removeChild(chatForm.firstChild);
  }

  createRadioButtons(semlaTypes);
};

// CREATE INPUT TYPES
const createRadioButtons = (obj) => {
  // Create radio buttons
  obj.forEach((el) => {
    nameForm.innerHTML += `
     <input type="radio" name="${el.name}" id="${el.id}" value="${el.value}"/><label>${el.label}</label>
    `;
  });
};

// SUBMISSION
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
    } else if (input.type === "radio") {
      console.log("radio button");
    } else {
      console.log("perhaps select of button");
    }
  }
};

// Eventlisteners goes here 👇
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  handleFormSubmission();
});
setTimeout(greetUser, 1000);
