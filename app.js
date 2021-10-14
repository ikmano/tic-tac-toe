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

    const clearBoard = (tiles) => {
        tiles.forEach(e => {
            e.innerHTML = "";
        });
    };

    const freezeBoard = (tiles, mark) => {
        tiles.forEach(e => {
            e.removeEventListener('mouseover', mark);
        });
    };

    return {
        makeBoard,
        clearBoard,
        freezeBoard,
    }
})();

GameBoard.makeBoard();

// GAMEFLOW 

const GameControl = (() => {
    const tiles = document.querySelectorAll('.tile');
    const WINNING_COMBS = [
        [0,1,2],[3,4,5],[6,7,8],
        [2,5,8],[1,7,4],[0,3,6],
        [0,4,8],[6,4,2]
    ]
    let lastTurn = "O";
    
    const getCleanBoard = () => {
        let boardMembers = [];
        tiles.forEach(e => {
            boardMembers.push(e.innerHTML);
        });
        return boardMembers;
    }
    
    let marked = getCleanBoard();

    
    
    function checkWinner(){
        let won = false;
        WINNING_COMBS.forEach(x => {
            if(marked[x[0]] === marked[x[1]]) {
                if(marked[x[0]] === marked[x[2]]) {
                    if(marked[x[0]] === "X") {
                        document.getElementById('msg').innerHTML= "Congratulations X's won!";
                        won = true;
                    }                        
                    else if(marked[x[0]] === 'O') {
                        document.getElementById('msg').innerHTML= "Congratulations O's won!";
                        won = true;
                    }
                }
            }
        });
        
        return won;
    }

    let index;
    let won;

    function mark(e) {
        index = Array.from(e.parentNode.children).indexOf(e);
            if(marked[index] !== "") {
                if(lastTurn === "O") {
                    marked[index] = 'X';
                    e.innerHTML = "X";
                    lastTurn = "X";
                }
                else {
                    marked[index] = 'O';
                    e.innerHTML = "O";
                    lastTurn = "O";
                }   
                won = checkWinner();        
                endGame(won);
            }
    }

    function endGame(won) {
        if(won) GameBoard.freezeBoard(tiles,  mark);
        else {
            let i = 0;
            marked.forEach(e => {
                if(e === "") i++;
            });   
            if(i === 0) {
                document.getElementById('msg').innerHTML= "It's a draw";
                GameBoard.freezeBoard(tiles, mark);
            }
        }
    }
    function boardReady(){
        tiles.forEach(e => {
            e.addEventListener('mousedown', mark(e));
        })
    }

    boardReady();

})();

 


