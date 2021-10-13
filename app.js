// GAMEBOARD OBJECT - module

const GameBoard = (() => {
    let gameBoard = [];
    for(let i = 0; i < 9; i++){
        gameBoard.push("X");
    }
    function makeBoard(){
        const board = document.getElementById('board');
        for(let i = 0; i < 9; i++){
            const div = document.createElement('div');
            div.classList.add('board-tile');
            div.innerHTML = gameBoard[i];
            board.appendChild(div);
        }
    }
    return makeBoard();

})();


// PLAYER OBJECT - functionFactory

const Player = () => {

};


// GAMEFLOW OBJECT - module
