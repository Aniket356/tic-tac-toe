const player = (symbol, name) => {
    return {
        symbol,
        name,
    }
}

const player1 = player('x', 'Player 1');
const player2 = player('o', 'Player 2');

const gameBoard = (() => {
    let gameBoardContents = ['', '', '', '', '', '', '', '', ''];

    const renderContents = () => {
        for(let i = 0; i < 9; i++){
            const cell = document.querySelector(`.cell[data-number="${i+1}"]`);
            cell.textContent = gameBoardContents[i];
        }
    }

    return {
        gameBoardContents,
        renderContents,
    };
})();


const gameManager = (() => {
    let currentTurn = player1;
    let isGameOver = false;

    const startGame = () => {
        cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.addEventListener('click', onCellClick)
        })
    }

    const onCellClick = (event) => {
        const cellNumber = event.target.getAttribute("data-number");

        if(gameBoard.gameBoardContents[cellNumber-1] === ''){
            makeMove(cellNumber)
            gameBoard.renderContents();

            checkForGameOver();
            if(isGameOver) gameOver();

            currentTurn = currentTurn === player1 ? player2 : player1;
        }
    }

    const makeMove = (cellNumber) => {
        gameBoard.gameBoardContents[cellNumber-1] = currentTurn.symbol;
    }

    const checkForGameOver = () => {
        for(let i = 0; i < 9; i+=3){
            if(gameBoard.gameBoardContents[i] !== '' && 
                gameBoard.gameBoardContents[i] === gameBoard.gameBoardContents[i+1] && gameBoard.gameBoardContents[i+1] === gameBoard.gameBoardContents[i+2]){
                    console.log(`${currentTurn.name} wins!`);
                    isGameOver = true;
                    return;
            }
        }

        for(let i = 0; i < 3; i++){
            if(gameBoard.gameBoardContents[i] !== '' &&
                gameBoard.gameBoardContents[i] === gameBoard.gameBoardContents[i+3] && gameBoard.gameBoardContents[i+3] === gameBoard.gameBoardContents[i+6]){
                    console.log(`${currentTurn.name} wins!`);
                    isGameOver = true;
                    return;
                }
        }

        if(gameBoard.gameBoardContents[0] !== '' && gameBoard.gameBoardContents[0] === gameBoard.gameBoardContents[4] && gameBoard.gameBoardContents[4] === gameBoard.gameBoardContents[8]){
            console.log(`${currentTurn.name} wins!`);
            isGameOver = true;
            return;
        }

        if(gameBoard.gameBoardContents[2] !== '' && gameBoard.gameBoardContents[2] === gameBoard.gameBoardContents[4] && gameBoard.gameBoardContents[4] === gameBoard.gameBoardContents[6]) {
            console.log(`${currentTurn.name} wins!`);
            isGameOver = true;
            return;
        }

        if(!gameBoard.gameBoardContents.includes('')){
            console.log("It's a tie.")
            isGameOver = true;
            return;
        }
    }

    const gameOver = () => {
        cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.removeEventListener('click', onCellClick)
        })
    }

    return {
        startGame,
    }
})();

gameManager.startGame();