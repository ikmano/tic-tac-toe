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

    return {
        makeBoard,
    }
})();

GameBoard.makeBoard();
const tiles = document.querySelectorAll('.tile');
//console.log(tiles);
// GAMEFLOW 

const GameControl = (() => {
    
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

    function freezeBoard(mark){
        tiles.forEach(e => {
            e.removeEventListener('mousedown', mark);
        });
    };
    
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

    function endGame(won, mark) {
        if(won) freezeBoard(mark);
        else {
            let i = 0;
            marked.forEach(e => {
                if(e === "") i++;
            });   
            if(i === 0) {
                document.getElementById('msg').innerHTML= "It's a draw";
                freezeBoard(mark);
            }
        }
    }

    let index;
    let won;
    
        tiles.forEach(tile => {
            tile.addEventListener('mousedown', function mark(){
                index = Array.from(tile.parentNode.children).indexOf(tile);

            if(marked[index] === "") {
                if(lastTurn === "O") {
                    marked[index] = 'X';
                    tile.innerHTML = "X";
                    lastTurn = "X";
                }
                else {
                    marked[index] = 'O';
                    tile.innerHTML = "O";
                    lastTurn = "O";
                }   
                won = checkWinner();        
                endGame(won, mark);
            }
        });
});


})();

