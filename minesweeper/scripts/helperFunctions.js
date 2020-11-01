/////////////////////////////////////////////////
// Author: Anthony Chapman
// Updated: 10/29/20
/////////////////////////////////////////////////

Array.prototype.contains = function(val){
    for (i=this.length-1;i>=0;i--){
        if (this[i] === val){
            return true;
        } 
    }
    return false;
}
function removePosition (arr, val){
    for (i=arr.length-1;i>=0;i--){
        if (arr[i][0] === val[0] && arr[i][1] === val[1]){
            arr.splice(i, 1);
            return arr;
        } 
    }
}


//returns array of random x,y positions (x,y arrays) within grid boundaries
function getRandomPosition (gridSize){
    function getRandomInt (min, max) {
        return (Math.floor(Math.random() * (max - min) + min));
    }
    const x = getRandomInt (0, gridSize.x)
    const y = getRandomInt (0, gridSize.y)

    return [x,y];
}

function cellExists (position, grid) {
    let exists = false;
    grid.cells.forEach (cell => {
        if (cell.position === position) exists = true;
    })
    return exists;
}

function getWeightColor (weight){
    switch (weight) {
        case 1:
            return "blue";
        case 2:
            return "rgb(1, 77, 0)";
        case 3:
            return "rgb(122, 0, 0)";
        case 4:
            return "rgb(47, 0, 122)";
        case 5:
            return "rgb(1, 77, 0)";
        case 6:
            return "rgb(0, 97, 66)";
        case 7:
            return "rgb(0, 0, 0)";
        case 8:
            return "rgb(92, 92, 92)";
        default: 
            return "black";

    }
}