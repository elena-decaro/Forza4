const rows = 6;
const columns = 7;
const playerRed = "R";
const playerYellow = "Y";

let board;
let dispColumn = [];

let gameover = false;

//imposto il player iniziale
let currentPlayer = playerRed;

window.onload = () => {
    setGame();
}

function setGame(){
    board = [];
    dispColumn = [5, 5, 5, 5, 5, 5, 5];
    
    for (let riga = 0; riga < rows; riga++){
        let row =[];

        //popolo ogni riga con n elementi ( n = numero di colonne)
        for (let colonna = 0; colonna < columns; colonna++){
            row.push(' ');
            //creo il div che dovrà essere aggiunto alla board
            let tile = document.createElement('div');
            tile.id = `${riga.toString()}-${colonna.toString()}`;
            //altrimenti potevo scrivere: riga.toString() + "-" + colonna.toString();
            tile.classList.add("tile");
            //Gestire il click sull'elemento
            tile.addEventListener("click", setPiece);
            //Aggiungo l'elemento alla board
            document.getElementById("board").append(tile);
            document.querySelector("#board");
            // document.querySelectorAll("#board");

        }
        
        //aggiungo la riga alla matrice

        board.push(row);
        /*
        [
        0: [' ', ' ', ' ', ' ', ' ', ' ', ' ']
        1: [' ', ' ', ' ', ' ', ' ', ' ', ' ']
        2: [' ', ' ', ' ', ' ', ' ', ' ', ' ']
        3: [' ', ' ', ' ', ' ', ' ', ' ', ' ']
        4: [' ', ' ', ' ', ' ', ' ', ' ', ' ']
        5: [' ', ' ', ' ', ' ', ' ', ' ', ' ']
        ]
        */
    } 

    function setPiece(){

        if(gameover){
            return;
        }

        //prendo le coordinate (in formato string riga-colonna)
        //uso split per toglier il "-" e avere un array con [riga, colonna]
        let coords = this.id.split("-");
        let r = Number(coords[0]);
        let c = Number(coords[1]);

        //sovrascrivo la riga con quella in cui dovrebbe stare il gettore
        r = dispColumn[c];
        board[r][c] = currentPlayer;

        //gestione della classe css per il gettone
        let tile = document.getElementById(r.toString() + "-" + c.toString());
        if(currentPlayer == playerRed){

            //metti la classe per il gettone rosso
            tile.classList.add("red-piece");
            //ora il giocatore cambia ed è il giallo
            currentPlayer = playerYellow
        }
        else {
            tile.classList.add("yellow-piece");
            currentPlayer = playerRed;
        }

        //aggiornamento degli indici delle righe disponibili
        dispColumn[c] = r-1;
        checkWinner();

        //TODO - CheckWinner();
        }

        function checkWinner() {
            
            //checkwinner orizzontale
            for(let r = 0; r < rows; r++){
                for(let c= 0; c < columns - 3; c++);
                //controllo se il tile è di un giocatore
                if(board[r][c] != ' '){
                    //se i tre slot adiacenti sono dello stesso colore
                    if(board[r][c] == board[r][c+1] &&
                        board[r][c] == board[r][c+2] &&
                        board[r][c] == board[r][c+3]){
                            //imposto il vincitore e esco dal ciclo
                            //TODO - setWinner()
                            return;
                        }
                }
            }

        }
}

function setWinner(row, column){
    if(board[row][column] == playerRed){
        alert("Il giocatore ROSSO ha vinto!");
    }
    else{
        alert("Il giocatore GIALLO ha vinto!")
    }
    gameover = true;
}