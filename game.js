export function createGame({
  words,
  maxWrongGuesses = 10,
  baseTemperature = 160,
  temperatureStep = 10,
}) {
  let currentWord = "";
  let displayedWord = [];
  let guessedLetters = new Set();
  let wrongGuesses = 0;
  let usedWords = [];

  function getRandomWord() {
    const available = words.filter((word) => !usedWords.includes(word));
    if (available.length === 0) {
      usedWords = [];
      return words[Math.floor(Math.random() * words.length)];
    }
    return available[Math.floor(Math.random() * available.length)];
  }

  function addCurrentWordToUsed() {
    if (currentWord && !usedWords.includes(currentWord))
      usedWords.push(currentWord);
  }

  function getWinMessageForStage(stage) {
    if (stage <= 2) return "Perfect bake! The cake is moist and fluffy.";
    if (stage <= 4) return "Delicious! Just a light, golden bake.";
    if (stage <= 7) return "Nice job! The cake is a little toasty but tasty.";
    if (stage <= 9)
      return "Phew! That was close. The cake is overdone but still edible.";
    return "You saved it at the last second!";
  }

  function getStage() {
    return Math.min(wrongGuesses, maxWrongGuesses);
  }

  function getTemperature() {
    return baseTemperature + wrongGuesses * temperatureStep;
  }

  function getThermometerPercent() {
    return (wrongGuesses / maxWrongGuesses) * 100;
  }

  function startNewGame() {
    currentWord = getRandomWord();
    guessedLetters = new Set();
    wrongGuesses = 0;
    displayedWord = currentWord
      .split("")
      .map((char) => (char === " " ? " " : "_"));
    return getState();
  }

  function revealWord() {
    displayedWord = currentWord.split("");
  }

  function checkWinCondition() {
    if (!displayedWord.includes("_")) {
      const stage = getStage();
      addCurrentWordToUsed();
      return {
        ended: true,
        outcome: "win",
        message: getWinMessageForStage(stage),
      };
    }
    return { ended: false };
  }

  function checkLoseCondition() {
    if (wrongGuesses >= maxWrongGuesses) {
      addCurrentWordToUsed();
      const reveal = currentWord.toUpperCase();
      revealWord();
      return {
        ended: true,
        outcome: "lose",
        message: `Oh no, the cake burned! The word was: ${reveal}`,
      };
    }
    return { ended: false };
  }

  function handleGuess(letter) {
    if (!currentWord || guessedLetters.has(letter))
      return { ok: false, reason: "ignored" };

    guessedLetters.add(letter);

    if (currentWord.includes(letter)) {
      for (let i = 0; i < currentWord.length; i++) {
        if (currentWord[i] === letter) displayedWord[i] = letter;
      }

      const win = checkWinCondition();
      if (win.ended)
        return {
          ok: true,
          correct: true,
          ended: true,
          outcome: win.outcome,
          message: win.message,
          state: getState(),
        };

      return { ok: true, correct: true, ended: false, state: getState() };
    }

    wrongGuesses++;

    const lose = checkLoseCondition();
    if (lose.ended)
      return {
        ok: true,
        correct: false,
        ended: true,
        outcome: lose.outcome,
        message: lose.message,
        state: getState(),
      };

    return { ok: true, correct: false, ended: false, state: getState() };
  }

  function getState() {
    return {
      currentWord,
      displayedWord: [...displayedWord],
      guessedLetters: new Set(guessedLetters),
      wrongGuesses,
      usedWords: [...usedWords],
      maxWrongGuesses,
      stage: getStage(),
      temperature: getTemperature(),
      thermometerPercent: getThermometerPercent(),
    };
  }

  return {
    startNewGame,
    handleGuess,
    getState,
  };
}
