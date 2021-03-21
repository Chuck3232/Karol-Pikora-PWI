import Game from "./Game.js";
import GameLayout from "./GameLayout.js";


let game = new Game();
let gameLayout = new  GameLayout(document.getElementById("app"));


gameLayout.onTileClick = function (i) {
    game.makeMove(i);
    gameLayout.update(game);
};

gameLayout.onRestartClick = function () {
    game = new Game();
    gameLayout.update(game);
};

gameLayout.update(game);