const player = (symbol, name) => {
    return {
        symbol,
        name,
    }
}

const player1 = player('x', 'X');
const player2 = player('o', 'O');

const gameBoard = (() => {
    let gameBoardContents = ['', '', '', '', '', '', '', '', ''];

    const getGameBoard = () => {
        return gameBoardContents;
    }

    const renderContents = () => {
        for(let i = 0; i < 9; i++){
            const cell = document.querySelector(`.cell[data-number="${i+1}"]`);
            cell.textContent = gameBoardContents[i];
        }
    }

    const resetBoard = () => {
        gameBoardContents = ['', '', '', '', '', '', '', '', ''];
        renderContents();
    }

    return {
        getGameBoard,
        renderContents,
        resetBoard,
    };
})();


const gameManager = (() => {
    let currentTurn = player1;
    const resultDisplay = document.querySelector('.result-display');

    const startGame = () => {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.addEventListener('click', onCellClick)
        })

        const restartBtn = document.querySelector('#restart-btn');
        restartBtn.addEventListener('click', restartGame);
    }

    const onCellClick = (event) => {
        const cellNumber = event.target.getAttribute("data-number");

        if(gameBoard.getGameBoard()[cellNumber-1] === ''){
            makeMove(cellNumber)
            gameBoard.renderContents();

            checkForGameOver();

            currentTurn = currentTurn === player1 ? player2 : player1;
        }
    }

    const makeMove = (cellNumber) => {
        gameBoard.getGameBoard()[cellNumber-1] = currentTurn.symbol;
    }

    const checkForGameOver = () => {
        for(let i = 0; i < 9; i+=3){
            if(gameBoard.getGameBoard()[i] !== '' && 
                gameBoard.getGameBoard()[i] === gameBoard.getGameBoard()[i+1] && gameBoard.getGameBoard()[i+1] === gameBoard.getGameBoard()[i+2]){
                    onGameOver(currentTurn, false)
                    return;
            }
        }

        for(let i = 0; i < 3; i++){
            if(gameBoard.getGameBoard()[i] !== '' &&
                gameBoard.getGameBoard()[i] === gameBoard.getGameBoard()[i+3] && gameBoard.getGameBoard()[i+3] === gameBoard.getGameBoard()[i+6]){
                    onGameOver(currentTurn, false)
                    return;
                }
        }

        if(gameBoard.getGameBoard()[0] !== '' && gameBoard.getGameBoard()[0] === gameBoard.getGameBoard()[4] && gameBoard.getGameBoard()[4] === gameBoard.getGameBoard()[8]){
            onGameOver(currentTurn, false)
            return;
        }

        if(gameBoard.getGameBoard()[2] !== '' && gameBoard.getGameBoard()[2] === gameBoard.getGameBoard()[4] && gameBoard.getGameBoard()[4] === gameBoard.getGameBoard()[6]) {
            onGameOver(currentTurn, false)
            return;
        }

        if(!gameBoard.getGameBoard().includes('')){
            console.log("It's a tie.")
            onGameOver(currentTurn, true)
            return;
        }
    }

    const onGameOver = (currentTurn, isATie) => {
        cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.removeEventListener('click', onCellClick)
        })

        if(isATie){
            resultDisplay.textContent = "It's a tie";
            return;
        }
        resultDisplay.textContent = `${currentTurn.name} wins!`;
    }

    const restartGame = () => {
        gameBoard.resetBoard();
        resultDisplay.textContent = '';

        startGame();
    }

    return {
        startGame,
    }
})();

gameManager.startGame();