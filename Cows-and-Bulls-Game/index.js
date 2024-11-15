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
    if (guess.length !== 4 || isNaN(guess)) return "Enter 4-digit number.";
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

async function submitGuess() {
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

    if (bulls === 4) {
        feedbackDiv.textContent = "Congratulations! You've guessed the number!";
        
        const userId = localStorage.getItem('userId');
        if (userId) {
            const score = {
                user: { userId: userId },
                noOfGuesses: guesses.length,
                result: "Won"
            };
            await saveScore(userId, score);
            loadScores(userId); 
        }
    }
}

async function saveScore(userId, score) {
    try {
        const response = await fetch(`http://localhost:8080/scores/add?userId=${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(score)
        });

        if (!response.ok) {
            const message = await response.text();
            console.error('Failed to save score:', message);
        }
    } catch (error) {
        console.error('Error saving score:', error);
    }
}

async function loadScores(userId) {
    try {
        const response = await fetch(`http://localhost:8080/scores/user/${userId}`);
        if (!response.ok) {
            console.error('Failed to fetch scores');
            return;
        }

        const scores = await response.json();
        const scoreTableBody = document.getElementById('scoreTableBody');
        scoreTableBody.innerHTML = scores.map((score, index) =>
            `<tr>
                <td>${index + 1}</td>
                <td>${score.noOfGuesses}</td>
                <td>${score.result}</td>
            </tr>`
        ).join('');
    } catch (error) {
        console.error('Error loading scores:', error);
    }
}

function resetGame() {
    const userId = localStorage.getItem('userId');
    if (userId && guesses.length > 0) {
        const score = {
            user: { userId: userId },
            noOfGuesses: guesses.length,
            result: "Give Up"
        };
        saveScore(userId, score);
        loadScores(userId);
    }

    document.getElementById('targetNumberDisplay').textContent = ``;
    targetNumber = generateNumber();
    guesses = [];
    document.getElementById('guessInput').value = '';
    document.getElementById('feedback').textContent = '';
    document.getElementById('error').textContent = '';
    document.getElementById('guessList').innerHTML = '';
}

function showAnswer() {
    const userId = localStorage.getItem('userId');
    if (userId && guesses.length > 0) {
        const score = {
            user: { userId: userId },
            noOfGuesses: guesses.length,
            result: "Give Up"
        };
        saveScore(userId, score);
        loadScores(userId);
    }
    document.getElementById('targetNumberDisplay').textContent = `Correct Number: ${targetNumber}`;
}

window.onload = function() {
    const userId = localStorage.getItem('userId');
    if (userId) {
        loadScores(userId);
    }
};
