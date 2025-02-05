const gameBoard = document.getElementById('gameBoard');
const statusDisplay = document.getElementById('status');
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

// Winning conditions
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Handles cell clicks
function handleCellClick(event) {
    const clickedCell = event.target;
    const cellIndex = Array.from(gameBoard.children).indexOf(clickedCell);

    // Prevent interaction if cell is filled or game is inactive
    if (gameState[cellIndex] !== '' || !isGameActive) {
        return;
    }

    // Update cell and game state
    gameState[cellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    if (checkWin()) {
        statusDisplay.textContent = `Player ${currentPlayer} has won!`;
        isGameActive = false;
    } else if (gameState.every(cell => cell !== '')) {
        statusDisplay.textContent = 'Game is a draw!';
        isGameActive = false;
    } else {
        // Switch turns
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    }
}

// Checks if a player has won
function checkWin() {
    return winningConditions.some(condition => {
        return condition.every(index => gameState[index] === currentPlayer);
    });
}

// Restarts the game
function restartGame() {
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    statusDisplay.textContent = "Player X's turn";
    Array.from(gameBoard.children).forEach(cell => (cell.textContent = ''));
}

// Creates the game board
function createBoard() {
    gameBoard.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', handleCellClick);
        gameBoard.appendChild(cell);
    }
}

// Initialize the game board on page load
createBoard();
