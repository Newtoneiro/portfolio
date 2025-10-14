document.addEventListener('DOMContentLoaded', () => {
    initGreetings();
});

const initGreetings = () => {
  const possibleGreetings = [
    "hello",
    "hi",
    "bonjour",
    "cześć",
    "hola",
    "hallo",
    "ciao",
    "namaste",
    "salut",
    "hey"
  ];

  const greetingsText = document.getElementById("greeting");
  let lastIndex = -1;

  const updateGreeting = () => {
    let randomIndex;

    do {
      randomIndex = Math.floor(Math.random() * possibleGreetings.length);
    } while (randomIndex === lastIndex);

    lastIndex = randomIndex;

    const newGreeting = `${possibleGreetings[randomIndex]},`;
    greetingsText.textContent = newGreeting;
  };

  updateGreeting();
  setInterval(updateGreeting, 3000);
};
