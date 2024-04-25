// 1.Deposit some money, that user is going to use for the game
// 2. Number of lines to bet on
// 3. Collect bet amount
// 4. Spin the slot machine
// 5. check the user win or not
// 6. Give user their won amount
// 7. Play again

// create a function to collect money
const prompt = require("prompt-sync")();


//varibles to depict how the slot machine is #symbols , val of each symbol
const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    A : 2,
    B : 4,
    C : 6,
    D : 8
}

const SYMBOLS_VALUES = {
    A : 5,
    B : 3,
    C : 1,
    D : 6
}



const deposit = () => {
    while(true){
    const deposit_amt = prompt("Enter the amount you want to deposit: ")
    //convert the deposited value to an integer, cox by defualt an input is of string datatype
    const depositValue = parseFloat(deposit_amt);

    //check if the user input is valid number or not

    if(isNaN(depositValue) || depositValue <= 0){
        console.log("Invalid deposit value ! try again");
    }
    else{
        return depositValue;
    }
}
}

//function to get the user input to find number of lines they want to bet on

const getNumberOfLines = () => {
    while(true){
    const lines = prompt("Enter number of lines you want to bet on(1-3): ")
    const numberOfLines = parseFloat(lines);

    //check if the user input is valid number or not

    if(isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3){
        console.log("Invalid number of lines ! try again");
    }
    else{
        return numberOfLines;
    }
}
}

//Get the user input to know how much they are gonna bet on each line
const getBet = (depositAmt,numberOfLines) => {
    while(true){
    const bet = prompt("Enter the bet per line: ")
    const betAmount = parseFloat(bet);

    if(isNaN(betAmount) || betAmount <= 0 || betAmount > (depositAmt / numberOfLines)  ){
        console.log("Invalid bet amount, enter again!!");
    }
    else{
        return betAmount;
    }
}
}


//spinner
const spin = () => {
    const symbols = [];
    for(const [symbol,count] of Object.entries(SYMBOLS_COUNT)){
        for(let i = 0; i < count; i++){
            symbols.push(symbol);
        }
    } 

    //generate each col values with #elements = #rows
    const reels = []
    for(let i = 0; i < COLS; i++){
        reels.push([]);
        const reelSymbols = [...symbols];
        for(let j = 0; j < ROWS; j++){
        //generate a random index and access the element at that index -> Math.floor(Math.random() * reelSymbols.length)
        const randIndx = Math.floor(Math.random() * reelSymbols.length);
        const selectedsymbol = reelSymbols[randIndx]; 
        reels[i].push(selectedsymbol);
        reelSymbols.splice(randIndx,1);

        }
    } 
    return reels;
}

const transpose = (reels) => {
    const rows = [];
    for(let i = 0;i < ROWS; i++){
        rows.push([]);
        for(let j = 0; j < COLS; j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
}

const printRows = (rows) => {
    for(const row of rows){
        let rowString = "";
        for(const [i,symbol] of row.entries()){
            rowString += symbol;
            if(i != row.length - 1){
                rowString += " | ";
            }
        }
        console.log(rowString);
    }
}

const getWins = (rows,bet,numberOfLines) => {
    let wins = 0;
    for(let row = 0; row < numberOfLines; row++){
        const symbols = rows[row];
        let allSame = true;

        for(const symbol of symbols){
            if(symbol != symbols[0]){
                allSame = false;
                break;
            }
        }

        if(allSame){
            wins += bet * SYMBOLS_VALUES[symbols[0]];
        }
    }
    return wins;
}


const game = () => {
    
    let depositAmt = deposit();
    while(true){
        console.log("Your balance amount $:"+depositAmt);
        const numberOfLines = getNumberOfLines();
        const bet = getBet(depositAmt,numberOfLines);
        depositAmt -= bet * numberOfLines;
        const reels = spin();
        const rows = transpose(reels);

        printRows(rows)

        const wonAmt = getWins(rows,bet,numberOfLines);
        depositAmt += wonAmt;
        console.log("You won , $"+wonAmt.toString());

        if(depositAmt <= 0){
            console.log("Your deposit is $0");
            break;
        }

        const playAgain = prompt("Do you want play again (y/n)?");

        if(playAgain != "y") break;
}
};

game();