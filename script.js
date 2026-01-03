import { words } from "./words.js";
import { createGame } from "./game.js";

const maxWrongGuesses = 10;
const baseTemperature = 160;
const temperatureStep = 10;

const game = createGame({
  words,
  maxWrongGuesses,
  baseTemperature,
  temperatureStep,
});

const wordDisplayEl = document.getElementById("word-display");
const alphabetEl = document.getElementById("alphabet");
const messageEl = document.getElementById("message");
const wrongCountEl = document.getElementById("wrong-count");
const cakeImageEl = document.getElementById("cake-image");
const playAgainBtn = document.getElementById("play-again");
const usedWordsEl = document.getElementById("used-words");
const temperatureEl = document.getElementById("temperature");
const thermometerFillEl = document.getElementById("thermometer-fill");

function updateWordDisplay(state) {
  wordDisplayEl.textContent = state.displayedWord.join(" ");
}

function updateWrongCount(state) {
  wrongCountEl.textContent = `Wrong guesses: ${state.wrongGuesses} / ${state.maxWrongGuesses}`;
}

function updateCakeImage(state) {
  const stage = state.stage;
  cakeImageEl.classList.remove("is-changing");
  void cakeImageEl.offsetWidth;
  cakeImageEl.src = `./assets/h-${stage}.png`;
  cakeImageEl.classList.add("is-changing");
}

function updateTemperature(state) {
  temperatureEl.textContent = `Oven temperature: ${state.temperature}°C`;
  thermometerFillEl.style.width = `${state.thermometerPercent}%`;
}

function updateUsedWordsDisplay(state) {
  usedWordsEl.textContent = state.usedWords.length
    ? `Words used: ${state.usedWords.join(", ")}`
    : "";
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

function disableAllInput() {
  const buttons = alphabetEl.querySelectorAll("button");
  buttons.forEach((btn) => (btn.disabled = true));
}

function setButtonResult(letter, correct) {
  const buttons = alphabetEl.querySelectorAll("button");
  const button = Array.from(buttons).find((b) => b.dataset.letter === letter);
  if (!button) return;
  button.disabled = true;
  button.classList.add(correct ? "correct" : "wrong");
}

function renderAll(state) {
  updateWordDisplay(state);
  updateWrongCount(state);
  updateCakeImage(state);
  updateTemperature(state);
  updateUsedWordsDisplay(state);
}

function startNewGame() {
  const state = game.startNewGame();
  renderAll(state);
  resetAlphabetButtons();
  clearMessage();
}

function handleGuess(letter) {
  const result = game.handleGuess(letter);
  if (!result.ok) return;

  setButtonResult(letter, result.correct);

  renderAll(result.state);

  if (result.ended) {
    setMessage(result.message, result.outcome);
    disableAllInput();
  }
}

function handleKeydown(event) {
  const key = event.key.toLowerCase();
  if (key >= "a" && key <= "z") handleGuess(key);
}

playAgainBtn.addEventListener("click", startNewGame);
window.addEventListener("keydown", handleKeydown);

createAlphabetButtons();
startNewGame();
