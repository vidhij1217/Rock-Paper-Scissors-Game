let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
let msg = document.querySelector("#msg");
let userScoreBoard = document.querySelector("#user-score");
let compScoreBoard = document.querySelector("#comp-score");

const drawMessages = [
    (userChoice) => `You both chose ${capitalize(userChoice)}! It's a tie 🤝`,
    () => "Great minds think alike! It's a draw😅",
    () => "😐No winners this time, same picks!",
    () => "Deadlock! No one gets the point😐",
    () => "Balance achieved. It's a draw⚖️"
];

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const drawGame = (userChoice) => {
    const randomIndex = Math.floor(Math.random() * drawMessages.length);
    const message = drawMessages[randomIndex](userChoice); 
    msg.innerText = message;
    msg.className = "draw-msg";
};

const showResult = (userWin, userChoice, compChoice) => {
    if(userWin){
        console.log("You Win!");
        userScore++;
        userScoreBoard.innerText = userScore;
        msg.className = "win-msg";

        if (userChoice === "rock" && compChoice === "scissors") {
            msg.innerText = "🎯You Win! Rock smashes Scissors.";
        } else if (userChoice === "paper" && compChoice === "rock") {
            msg.innerText = "🔥You Win! Paper covers Rock.";
        } else if (userChoice === "scissors" && compChoice === "paper") {
            msg.innerText = "⚡You Win! Scissors cut Paper.";
        }
    }else{
        console.log("You Lose");
        compScore++;
        compScoreBoard.innerText = compScore;
        msg.className = "lose-msg";

        if (userChoice === "rock" && compChoice === "paper") {
            msg.innerText = "💔You Lose! Paper covers Rock.";
        } else if (userChoice === "paper" && compChoice === "scissors") {
            msg.innerText = "📉You Lose! Scissors cut Paper.";
        } else if (userChoice === "scissors" && compChoice === "rock") {
            msg.innerText = "😶‍🌫️You Lose! Rock smashes Scissors.";
        }
    }
};

const getCompChoice = () => {
    const options = ["rock", "paper", "scissors"];
    const rdmIdx = Math.floor(Math.random() * 3);
    return options[rdmIdx];
};

const playGame = (userChoice) => {
    console.log("User choice is : ", userChoice);
    const compChoice = getCompChoice();
    console.log("Computer choice is : ", compChoice);

    if(userChoice === compChoice){
        //Draw Game
        drawGame(userChoice);
    }else{
        let userWin = true;
        if(userChoice === "rock"){
            //either scissors or paper
            userWin = compChoice === "paper" ? false : true;
        }else if(userChoice === "paper"){
            //either scissors or rock
            userWin = compChoice === "scissors" ? false : true;
        }else{
            //either rock or paper
            userWin = compChoice === "rock" ? false : true;
        }
        showResult(userWin, userChoice, compChoice);
    }
};

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});