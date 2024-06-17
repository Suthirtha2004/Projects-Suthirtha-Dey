let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset");
let newbtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turns = true;
let count = 0;
const winpattern = [
    [0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7], [2, 5, 8], [3, 4, 5], [6, 7, 8]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("Box is clicked");
        if (turns) {
            box.innerText = "O";
            turns = false;
        } else {
            box.innerText = "X";
            turns = true;
        }
        box.disabled = true;
        count++;
        draw();
        if (!checkWinner() && count === 9) {
            draw();
        }
    });
});

const enableboxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
    count = 0; // Reset count when enabling boxes
};

const disableboxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, the winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableboxes();
};

const checkWinner = () => {
    for (let pattern of winpattern) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                console.log("Winner", pos1);
                showWinner(pos1);
                return true;
            }
        }
    }
    return false;
};

const resetGame = () => {
    turns = true;
    enableboxes();
    msgContainer.classList.add("hide");
};

const draw = () => {
    if (count === 9) {
        msg.innerText = `It's a draw`;
        msgContainer.classList.remove("hide");
        disableboxes();
    }
};

newbtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);
