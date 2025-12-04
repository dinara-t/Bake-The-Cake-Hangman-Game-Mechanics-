# Hangman – Bake a Cake Edition

A small web-based Hangman game built with vanilla JavaScript, HTML, and SCSS – but with a twist: instead of building a gallows, you’re trying to **finish baking a cake** before you run out of guesses.

## Overview

The game uses the classic Hangman mechanic:  
guess the hidden word one letter at a time.  
Each wrong guess progresses the cake illustration; run out of guesses and the bake is ruined.

This project was built to practise:

- Arrays and iterators
- DOM manipulation
- Event listeners
- String manipulation
- Basic responsive layout

## Features (MVP)

- Random word selected from a word list at the start of each game
- Hidden word displayed as underscores (`_`) and updated as you guess
- On-screen keyboard with buttons for all 26 letters
- Correct guesses reveal matching letters in the word
- Incorrect guesses advance the cake “failure” stages
- Previously guessed letters are tracked and disabled
- Win and loss messages depending on the outcome
- “Play again” button to restart with a new word
- Responsive design for at least two screen sizes

## How to Run

1. Clone or download this repository.
2. Open `index.html` in your browser.
3. Start guessing letters and try to save the cake!

## Assets

- Cake illustration: custom drawing by me.
- Fonts loaded via Google Fonts (`Playwrite NO` and `Playfair Display`).
