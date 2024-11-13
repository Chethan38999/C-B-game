let targetNumber = generateNumber();
let guesses = [];

function generateNumber() {
    const digits = [];
    while (digits.length < 4) {
        const digit = Math.floor(Math.random() * 10);
        if (!digits.includes(digit)) digits.push(digit);
    }
    return digits.join('');
}

function validateGuess(guess) {
    if (guess.length !== 4 || isNaN(guess)) return "Input must be a 4-digit number.";
    if (new Set(guess).size !== 4) return "All digits must be unique.";
    return null;
}

function calculateCowsAndBulls(guess) {
    let bulls = 0, cows = 0;
    guess.split('').forEach((digit, index) => {
        if (digit === targetNumber[index]) {
            bulls++;
        } else if (targetNumber.includes(digit)) {
            cows++;
        }
    });
    return { cows, bulls };
}

function submitGuess() {
    const guess = document.getElementById('guessInput').value;
    const errorDiv = document.getElementById('error');
    const feedbackDiv = document.getElementById('feedback');
    const guessList = document.getElementById('guessList');
    errorDiv.textContent = '';
    feedbackDiv.textContent = '';

    const validationError = validateGuess(guess);
    if (validationError) {
        errorDiv.textContent = validationError;
        return;
    }

    const { cows, bulls } = calculateCowsAndBulls(guess);
    guesses.push({ guess, cows, bulls });

    guessList.innerHTML = guesses.map(({ guess, cows, bulls }) =>
        `<li class="list-group-item">Guessed Number: ${guess} <br> Cows: ${cows}, Bulls: ${bulls}</li>`
    ).join('');
    feedbackDiv.textContent = bulls === 4 ? "Congratulations! You've guessed the number!" : '';
}


function resetGame() {
    targetNumber = generateNumber();
    guesses = [];
    document.getElementById('guessInput').value = '';
    document.getElementById('feedback').textContent = '';
    document.getElementById('error').textContent = '';
    document.getElementById('guessList').innerHTML = '';
    document.getElementById('targetNumberDisplay').textContent = `Generated Number: ${targetNumber}`;
}
