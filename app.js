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
        console.log(htmlBoard);
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

GameBoard.makeBoard();
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
        console.log(boardMembers);
        return boardMembers;
    }
    
    function checkWinner(marked){
        let won = false;
        WINNING_COMBS.forEach(x => {
            if(marked[x[0]] === marked[x[1]]) {
                if(marked[x[0]] === marked[x[2]]) {
                    if(marked[x[0]] === "X") {
                        msg.innerHTML= "Congratulations X's won!";
                        won = true;
                    }                        
                    else if(marked[x[0]] === 'O') {
                        msg.innerHTML= "Congratulations O's won!";
                        won = true;
                    }
                }
            }
        });
        return won;
    }

    function endGame(won, marked) {
        if(won) {
            GameBoard.freezeBoard();
        }
        else {
            let i = 0;
            marked.forEach(e => {
                if(e === "") i++;
            });   
            if(i === 0) {
                msg.innerHTML= "It's a tie";
                GameBoard.freezeBoard();
            }
        }
    }

    const start = () => {
        const tiles = document.querySelectorAll('.tile');
        let marked = getCleanBoard(tiles);
        console.log(marked);
        let lastTurn = "O";
        let index;
        let won;

        tiles.forEach(tile => {
            tile.addEventListener('mousedown', () => {
                index = Array.from(tile.parentNode.children).indexOf(tile);
                if(marked[index] === "") {
                    if(lastTurn === "O") {
                        marked[index] = "X";
                        tile.innerHTML = "X";
                        lastTurn = "X";
                    }
                    else {
                        marked[index] = "O";
                        tile.innerHTML = "O";
                        lastTurn = "O";
                    }   
                    won = checkWinner(marked);        
                    endGame(won, marked);
                }
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

GameControl.start();
