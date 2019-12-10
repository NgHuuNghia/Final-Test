
const turnText = document.getElementById("turn");
var turnCount = 0; // chẵn -> player 1, lẻ -> player 2 

const btnStart = document.querySelector('#btnStart');
const btnReset = document.querySelector('#btnReset');

const container = document.getElementById("main");
var boxes;
var sizeChessBoard;
var sizeWin;


// function handle
function createChessBoard() {

    if (boxes != undefined) {
        boxes.forEach(box => {
            container.removeChild(box);
        });

    }

    sizeChessBoard = parseInt(document.getElementById("sizeChessBoard").value);
    sizeWin = parseInt(document.getElementById("SizeWin").value);
    //set width chess board
    container.style.width = sizeChessBoard * 60 + "px";
    //create chessboard with id ='i-j' , (row i , column j) 
    for (let i = 1; i <= sizeChessBoard; i++) {

        for (let j = 1; j <= sizeChessBoard; j++) {
            var row = document.createElement("div");
            row.classList.add('box');
            row.setAttribute('id', i + "-" + j);
            container.appendChild(row);
        }
    }

    boxes = document.querySelectorAll(".box");
    boxes.forEach(box => box.addEventListener('click', ClickOnChessBoard));

}

function ClickOnChessBoard() {

    if (this.innerHTML !== "X" && this.innerHTML !== "O") {
        if (turnCount % 2 === 0) {

            this.innerHTML = "X";
            this.style.color = "blue";
            turnText.innerHTML = "Player 2 (O)";
            turnText.style.color = "red";
            CheckWinner(this.id, sizeWin, sizeChessBoard, "X");
            turnCount += 1;

        } else {

            this.innerHTML = "O";
            this.style.color = "red";
            turnText.innerHTML = "Player 1 (X)";
            turnText.style.color = "blue";
            CheckWinner(this.id, sizeWin, sizeChessBoard, "O");
            turnCount += 1;
        }
    }
}

function selectWinner() {

    if (turnCount % 2 === 0) {
        Swal.fire('Player 1 (X) chiến thắng');
    } else {
        Swal.fire('Player 2 (O) chiến thắng');
    }
    document.getElementById("btnReset").style.visibility = "visible";
    preventClickChessBoard();
}

function CheckWinner(CurBox, sizeWin, sizeChessBoard, key) {

    if (Horizontal(CurBox, sizeWin, sizeChessBoard, key) == true) {
        selectWinner();
    } else if (Vertically(CurBox, sizeWin, sizeChessBoard, key) == true) {
        selectWinner();
    } else if (DiagonalLeft(CurBox, sizeWin, sizeChessBoard, key) == true) {
        selectWinner();
    } else if (DiagonalRight(CurBox, sizeWin, sizeChessBoard, key) == true) {
        selectWinner();
    } else {
        // hoà
        var isFull = true;

        boxes.forEach(box => {
            if (box.innerHTML === "") {
                isFull = false;
            }
        });

        if (isFull == true) {
            Swal.fire('Hoà');
            document.getElementById("btnReset").style.visibility = "visible";
            preventClickChessBoard();
        }
    }


}

//check win function

function Horizontal(CurBox, sizeWin, sizeChessBoard, key) {

    var box = CurBox.split("-");
    var i, j, y;
    i = parseInt(box[0]);
    j = y = parseInt(box[1]);

    var m = 0;
    var n = 0;

    while (j >= 1 && document.getElementById(i + "-" + j).innerHTML === key) {
        m++;
        j--;
    }
    while (y <= sizeChessBoard && document.getElementById(i + "-" + y).innerHTML === key) {
        n++;
        y++;
    }
    if (m == sizeWin || n == sizeWin) return true;
    return false;
}

function Vertically(CurBox, sizeWin, sizeChessBoard, key) {


    var box = CurBox.split("-");
    var i, j, x;
    i = x = parseInt(box[0]);
    j = parseInt(box[1]);

    var m = 0;
    var n = 0;

    while (i >= 1 && document.getElementById(i + "-" + j).innerHTML === key)
    {
        m++;
        i--;
    }
    while (x <= sizeChessBoard && document.getElementById(x + "-" + j).innerHTML === key) {
        n++;
        x++;
    }
    if (m == sizeWin || n == sizeWin) return true;
    return false;
}

function DiagonalLeft(CurBox, sizeWin, sizeChessBoard, key) {


    var box = CurBox.split("-");
    var i, j, x, y;
    i = x = parseInt(box[0]);
    j = y = parseInt(box[1]);


    var m = 0;
    var n = 0;

    while (j <= sizeChessBoard && i >= 1 && document.getElementById(i + "-" + j).innerHTML === key) {
        m++;
        i--;
        j++;
    }
    while (y >= 1 && x <= sizeChessBoard && document.getElementById(x + "-" + y).innerHTML === key) {

        n++;
        x++;
        y--;
    }
    if (m == sizeWin || n == sizeWin) return true;
    return false;
}

function DiagonalRight(CurBox, sizeWin, sizeChessBoard, key) {

    var box = CurBox.split("-");
    var i, j, x, y;
    i = x = parseInt(box[0]);
    j = y = parseInt(box[1]);

    var m = 0;
    var n = 0;

    while (j <= sizeChessBoard && i <= sizeChessBoard && document.getElementById(i + "-" + j).innerHTML === key)
    {
        m++;
        i++;
        j++;
    }
    while (y >= 1 && x >= 1 && document.getElementById(x + "-" + y).innerHTML === key)
    {
        n++;
        x--;
        y--;
    }
    if (m == sizeWin || n == sizeWin) return true;
    return false;
}

function preventClickChessBoard() {

    boxes.forEach(box => box.style.pointerEvents = "none");
}

function AllowClickChessBoard() {

    boxes.forEach(box => box.style.pointerEvents = "auto");
}

function playAgain() {

    turnCount = 0;

    for (var i = 0; i < boxes.length; i++) {
        boxes[i].innerHTML = "";
        turnText.innerHTML = "Player 1 (X)";
        turnText.style.fontSize = "initial";
        document.getElementById("btnReset").style.visibility = "hidden";
        AllowClickChessBoard();
        turnText.style.color = "black";
    }

}

// event 
btnStart.addEventListener('click', createChessBoard);
btnReset.addEventListener('click', playAgain);