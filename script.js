let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";

const statusText = document.getElementById("status");
const cells = document.querySelectorAll(".cell");

function makeMove(index) {
  if (board[index] === "" && !gameOver && currentPlayer === "X") {
    board[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    checkWinner();
    if (!gameOver) {
      currentPlayer = "O";
      statusText.textContent = "Computer's turn";
      setTimeout(computerMove, 500);
    }
  }
}

function computerMove() {
  const availableMoves = board.reduce((acc, curr, index) => {
    if (curr === "") acc.push(index);
    return acc;
  }, []);

  if (availableMoves.length === 0 || gameOver) return;

  const randomMove =
    availableMoves[Math.floor(Math.random() * availableMoves.length)];
  board[randomMove] = "O";
  cells[randomMove].textContent = "O";
  checkWinner();
  if (!gameOver) {
    currentPlayer = "X";
    statusText.textContent = "Player X's turn";
  }
}

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let combo of winningCombinations) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameOver = true;
      statusText.textContent = `Player ${currentPlayer} wins!`;
      setTimeout(() => {
        alert(`Player ${currentPlayer} wins!`);
        resetGame();
      }, 1000);
      return;
    }
  }

  if (!board.includes("")) {
    gameOver = true;
    statusText.textContent = "It's a draw!";
    setTimeout(() => {
      alert("It's a draw!");
      resetGame();
    }, 1000);
  }
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameOver = false;
  statusText.textContent = `Player X's turn`;
  cells.forEach((cell) => (cell.textContent = ""));
}
