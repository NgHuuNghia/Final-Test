var nRows = 100;
var mColumns = 26;
var matrix = [];

var headerElement;
var gridMain;
const header = document.querySelector('.headers');
const topOfHeader = header.offsetTop;

const buttonCreate = document.querySelector('#btnCreate');
const buttonRefesh = document.querySelector('#btnRefesh');



function createGrid() {

    for (let i = 0; i < mColumns; i++) {
        matrix.push([]);
        var column = document.createElement('div');
        column.className = 'columns';
        column.id = i;
        gridMain.appendChild(column);

        var currentColumn = document.getElementById(`${i}`);

        for (let j = 0; j < nRows; j++) {

            var row = document.createElement('div');
            row.className = 'rows';
            row.id = `${i}-${j}`;
            var value = randomInt(0, 1000);
            row.textContent = value;
            matrix[i].push(value);
            currentColumn.appendChild(row);
        }

    }

}

function createHeader() {
    for (let i = 1; i <= mColumns; i++) {
        var column = document.createElement('div');
        column.className = 'header';
        column.id = 'h-' + i;
        column.textContent = i;
        header.appendChild(column);
    }
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

//function 
function sortGrid() {

    var columnId = parseInt(this.textContent) - 1;

    // tạo mảng index để lưu lại vị trí hoán đổi của mảng current
    var tempMatrix = Array.from(matrix[columnId]);
    var tempIndex = [];
    matrix[columnId].sort((a, b) => a - b);

    for (var ele of matrix[columnId]) {
        tempIndex.push(tempMatrix.indexOf(ele));
    }


    // hoán các mảng khác
    for (var i = 0; i < matrix.length; i++) {
        if (i !== columnId) {
            var tempMatrixCol = Array.from(matrix[i]);
            for (var j = 0; j < matrix[i].length; j++) {
                matrix[i][j] = tempMatrixCol[tempIndex[j]];
            }

        }

    }


    // load grid
    //load column select

    var columns = document.getElementById(`${columnId}`);
    var rows = columns.querySelectorAll('.rows');
    var index = 0;
    rows.forEach((row) => {
        row.textContent = matrix[columnId][index];
        index++;
    });
    // load all column another
    var columnsAnother = gridMain.querySelectorAll('.columns');
    columnsAnother.forEach(column => {
        var idCol = column.getAttribute('id');
        var rowsCur = column.querySelectorAll('.rows');
        var indexRow = 0;
        rowsCur.forEach(row => {
            row.textContent = matrix[idCol][indexRow];
            indexRow++;
        });
    });

}

function start() {

    nRows = parseInt(document.getElementById("rowInput").value);
    mColumns = parseInt(document.getElementById("columnInput").value);

    //set size css row
    document.documentElement.style.setProperty('--column', mColumns);
    
    gridMain = document.querySelector('.container');
    

    createHeader();
    createGrid();

    headerElement = document.querySelectorAll('.header');
    headerElement.forEach(header => {
        header.addEventListener('click', sortGrid);
    });


}

function fixNav(){

    if(window.scrollY >= topOfHeader){
        document.body.classList.add('fixed-nav');
    }
    else{
        document.body.classList.remove('fixed-nav');
    }
}

//event handle

buttonCreate.addEventListener('click', start);
buttonRefesh.addEventListener('click', function(){
    location.reload();
});
window.addEventListener('scroll',fixNav);