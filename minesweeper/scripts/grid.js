/////////////////////////////////////////////////
// Author: Anthony Chapman
// Updated: 10/29/20
/////////////////////////////////////////////////

class Grid {
    constructor(gridSize, mines) {
        this.gridSize = gridSize;
        this.mines = mines;
        this.grid = document.getElementById("game-grid-container");
        this.grid.style.gridTemplateColumns = `repeat(${gridSize.x}, 40px)`;
        this.gameStarted = false;
        this.minePositions = [];
        this.cellPositions = []; //positions of all cells (used to initialize mines);

        this.cells = (() => {
            let cells = [];
            for (let y = 0; y < this.gridSize.y; y++)
                for (let x = 0; x < this.gridSize.x; x++) {
                    //sets up grid cell, which contains a button
                    const cell = new Cell(x, y, this);
                    this.cellPositions.push([x,y]);
                    //add button to game grid
                    this.grid.appendChild(cell.cellDiv);
                    //add cell to the grid's cells array
                    cells.push(cell);
                }
            return cells;
        })();
    }

    //sets minePositions array to a list of random x,y positions with no duplicates. Takes an input of spots that should not be used to spawn mines
    initializeMinePositions(dontSpawn=[]){
        let minePositions = []; //index will store mine positions
        let possiblePositions = this.cellPositions; //get all possible positions for mines
        //remove each entry in the dont spawn list from the list of possible positions.
        dontSpawn.forEach(pos => {
            possiblePositions = removePosition(possiblePositions, [pos.x, pos.y]);
        })
        const numMines = Math.min(this.mines, possiblePositions.length);
        for (let i=0; i<numMines; i++){
            let positionIndex = Math.floor(Math.random() * possiblePositions.length);
            minePositions.push(possiblePositions[positionIndex]);

            possiblePositions.splice(positionIndex, 1);
        }
        this.minePositions = minePositions;
    }

    getCell(x, y) {
        let cell = null;
        this.cells.forEach(curCell => {
            if (curCell.position.x === x && curCell.position.y === y) {
                cell = curCell;
            }
        });
        return cell;
    }
    checkWin (){
        //checks if mine positions are all that's left
        let remainingClosedCells = 0;
        this.cells.forEach(cell => {
            remainingClosedCells += (!cell.isOpened);
        })
        if (remainingClosedCells <= this.minePositions.length) {
            this.win();
        }
    }
    win() {
        document.getElementById("message").textContent = "You Win!";
        this.cells.forEach(cell => {
            if (cell.checkForMine()) {
                cell.cellDiv.innerHTML = "";
                cell.cellDiv.style.backgroundImage = cell.mineImage;
            }

        });
    }
    lose() {
        //loop through all cells, reveal mines
        this.cells.forEach(cell => {
            cell.button.removeEventListener('click', cell.onLeftClick);
            if (cell.checkForMine()) {
                cell.cellDiv.innerHTML = "";
                cell.cellDiv.style.backgroundImage = cell.mineImage;
            }
        });
        
        document.getElementById("message").textContent = "You lose!";
    }

}
    