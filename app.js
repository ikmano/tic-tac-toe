// GAMEBOARD
const GameBoard = (() => {
    const htmlBoard = document.getElementById('board');
    const boardSize = 9;

    const makeBoard = () => {
        for(let i = 0; i < boardSize; i++) {
            const div = document.createElement('div');
            div.classList.add('tile');
            div.innerHTML = "";
            htmlBoard.appendChild(div);
        }
    };

    const resetBoard = () => {
        while (htmlBoard.firstChild) {
            htmlBoard.firstChild.remove()
        }
        makeBoard();
    }

    const freezeBoard = () => {
        const div = document.createElement('div');
        div.setAttribute('id','freeze');
        htmlBoard.appendChild(div);
    }

    return {
        makeBoard,
        resetBoard,
        freezeBoard,
    }
})();

// GAMEFLOW 
const GameControl = (() => {
    const WINNING_COMBS = [
        [0,1,2],[3,4,5],[6,7,8],
        [2,5,8],[1,7,4],[0,3,6],
        [0,4,8],[6,4,2]
    ]
    const msg = document.getElementById('msg');

   
    const getCleanBoard = (tiles) => {
        let boardMembers = [];
        tiles.forEach(tile => {
            boardMembers.push(tile.innerHTML);
        });
        return boardMembers;
    }    
    
    function checForkWinner(marked, pX, pO){
        let won = false;
        WINNING_COMBS.forEach(x => {
            if(marked[x[0]] === marked[x[1]]) {
                if(marked[x[0]] === marked[x[2]]) {
                    if(marked[x[0]] === "X") {
                        msg.innerHTML= `Congratulations ${pX} won!`;
                        won = true;
                    }                        
                    else if(marked[x[0]] === 'O') {
                        msg.innerHTML= `Congratulations ${pO} won!`;
                        won = true;
                    }
                }
            }
        });
        return won;
    }

    function endGame(won, marked) {
        if(won) GameBoard.freezeBoard();
        else {
            let i = 0;
            marked.forEach(element => {
                if(element === "") i++;
            });   
            if(i === 0) msg.innerHTML= "It's a tie";
        }
    }

    const start = (playerO, playerX) => {
        const tiles = document.querySelectorAll('.tile');
        let marked = getCleanBoard(tiles);
        let lastTurn = "O";
        let index;
        let won;

        function turnMsg(player){
            msg.innerHTML = `${player}'s turn.`;
        }
        turnMsg(playerX)

        function markTile(tile){
            if(marked[index] === "") {
                if(lastTurn === "O") {
                    marked[index] = "X";
                    tile.innerHTML = "X";
                    lastTurn = "X";
                    turnMsg(playerO);
                }
                else {
                    marked[index] = "O";
                    tile.innerHTML = "O";
                    lastTurn = "O";
                    turnMsg(playerX);
                }
            }   
        }

        tiles.forEach(tile => {
            tile.addEventListener('mousedown', () => {
                index = Array.from(tile.parentNode.children).indexOf(tile);
                    markTile(tile);
                    won = checForkWinner(marked, playerX, playerO);        
                    endGame(won, marked);
            });
        });
    }

    const reset = () => {
        GameBoard.resetBoard();
        msg.innerHTML= "";
        start();
    }

    return {
        start,
        reset,
    }

})();

const btn = document.querySelector('#start-btn');
const card = document.querySelector('.inner');

btn.addEventListener('click', () => {
    const playerX = document.getElementById('pX');
    const playerO = document.getElementById('pO');
	card.classList.toggle('is-flipped');
    GameBoard.makeBoard();
    GameControl.start(playerO.value, playerX.value);
});

// GameBoard.makeBoard();
// GameControl.start();
