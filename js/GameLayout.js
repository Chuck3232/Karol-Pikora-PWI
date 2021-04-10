export default class GameLayout {
    constructor(root) {
        this.root = root;
        this.taken=new Array(9).fill(-1);
        this.root.innerHTML = `
            <div class="header">
                <div class="turn"></div>
                <div class="status"></div>               
                <div>AI</div>
                <input type="radio" class="radio" id="yes" name="status" value="yes" >
                <label for="yes">ON</label><br>
                
                
            </div>
            <div class="board">
                <div class="board__tile" data-index="0"></div>
                <div class="board__tile" data-index="1"></div>
                <div class="board__tile" data-index="2"></div>
                <div class="board__tile" data-index="3"></div>
                <div class="board__tile" data-index="4"></div>
                <div class="board__tile" data-index="5"></div>
                <div class="board__tile" data-index="6"></div>
                <div class="board__tile" data-index="7"></div>
                <div class="board__tile" data-index="8"></div>
            </div>
            <button type="button" class="restart">
                   Restart
                </button>
        `;

        this.onTileClick = undefined;
        this.onRestartClick = undefined;       
    this.root.querySelectorAll(".board__tile").forEach(tile => {
            tile.addEventListener("click", () => {
                if (this.onTileClick) {               
                    this.onTileClick(tile.dataset.index);
                    
                    this.taken[tile.dataset.index]=parseInt(tile.dataset.index);
                    console.log(tile.dataset.index);
                    var radios = document.getElementsByName('status');
                    
                    if(radios[0].checked && this.taken.includes(-1)){                      
                        let i = Math.floor(Math.random()*9);                       
                        while(this.taken.includes(i))
                        {
                            i = Math.floor(Math.random()*9);
                        }
                        this.taken[i]=i;                        
                        this.onTileClick(i);   
                                    
                    }                           
                }
            });
        });
        function deselectableRadios(rootElement) {
            if(!rootElement) rootElement = document;
            if(!window.radioChecked) window.radioChecked = null;
            window.radioClick = function(e) {
              const obj = e.target;
              if(e.keyCode) return obj.checked = e.keyCode!=32;
              obj.checked = window.radioChecked != obj;
              window.radioChecked = obj.checked ? obj : null;
            }
            rootElement.querySelectorAll("input[type='radio']").forEach( radio => {
              radio.setAttribute("onclick", "radioClick(event)");
              radio.setAttribute("onkeyup", "radioClick(event)");
            });
          }
          
          deselectableRadios();
          
        

        this.root.querySelector(".restart").addEventListener("click", () => {
            if (this.onRestartClick) {
                this.onRestartClick();
                this.taken=new Array(9).fill(-1);
            }
        });

        this.root.querySelectorAll('input[type=radio][name="status"]').forEach(radio => radio.addEventListener('change', () =>  {
            
                this.onRestartClick();
                this.taken=new Array(9).fill(-1);
            
        }));
       
    }
    
  
    update(game) {
        this.updateTurn(game);
        this.updateStatus(game);
        this.updateBoard(game);
    }

    updateTurn(game) {
        this.root.querySelector(".turn").textContent = `Tura: ${game.turn}`;
    }

    updateStatus(game) {
        let status = "W trakcie...";

        if (game.findWinCombo()) {
            status = `${game.turn} Wygrał!`;
        } else if (!game.isInProgress()) {
            status = "Remis ;/";
        }

        this.root.querySelector(".status").textContent = status;
    }

    updateBoard(game) {
        const winningCombination = game.findWinCombo();

        for (let i = 0; i < game.board.length; i++) {
            const tile = this.root.querySelector(`.board__tile[data-index="${i}"]`);

            tile.classList.remove("board__tile--winner");
            tile.textContent = game.board[i];


            if (winningCombination && winningCombination.includes(i)) {
                tile.classList.add("board__tile--winner");
            }
        }
    }
}