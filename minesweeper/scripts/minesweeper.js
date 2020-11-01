/////////////////////////////////////////////////
// Author: Anthony Chapman
// Updated: 10/29/20
/////////////////////////////////////////////////

window.onload = function () {

    const GRID_SIZE_MAX = { 'x': 30, 'y': 20 };
    const GAME_FRAME = document.getElementById("game-frame");
    const CUSTOM_X_SIZE = document.getElementById("grid-size-x-input");
    const CUSTOM_Y_SIZE = document.getElementById("grid-size-y-input");
    const CUSTOM_MINE_NUM = document.getElementById("mine-amount-input");
    const SUBMIT_OPTIONS = document.getElementById("submit-options");
    const GAME_GRID = document.getElementById("game-grid-container");
    const MESSAGE = document.getElementById("message");
    const PRESET_EASY = document.getElementById("preset-easy");
    const PRESET_MEDIUM = document.getElementById("preset-medium");
    const PRESET_HARD = document.getElementById("preset-hard");
    const PRESET_CUSTOM = document.getElementById("preset-custom");

    let settings;
    let max_mines = 0;
    let mines = 0;
    let grid;

    function applyUserSettings() {
        let gridSize;
        let minesNum;
        if (PRESET_EASY.checked) {
            gridSize = {"x" : 10, "y" : 10};
            minesNum = 10;
        }
        else if (PRESET_MEDIUM.checked){
            gridSize = {"x" : 16, "y" : 16};
            minesNum = 40;
        }
        else if (PRESET_HARD.checked){
            gridSize = {"x" : 16, "y" : 30};
            minesNum = 99;
        }
        else if (PRESET_CUSTOM.checked){
            gridSize = {"x" : Math.min(CUSTOM_X_SIZE.value, GRID_SIZE_MAX.x),
                        "y" : Math.min(CUSTOM_Y_SIZE.value, GRID_SIZE_MAX.y)};
            max_mines = gridSize.x * gridSize.y; //there can't be more mines than spaces
            minesNum = Math.min(CUSTOM_MINE_NUM.value, max_mines);
        }
        return {gridSize, minesNum};
    }

    function initializeGrid() {
        //remove all children of grid
        //credit to Gabriel-Mcadams on stackoverflow https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
        while (GAME_GRID.firstChild) {
            GAME_GRID.removeChild(GAME_GRID.firstChild);
        }
        settings = applyUserSettings();
        /*gridSize = {
            "x": Math.min(document.getElementById("grid-size-x-input").value, GRID_SIZE_MAX.x),
            "y": Math.min(document.getElementById("grid-size-y-input").value, GRID_SIZE_MAX.y)
        };*/

        GAME_FRAME.style.width = settings.gridSize.x * 40;
        MESSAGE.textContent = "";

        grid = new Grid(settings.gridSize, settings.minesNum);
    }

    initializeGrid();

    //restart game on submit button
    SUBMIT_OPTIONS.addEventListener('click', function () {
        initializeGrid();
    
    }, false);

}