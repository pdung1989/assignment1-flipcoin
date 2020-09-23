/**  
Orientation - JS assignment 1
Solution by: [Dung Tran <dung.tran3@metropolia.fi>]
*/

const COIN_HEAD = 0;
const COIN_REVERSE = 1;
const COIN_HEAD_TEXT = 'head';
const COIN_REVERSE_TEXT = 'reverse';

const statsResult = {
  amountOfWon: 0,
  totalThrows: 0,
  resultHistory: {
    flips: [], //e.g. 'head', 'reverse', 'head'
    userChoices: [] //e.g. 'head', 'head', 'head'
  },
  amountOfHead: 0,
  amountOfReverse: 0
};

// Bind a button click event and a listener function
const throwButton = document.querySelector('#throw-button');
throwButton.addEventListener('click', throwButtonClickHandler);

/**
 * throwButton onClick handler.
 * Function will be triggered when the throwButton is clicked
 */
function throwButtonClickHandler() {

  /**
   * Procedure:
   * 1. Flip coin
   * 2. Check userChoice to decide if won/lost
   * 3. Update statsResult object
   * 4. Update html page (p-result and div-statistics-result)
   */

  const coinFlip = flipCoin();
  const userChoice = checkUserChoice();

  console.log(`result: ${coinFlip} - userChoice: ${userChoice}`);

  const isWon = coinFlip === userChoice ? true : false;
  console.log(`isWon: ${isWon}`);

  updateCoinImage(coinFlip);
  updateStatsResult(isWon, coinFlip);

  updateResultView(isWon);
  updateStatisticsView();
}

/**
 * Flip the coin (randomly).
 * Return value of the coin (either 'head' or 'reverse')
 */
function flipCoin() {
  console.log('coin flipped');

  let x = Math.floor(Math.random() * 2);
  if (x === COIN_HEAD) {
    return COIN_HEAD_TEXT;
  } else {
    return COIN_REVERSE_TEXT;
  }
}

/**
 * Update statsResult object
 * 
 * @param {*} isWon whether user has won or lost
 * @param {*} flipCoin result of flipped coin
 */
function updateStatsResult(isWon, coinFlip) {
  statsResult.totalThrows++;

  if (isWon) {
    statsResult.amountOfWon++;
  }

  if (coinFlip === COIN_HEAD_TEXT) {
    statsResult.amountOfHead++;
    statsResult.resultHistory.flips.push(COIN_HEAD_TEXT);
  } else {
    statsResult.amountOfReverse++;
    statsResult.resultHistory.flips.push(COIN_REVERSE_TEXT);
  }
}

///
/// User-defined functions
///

/**
 * Read user's input value from html form.
 * Return the selected value
 */
function checkUserChoice() {
  const choice = document.querySelector('input[name="user-choice"]:checked').value;
  console.log('user choice', choice);
  statsResult.resultHistory.userChoices.push(choice);
  return choice;
}

/**
 * Update coin image based on user's input value
 */
function updateCoinImage(coinFlip) {
  // Get reference to html element with id "coin-image"
  const coinImage = document.querySelector('#coin-image');
  if (coinFlip === COIN_HEAD_TEXT) {
    // Change the value of the src attribute
    coinImage.src = 'head.png';
  } else {
    // Change the value of the src attribute
    coinImage.src = 'reverse.png';
  }
}

/**
 * Update p[id=result] based on game result
 */
function updateResultView(isWon) {
  // Get reference to html element with id "result"
  const resultParagraph = document.querySelector('#result');
  if (isWon) {
    // Change the text content of the paragraph element
    resultParagraph.textContent = 'You won!';
  } else {
    // Change the text content of the paragraph element
    resultParagraph.textContent = 'You lost!';
  }
}

/**
 * Update DIV[id=stats] based on game result
 */
function updateStatisticsView() {
  // Get reference to html element with id "win-count"
  const winCount = document.querySelector('#win-count');
  winCount.innerHTML = `${statsResult.amountOfWon}/${statsResult.totalThrows}`;

  // Get reference to html element with id "result-history"
  const resultHistory = document.querySelector('#result-history');
  resultHistory.innerHTML =
    `<strong>Flips</strong>: ${statsResult.resultHistory.flips.join(', ')} 
  <br>
  <strong>User choices</strong>: ${statsResult.resultHistory.userChoices.join(', ')}`;

  // Get reference to html element with id "head-count"
  const headCount = document.querySelector('#head-count');
  headCount.textContent = statsResult.amountOfHead;

  // Get reference to html element with id "reverse-count"
  const reverseCount = document.querySelector('#reverse-count');
  reverseCount.textContent = statsResult.amountOfReverse;
}
