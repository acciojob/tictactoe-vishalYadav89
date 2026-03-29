//your JS code here. If required.
let player1 = "";
let player2 = "";
let currentPlayer = "";
let currentSymbol = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningCombinations = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // cols
    [0,4,8],[2,4,6]          // diagonals
];

// Start Game
document.getElementById("submit").addEventListener("click", function () {
    player1 = document.getElementById("player-1").value;
    player2 = document.getElementById("player-2").value;

    if (!player1 || !player2) {
        alert("Enter both player names");
        return;
    }

    currentPlayer = player1;

    document.getElementById("player-form").style.display = "none";
    document.getElementById("game").style.display = "block";

    document.querySelector(".message").innerText = `${currentPlayer}, you're up`;
});

// Cell Click
document.querySelectorAll(".cell").forEach(cell => {
    cell.addEventListener("click", handleClick);
});

function handleClick(e) {
    let index = e.target.id;

    if (board[index] !== "" || !gameActive) return;

    board[index] = currentSymbol;
    e.target.innerText = currentSymbol;

    if (checkWinner()) {
        document.querySelector(".message").innerText =
            `${currentPlayer} congratulations you won!`;
        gameActive = false;
        return;
    }

    // Switch Player
    if (currentSymbol === "X") {
        currentSymbol = "O";
        currentPlayer = player2;
    } else {
        currentSymbol = "X";
        currentPlayer = player1;
    }

    document.querySelector(".message").innerText = `${currentPlayer}, you're up`;
}

// Check Winner
function checkWinner() {
    return winningCombinations.some(combination => {
        let [a, b, c] = combination;
        return board[a] &&
               board[a] === board[b] &&
               board[a] === board[c];
    });
}