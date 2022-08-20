document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function () {
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        });
    };

    document.getElementById("answer-box").addEventListener("keydown", function (event) {
        if (event.key === "Enter")
            checkAnswer();
    })

    runGame("addition");

})



/**
 * the main game "loop", called when the script is first loaded
 * and after the user's answer has been processed
 */
function runGame(gameType) {

    document.getElementById("answer-box").value = "";
    document.getElementById("answer-box").focus();

    // Creates two random numbers between 1 and 25
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    } else if (gameType === "subtract") {
        displaySubtractQuestion(num1, num2);
    } else if (gameType === "multiply") {
        displayMultiplyQuestion(num1, num2);
    } else if (gameType === "division") {
        displayDivideQuestion(num1, num2);
        alert("The division game only accepts integers, so the number will be rounded up")
    } else {
        alert(`Unkwon Game Type: ${gameType}`);
        throw `Unkwon Game Type: ${gameType}. Aborting!`;
    };
}

/**
 * Checks the answer agaisnt the first element in
 * the returned calculateCorrectAnswer array
 */
function checkAnswer() {
    let userAnswer = document.getElementById("answer-box").value;
    let calculatedAnswer = calculateCorrectAnswer();
    let testAnswer = userAnswer === calculatedAnswer[0];

    if (testAnswer) {
        incrementScore();
        alert("You got it right!! :D");
    } else {
        incrementWrongAnswer();
        alert(`Awwww...your answer was ${userAnswer}, but the correct answer was ${calculatedAnswer[0]}.`);
    }

    runGame(calculatedAnswer[1]);
    let clearBox = parseInt(document.getElementById("answer-box"))
    clearBox.value = "0"

}

/**
 * Get the operand1, operand2 and operator from the DOM 
 * and execute the correct operation 
 */
function calculateCorrectAnswer() {
    let operand1 = parseInt(document.getElementById("operand1").innerText);
    let operand2 = parseInt(document.getElementById("operand2").innerText);
    let operator = document.getElementById("operator").innerText;

    if (operator === "+") {
        return [operand1 + operand2, "addition"];
    } else if (operator === "-") {
        return [operand1 - operand2, "subtract"];
    } else if (operator === "x") {
        return [operand1 * operand2, "multiply"];
    } else if (operator === "/") {
        return [(operand1 / operand2).toFixed(0), "division"];
    } else {
        alert(`Unfineshed Operation: ${operator}`);
        throw `Unfineshed Operation: ${operator}. Aborting!`;
    }
}

/**
 * Add one score to the correct answer score field
 */

function incrementScore() {
    let rightScore = parseInt(document.getElementById("correct").innerText);
    document.getElementById("correct").innerText = ++rightScore;

}

/**
 * Add one score to the incorrect answer score field
 */
function incrementWrongAnswer() {
    let wrongScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++wrongScore;
}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "+";

}

function displaySubtractQuestion(operand1, operand2) {
    /**
     * I have decided to let the game show negative results
     * But, if needed I could have run this code
     * document.getElementById("operand1").textContent = operand1 > operand2 ? operand1 : operand2 "If Operand 1 is greater than operand 2 return operand 1, else 2"
     * document.getElementById("operand2").textContent = operand1 > operand2 ? operand2 : operand1 "If Operand 1 is greater than operand 2 return operand 2, else 1"
     * this code will only give questions that doesn't have any negative answer. Like the result being -2, -3...which I don't think it is a problem.
     */
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "-";
}

function displayMultiplyQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "x";
}

function displayDivideQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById("operand2").textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById("operator").textContent = "/";
}