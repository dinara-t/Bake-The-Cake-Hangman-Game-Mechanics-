const words = [
  "apple",
  "banana",
  "orange",
  "grape",
  "kiwi",
  "pear",
  "peach",
  "plum",
  "melon",
  "lemon",
  "pineapple",
  "mango",
  "papaya",
  "coconut",
  "strawberry",
  "blueberry",
  "raspberry",
  "blackberry",
  "cherry",
  "apricot",
  "tomato",
  "carrot",
  "potato",
  "onion",
  "garlic",
  "pepper",
  "lettuce",
  "broccoli",
  "spinach",
  "zucchini",
  "cucumber",
  "celery",
  "cauliflower",
  "asparagus",
  "mushroom",
  "pumpkin",
  "radish",
  "beetroot",
  "turnip",
  "parsnip",
  "elephant",
  "giraffe",
  "tiger",
  "lion",
  "cheetah",
  "leopard",
  "zebra",
  "rhino",
  "hippo",
  "buffalo",
  "kangaroo",
  "koala",
  "panda",
  "sloth",
  "chimpanzee",
  "gorilla",
  "orangutan",
  "lemur",
  "meerkat",
  "otter",
  "shark",
  "whale",
  "dolphin",
  "seal",
  "octopus",
  "jellyfish",
  "lobster",
  "crab",
  "shrimp",
  "starfish",
  "eagle",
  "sparrow",
  "parrot",
  "penguin",
  "ostrich",
  "flamingo",
  "peacock",
  "hummingbird",
  "owl",
  "falcon",
  "house",
  "apartment",
  "mansion",
  "cottage",
  "bungalow",
  "castle",
  "villa",
  "shack",
  "chalet",
  "palace",
  "bed",
  "chair",
  "table",
  "desk",
  "sofa",
  "couch",
  "cabinet",
  "wardrobe",
  "bookshelf",
  "dresser",
  "car",
  "bicycle",
  "motorcycle",
  "scooter",
  "truck",
  "bus",
  "train",
  "airplane",
  "helicopter",
  "boat",
  "submarine",
  "rocket",
  "spaceship",
  "hovercraft",
  "tram",
  "trolley",
  "taxi",
  "ferry",
  "yacht",
  "canoe",
  "violin",
  "guitar",
  "piano",
  "trumpet",
  "flute",
  "drums",
  "clarinet",
  "saxophone",
  "cello",
  "harp",
  "concert",
  "symphony",
  "melody",
  "harmony",
  "rhythm",
  "tempo",
  "note",
  "scale",
  "chord",
  "tune",
  "dog",
  "cat",
  "rabbit",
  "hamster",
  "goldfish",
  "parakeet",
  "ferret",
  "guinea",
  "chinchilla",
  "gerbil",
  "winter",
  "spring",
  "summer",
  "autumn",
  "snow",
  "rain",
  "hail",
  "sleet",
  "fog",
  "storm",
  "mountain",
  "river",
  "lake",
  "ocean",
  "forest",
  "desert",
  "valley",
  "canyon",
  "island",
  "waterfall",
  "kitchen",
  "bathroom",
  "bedroom",
  "livingroom",
  "garage",
  "basement",
  "attic",
  "hallway",
  "balcony",
  "patio",
  "science",
  "history",
  "math",
  "geography",
  "chemistry",
  "biology",
  "physics",
  "astronomy",
  "literature",
  "philosophy",
  "football",
  "basketball",
  "tennis",
  "golf",
  "soccer",
  "baseball",
  "hockey",
  "cricket",
  "rugby",
  "volleyball",
];

const maxWrongGuesses = 10;
const baseTemperature = 160;
const temperatureStep = 10;

let currentWord = "";
let displayedWord = [];
let guessedLetters = new Set();
let wrongGuesses = 0;
let usedWords = [];

const wordDisplayEl = document.getElementById("word-display");
const alphabetEl = document.getElementById("alphabet");
const messageEl = document.getElementById("message");
const wrongCountEl = document.getElementById("wrong-count");
const cakeImageEl = document.getElementById("cake-image");
const playAgainBtn = document.getElementById("play-again");
const usedWordsEl = document.getElementById("used-words");
const temperatureEl = document.getElementById("temperature");
const thermometerFillEl = document.getElementById("thermometer-fill");

function getRandomWord() {
  const available = words.filter((word) => !usedWords.includes(word));
  if (available.length === 0) {
    usedWords = [];
    updateUsedWordsDisplay();
    return words[Math.floor(Math.random() * words.length)];
  }
  return available[Math.floor(Math.random() * available.length)];
}

function startNewGame() {
  currentWord = getRandomWord();
  guessedLetters = new Set();
  wrongGuesses = 0;
  displayedWord = currentWord
    .split("")
    .map((char) => (char === " " ? " " : "_"));

  updateWordDisplay();
  updateWrongCount();
  updateCakeImage();
  updateTemperature();
  updateUsedWordsDisplay();
  resetAlphabetButtons();
  clearMessage();
  // console.log(currentWord);
}

function updateWordDisplay() {
  wordDisplayEl.textContent = displayedWord.join(" ");
}

function updateWrongCount() {
  wrongCountEl.textContent = `Wrong guesses: ${wrongGuesses} / ${maxWrongGuesses}`;
}

function updateCakeImage() {
  const stage = Math.min(wrongGuesses, maxWrongGuesses);
  cakeImageEl.classList.remove("is-changing");
  void cakeImageEl.offsetWidth;
  cakeImageEl.src = `./assets/h-${stage}.png`;
  cakeImageEl.classList.add("is-changing");
}

function updateTemperature() {
  const temp = baseTemperature + wrongGuesses * temperatureStep;
  temperatureEl.textContent = `Oven temperature: ${temp}°C`;
  const percent = (wrongGuesses / maxWrongGuesses) * 100;
  thermometerFillEl.style.width = `${percent}%`;
}

function updateUsedWordsDisplay() {
  if (usedWords.length === 0) {
    usedWordsEl.textContent = "";
    return;
  }
  usedWordsEl.textContent = `Words used: ${usedWords.join(", ")}`;
}

function clearMessage() {
  messageEl.textContent = "";
  messageEl.className = "game__message";
}

function setMessage(text, type) {
  messageEl.textContent = text;
  messageEl.className = `game__message ${type ? type : ""}`;
}

function createAlphabetButtons() {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  letters.split("").forEach((letter) => {
    const btn = document.createElement("button");
    btn.textContent = letter.toUpperCase();
    btn.dataset.letter = letter;
    btn.addEventListener("click", () => handleGuess(letter));
    alphabetEl.appendChild(btn);
  });
}

function resetAlphabetButtons() {
  const buttons = alphabetEl.querySelectorAll("button");
  buttons.forEach((btn) => {
    btn.disabled = false;
    btn.classList.remove("correct", "wrong");
  });
}

function handleGuess(letter) {
  if (!currentWord || guessedLetters.has(letter)) {
    return;
  }

  guessedLetters.add(letter);

  const buttons = alphabetEl.querySelectorAll("button");
  const button = Array.from(buttons).find((b) => b.dataset.letter === letter);
  if (button) {
    button.disabled = true;
  }

  if (currentWord.includes(letter)) {
    for (let i = 0; i < currentWord.length; i++) {
      if (currentWord[i] === letter) {
        displayedWord[i] = letter;
      }
    }
    if (button) {
      button.classList.add("correct");
    }
    updateWordDisplay();
    checkWinCondition();
  } else {
    wrongGuesses++;
    if (button) {
      button.classList.add("wrong");
    }
    updateWrongCount();
    updateCakeImage();
    updateTemperature();
    checkLoseCondition();
  }
}

function addCurrentWordToUsed() {
  if (currentWord && !usedWords.includes(currentWord)) {
    usedWords.push(currentWord);
    updateUsedWordsDisplay();
  }
}

function getWinMessageForStage(stage) {
  if (stage <= 2) {
    return "Perfect bake! The cake is moist and fluffy.";
  }
  if (stage <= 4) {
    return "Delicious! Just a light, golden bake.";
  }
  if (stage <= 7) {
    return "Nice job! The cake is a little toasty but tasty.";
  }
  if (stage <= 9) {
    return "Phew! That was close. The cake is overdone but still edible.";
  }
}

function checkWinCondition() {
  if (!displayedWord.includes("_")) {
    const stage = Math.min(wrongGuesses, maxWrongGuesses);
    addCurrentWordToUsed();
    const msg = getWinMessageForStage(stage);
    setMessage(msg, "win");
    disableAllInput();
  }
}

function checkLoseCondition() {
  if (wrongGuesses >= maxWrongGuesses) {
    addCurrentWordToUsed();
    const reveal = currentWord.toUpperCase();
    setMessage(`Oh no, the cake burned! The word was: ${reveal}`, "lose");
    revealWord();
    disableAllInput();
  }
}

function revealWord() {
  displayedWord = currentWord.split("");
  updateWordDisplay();
}

function disableAllInput() {
  const buttons = alphabetEl.querySelectorAll("button");
  buttons.forEach((btn) => (btn.disabled = true));
}

function handleKeydown(event) {
  const key = event.key.toLowerCase();
  if (key >= "a" && key <= "z") {
    handleGuess(key);
  }
}

playAgainBtn.addEventListener("click", startNewGame);
window.addEventListener("keydown", handleKeydown);

createAlphabetButtons();
startNewGame();
