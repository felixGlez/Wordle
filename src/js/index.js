// Mostrar tantos cuadrados como letras tengamos
// Hacer que el form no se envíe
// Elegir una palabra aleatoria
// Validar que la palabra enviada sea de 5 letras
// Validar que la palabra del usuario contenga letras
// Añadir la palabra del usuario

import { palabrasWordle } from './words';

const wordsElement = document.querySelectorAll('.word');
const formElement = document.getElementById('user-word');
const inputElement = document.querySelector('input');
const popupElement = document.getElementById('popup');

let round = 0;
let chosenWord;

const isLetterOnWord = () => {
  const userWord = inputElement.value;
  console.log(chosenWord);

  for (let i = 0; i < userWord.length; i++) {
    const userLetter = userWord[i];
    const correctLetter = chosenWord[i];
    const spanElement = wordsElement[round].children[i];

    if (userLetter === correctLetter) {
      spanElement.style.backgroundColor = 'green';
    } else if (chosenWord.includes(userLetter)) {
      spanElement.style.backgroundColor = 'orange';
    } else {
      spanElement.style.backgroundColor = '';
    }
  }
  round++;
};

const printUserWord = () => {
  for (let i = 0; i < inputElement.value.length; i++) {
    wordsElement[round].children[i].textContent = inputElement.value[i];
  }
  isLetterOnWord();
};

const validateWordLength = () => {
  if (inputElement.value.length > 5 || inputElement.value.length < 5) {
    popupElement.classList.replace('hide', 'flex');
    setTimeout(() => {
      popupElement.classList.replace('flex', 'hide');
    }, 1000);
  } else {
    printUserWord();
    inputElement.value = '';
  }
};

const chooseWord = () => {
  if (!chosenWord) {
    const randomNumber = Math.floor(Math.random() * palabrasWordle.length);
    chosenWord = palabrasWordle[randomNumber];
  }

  return chosenWord;
};

const displayLetters = () => {
  for (let i = 0; i < wordsElement.length; i++) {
    const fragment = document.createDocumentFragment();
    for (let j = 0; j < palabrasWordle[i].length; j++) {
      const newSpan = document.createElement('span');
      newSpan.classList.add('letter');
      fragment.append(newSpan);
    }
    wordsElement[i].append(fragment);
  }
  chooseWord();
};

formElement.addEventListener('submit', event => {
  event.preventDefault();
  validateWordLength();
});
displayLetters();
