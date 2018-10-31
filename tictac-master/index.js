/**
 * This program is a boliler plate code for the famous tic tac toe game
 * Here box represents one placeholder for either X or a 0
 * We have a 2D array to represent the arrangement of X or O is a grid
 * 0 -> empty box
 * 1 -> box with X
 * 2 -> box with O
 * 
 * Below are the tasks which needs to be completed
 * Imagine you are playing with Computer so every alternate move should be by Computer
 * X -> player
 * O -> Computer
 * 
 * Winner has to be decided and has to be flashed
 * 
 * Extra points will be given for the Creativity
 * 
 * Use of Google is not encouraged
 * 
 */
const grid = [];
const GRID_LENGTH = 5;
let turn = 'X';

var player = 1 
// X -> 1 -> computer
// O -> 2 -> player
// 3 -> tie
random_range = GRID_LENGTH-1

var total_move = 0
// If finished counter is equal to 9 then game is finished

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function initializeGrid() {

    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }

    player = prompt("Who is going to play first Computer(1)/Player(2)");
    if (player==1){
        list1 = getComputerPosition()
        x = list1[0]
        y = list1[1]

        grid[x][y] = 1
        player = 0    
        renderMainGrid();   
        addClickHandlers();
        total_move = total_move + 1
        player = 0
        console.log("next chance ",player)
    }
}

function getComputerPosition () {
    check = true
    while(check){
        x = getRandomInt(0,random_range)
        y = getRandomInt(0,random_range)
        console.log("x,y is ",x,y)
        if (!grid[x][y]){
            check = false
        }
    }

    return [x, y]
}

function getRowBoxes(colIdx) {
    let rowDivs = '';

    
    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {

        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function checkWinner(){
    ties  = false

    //Checking rowwise 
    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        flag = true
        winner = grid[0][rowIdx]
        for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++){
            if (grid[colIdx][rowIdx] != winner){
                flag = false
                break
            }
        }
        if (flag ){
            // heiglight_colour(rowIdx)
            if (winner!=0){
                for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++){
                    query_selector = document.querySelector('div[rowidx="'+rowIdx.toString()+'"][colidx="'+colIdx.toString()+'"');
                    query_selector.classList.add('winnerColor')
                    console.log("query_selector r",query_selector)
                }
            }
            return winner
        }
    }

    //Checking column wise 
    for(let colIdx=0; colIdx < GRID_LENGTH ; colIdx++ ) {
        flag = true
        winner = grid[colIdx][0]
        for(let rowIdx=0; rowIdx < GRID_LENGTH; rowIdx++){
            if (grid[colIdx][rowIdx] != winner){
                flag = false
                break
            }
        }
        if (flag){
            if (winner!=0){
                for(let rowIdx=0; rowIdx < GRID_LENGTH; rowIdx++){
                    query_selector = document.querySelector('div[rowidx="'+rowIdx.toString()+'"][colidx="'+colIdx.toString()+'"');
                    query_selector.classList.add('winnerColor')
                    console.log("query_selector c",query_selector)
                }
            }
            return winner
        }
    }

    // Checking Diagonals
    winner = grid[0][0]
    diagonal = true
    for (let i = 0; i < GRID_LENGTH;i++) {  
        if (grid[i][i]!=winner){
            diagonal = false
            break
        }
    }

    if (diagonal){
        if (winner!=0){
            for (let i = 0; i < GRID_LENGTH;i++) {  
                query_selector = document.querySelector('div[rowidx="'+i.toString()+'"][colidx="'+i.toString()+'"');
                query_selector.classList.add('winnerColor')
            }
        }
        return winner
    }

    col = GRID_LENGTH-1
    row = 0
    winner = grid[col][row]
    diagonal = true
    for (let i = 0; i < GRID_LENGTH;i++) {
        if (grid[col][row]!=winner){
            diagonal = false
            break
        }
        row= row + 1
        col = col -1
    }

    if (diagonal){
        if (winner!=0){
            col = GRID_LENGTH-1
            row = 0
            for (let i = 0; i < GRID_LENGTH;i++) {  
                query_selector = document.querySelector('div[rowidx="'+row.toString()+'"][colidx="'+col.toString()+'"');
                query_selector.classList.add('winnerColor')
                row= row + 1
                col = col -1
            }
        }
        return winner
    }

    console.log("winner --- ",winner,total_move,GRID_LENGTH*GRID_LENGTH)
    if (total_move==GRID_LENGTH*GRID_LENGTH){
        return 3
    }
}

function computer_turn(argument) {
    list1 = getComputerPosition()
    x = list1[0]
    y = list1[1]
    grid[x][y] = 1
    renderMainGrid();
    addClickHandlers();
}

function onBoxClick() {
    
    //Computer turn
    if (player==1){
        computer_turn()
        total_move = total_move + 1
        player = 0    
    }
    else{
        var rowIdx = this.getAttribute("rowIdx");
        var colIdx = this.getAttribute("colIdx");
        //0->computer,2->player
        if (grid[colIdx][rowIdx]==0){
            grid[colIdx][rowIdx] = 2;
            renderMainGrid();
            addClickHandlers();
            total_move = total_move + 1
            
            console.log("total_move ",total_move)
            if (total_move<GRID_LENGTH*GRID_LENGTH){
                computer_turn()     
                total_move = total_move + 1           
            }
            
            if (!player){
                console.log("next is computer chance")            
            }
            else{
                console.log("next is player chance")            
            }

            winner = checkWinner()
            if (winner==1){
                alert("You Lose!!")
                // if(!alert('Game Over!! app will be reloaded')){window.location.reload();}
            }
            else if (winner==2){
                alert("You Won!!")
                // if(!alert('Game Over!! app will be reloaded')){window.location.reload();}
            }
            else if (winner==3){
                alert("Tie!!")
                // if(!alert('Game Over!! app will be reloaded')){window.location.reload();}
            }

        }
    }



}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}

initializeGrid();
renderMainGrid();
addClickHandlers();
