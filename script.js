
class Game
{
    #gameBoard;
    #player1;
    #player2;
    #turn;
    constructor(player1Name, player2Name)
    {   
        this.#gameBoard = new GameBoard();
        this.#player1 = new Player(player1Name, "X");
        this.#player2 = new Player(player2Name, "O");
        this.#turn = true;
        this.#updateScoreBoard(this.#player1.getWins(), this.#player2.getWins(), Player.getDrawCounter(), this.getTurn());
    }


    getTurn()
    {
        return this.#turn;
    }

    changeTurn()
    {
        if(this.#turn)
        {
            this.#turn = false;
        }
        else{
            this.#turn = true;
        }
    }

    setTurn(value)
    {
        this.#turn = value;
    }

    turn(element)
    {
        let coordinates = this.#getCoordinates(element)
        if(this.#gameBoard.getCell(coordinates) == "")
        {
            if(this.getTurn())
            {
                this.#gameBoard.updateBoard(this.#player1.getSign(), coordinates)
                this.#gameBoard.displayBoard(element, this.#player1.getSign());
            }
            else
            {
                this.#gameBoard.updateBoard(this.#player2.getSign(), coordinates)
                this.#gameBoard.displayBoard(element, this.#player2.getSign());
            }
            if(this.#gameBoard.checkWin())
            {   
                if(this.getTurn())
                {
                    console.log("Player 1 Wins");
                    this.#player1.incrementWins(); 
                }
                else
                {
                    console.log("Player 2 Wins")
                    this.#player2.incrementWins();
                }
                this.#gameBoard.clearBoard();
                this.#gameBoard.clearDisplay()
                this.#updateScoreBoard(this.#player1.getWins(), this.#player2.getWins(), Player.getDrawCounter(), this.getTurn());
            }
            else if(this.#gameBoard.checkDraw())
            {
                console.log("Game Drawn")
                this.#gameBoard.clearBoard();
                this.#gameBoard.clearDisplay();
                Player.incrementDrawCounter();
                this.#updateScoreBoard(this.#player1.getWins(), this.#player2.getWins(), Player.getDrawCounter(), this.getTurn());
            }
            this.changeTurn();    
            this.#updateScoreBoard(this.#player1.getWins(), this.#player2.getWins(), Player.getDrawCounter(), this.getTurn());
            
        }        
    }

    restartGame()
    {
        this.#gameBoard.clearBoard();
        this.#gameBoard.clearDisplay();
        this.#updateScoreBoard(0, 0, 0, true);
        this.setTurn(true)
    }

    #getCoordinates(element)
    {
        if(element == document.querySelector("#topLeft"))
        {
            return [0,0];
        }

        if(element == document.querySelector("#topCentre"))
        {
            return [0,1];
        }
        if(element == document.querySelector("#topRight"))
        {
            return [0,2];
        }
        if(element == document.querySelector("#centreLeft"))
        {
            return [1,0];
        }
        if(element == document.querySelector("#centre"))
        {
            return [1,1];
        }
        if(element == document.querySelector("#centreRight"))
        {
            return [1,2];
        }
        if(element == document.querySelector("#bottomLeft"))
        {
            return [2,0];
        }
        if(element == document.querySelector("#bottomCentre"))
        {
            return [2,1];
        }
        if(element == document.querySelector("#bottomRight"))
        {
            return [2,2];
        }
    }

    #updateScoreBoard(score1, score2, draws, turn)
    {
        let scoreBoard = document.querySelector("#scoreContainer");
        scoreBoard.children[0].textContent = this.#player1.getName() + "'s Score: " + score1;
        scoreBoard.children[1].textContent = this.#player2.getName() + "'s Score: " + score2;
        scoreBoard.children[2].textContent = "Draws: " + draws;
        if(turn)
        {
            scoreBoard.children[3].textContent = this.#player1.getName() + "'s Turn";
        }
        else
        {
            scoreBoard.children[3].textContent = this.#player2.getName() + "'s Turn";
        }
    }
}

class GameBoard
{
    #gameBoard;
    constructor()
    {
        this.#gameBoard = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ];
    }

    updateBoard(sign, coordinates)
    {
        for(let i = 0; i < this.#gameBoard.length; i++)
        {
            for(let j = 0; j < this.#gameBoard[i].length; j++)
            {
                if(i == coordinates[0] && j == coordinates[1])
                {
                    this.#gameBoard[i][j] = sign;
                }
            }
        }
    }

    clearBoard()
    {
        for(let i = 0; i < this.#gameBoard.length; i++)
        {
            for(let j = 0; j < this.#gameBoard[i].length; j++)
            {
                this.#gameBoard[i][j] = "";
            }
        }
    }

    clearDisplay()
    {
        let board = document.querySelector("#board");
        for(let i = 0; i < board.children.length; i++)
        {
            board.children[i].textContent = "";
        }
    }

    displayBoard(element, sign)
    {
        element.textContent = sign;
    }

    getBoard()
    {
        return this.#gameBoard;
    }

    getCell(coordinates)
    {
        return this.#gameBoard[coordinates[0]][coordinates[1]];
    }

    checkWin()
    {
        if(this.#checkRows())
        {
            return true;
        }
        else if(this.#checkColumns())
        {
            return true
        }
        else if(this.#checkDiagonals())
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    #checkRows()
    {
        let values = new Set();
        for(let i = 0; i < this.#gameBoard.length; i++)
        {
            values.clear();
            for(let j = 0; j < this.#gameBoard[i].length; j++)
            {
                values.add(this.#gameBoard[i][j])
            }
            //console.log(values);
            //console.log(values.size);
            if(values.size == 1 && !values.has(""))
            {
                return true;
            }
        }
        return false;
    }

    #checkColumns()
    {
        let values = new Set();
        for(let i = 0; i < this.#gameBoard.length; i++)
        {
            values.clear();
            for(let j = 0; j < this.#gameBoard[i].length; j++)
            {
                values.add(this.#gameBoard[j][i])
            }
            //console.log(values);
            //console.log(values.size);
            if(values.size == 1 && !values.has(""))
            {
                return true;
            }
        }
        return false;
    }

    #checkDiagonals()
    {
        let values = new Set();
        for(let i = 0; i < this.#gameBoard.length; i++)
        {
            //console.log(this.#gameBoard[i][i]);
            values.add(this.#gameBoard[i][i]);
        }
        if(values.size == 1 && !values.has(""))
        {
            return true;
        }
        values.clear();
        for(let i = 0; i < this.#gameBoard.length; i++)
        {
            //console.log(this.#gameBoard[i][(this.#gameBoard.length - 1) - i]);
            values.add(this.#gameBoard[i][(this.#gameBoard.length - 1) - i]);
        }
        if(values.size == 1 && !values.has(""))
        {
            return true;
        }
        return false;
    }

    checkDraw()
    {
        for(let i = 0; i < this.#gameBoard.length; i++)
        {
            for(let j = 0; j < this.#gameBoard[i].length; j++)
            {
                if(this.#gameBoard[i][j] == "")
                {
                    return false
                }
            }
        }
        return true;
    }
}

class Player
{   
    #name
    #sign
    #wins
    static #drawCounter = 0;
    constructor(name, sign)
    {
        this.#name = name;
        this.#sign = sign;
        this.#wins = 0;
    }

    getName()
    {
        return this.#name
    }

    getSign()
    {
        return this.#sign;
    }

    getWins()
    {
        return this.#wins;
    }

    incrementWins()
    {
        this.#wins++;
    }

    static incrementDrawCounter()
    {
        this.#drawCounter++;
    }

    static getDrawCounter()
    {
        return this.#drawCounter;
    }
}

let game = null;
function getPlayerNames()
{
    let dialog = document.querySelector("#playerNamesDialog");
    dialog.showModal();
    let form = document.querySelector("#playerNameForm");
    let player1Name;
    let player2Name;
    form.addEventListener("submit", () => {
        player1Name = document.querySelector("#player1Name").value;
        player2Name = document.querySelector("#player2Name").value;
        dialog.close();
        game = new Game(player1Name, player2Name);
    });

}

