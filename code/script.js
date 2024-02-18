// import pastriesData from "./data.json";

// Constants
const chat = document.getElementById("chat");
const chatForm = document.getElementById("name-form");
const nameForm = document.getElementById("name-form");
const currentYear = new Date().getFullYear();
document.getElementById("currentYear").textContent = currentYear;

// Access the array of pastries
const typeOfPastery = [
  {
    id: "regular",
    label: "Regular",
    value: "regular",
    name: "type_of_pastery",
  },
  {
    id: "gluten",
    label: "Gluten free",
    value: "gluten",
    name: "type_of_pastery",
  },
  {
    id: "lactose",
    label: "Lactose free",
    value: "lactose",
    name: "type_of_pastery",
  },
];

const subtypeOfPastery = [
  {
    id: "blueberry",
    label: "Blueberry",
    class: "choice-btn",
  },
  {
    id: "vanilla",
    label: "Vanilla",
    class: "choice-btn",
  },
  {
    id: "chocolate",
    label: "Chocolate",
    class: "choice-btn",
  },
];

// Functions 👇
const clearNameForm = () => {
  while (nameForm.firstChild) {
    nameForm.removeChild(nameForm.firstChild);
  }
};

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

// A function that greets the user
const greetUser = () => {
  showMessage("Hello there, what's your name?", "bot");
};

const askForType = (name) => {
  showMessage(`Hello ${name}, what type of semla would you like?`, "bot");

  // Remove the children in the form = diplay: none
  clearNameForm();

  createRadioButtons(typeOfPastery);
};

const createRadioButtons = (data) => {
  clearNameForm();
  // Create radio buttons
  data.forEach((item) => {
    nameForm.innerHTML += `
     <input type="radio" name="${item.name}" id="${item.id}" value="${item.value}"/><label>${item.label}</label>
    `;
  });

  handletypeOfPastery();
};

const createButtons = (data) => {
  clearNameForm();
  // Buttons from choice
  data.forEach((item) => {
    nameForm.innerHTML += `
    <button id="${item.id}" type="submit" class="${item.class}">${item.label}</button>
    `;
  });

  const buttons = document.querySelectorAll(".choice-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => handletypeOfFlavor(e));
  });
};

const handletypeOfPastery = () => {
  // We store all radio btns in a variable
  const radioButtons = document.querySelectorAll(
    'input[name="type_of_pastery"]'
  );

  // Add event listener to all radio buttons
  radioButtons.forEach((button) => {
    button.addEventListener("change", () => {
      showMessage(`I choose ${button.value} free`, "user");
      setTimeout(() => {
        showMessage(
          `Nice choice! You chose a ${button.value} ${
            button.value !== "regular" ? "free" : ""
          } semla.\n Please choose what flavour you want`,
          "bot"
        );
      }, 1000);
      setTimeout(() => createButtons(subtypeOfPastery), 1000);
    });
  });
};

const handletypeOfFlavor = (e) => {
  const flavor = e.target.textContent;
  showMessage(`I choose ${flavor}`, "user");

  setTimeout(() => {
    showMessage(
      `Yummy, ${flavor} is a great choice!\nWould you like a coffee with that?`,
      "bot"
    );
  }, 1000);
  setTimeout(coffeChoice, 1000);
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
        askForType(name);
      }, 1000);
      input.value = "";
    } else if (input.type === "radio") {
      console.log("radio button");
    } else {
      console.log("perhaps select of button");
    }
  }
};

// Event Listeners 👇
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  handleFormSubmission();
});

// Inital
setTimeout(greetUser, 1000);
