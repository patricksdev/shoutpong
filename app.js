const form = document.querySelector("#form");
const gamearea = document.querySelector("#gamearea");
const codeLabel = document.querySelector("#gamecode-label");

const username = document.querySelector("#username");
const gamecode = document.querySelector("#gamecode");

const createGameBtn = document.querySelector("#create");
const joinGameBtn = document.querySelector("#join");

createGameBtn.addEventListener("click", () => {
    validateInputs();
    createNewGame();
});
joinGameBtn.addEventListener("click", () => {
    validateInputs(true);
    joinExistingGame();
});

// Colyseus Client
var client = new Colyseus.Client("ws://localhost:2567");
var room;

function validateInputs(codeNeeded = false) {
    if (
        (username.value && !codeNeeded) ||
        (codeNeeded && gamecode.value && username.value)
    ) {
        return true;
    } else {
        return false;
    }
}

function prepareGameArea(roomId) {
    form.style.display = "none";
    gamearea.style.display = "block";
    codeLabel.textContent += roomId;
}

function analyzeMic() {}

function createNewGame() {
    room = client
        .joinOrCreate("my_room", {
            name: username.value,
        })
        .then((room) => {
            prepareGameArea(room.id);
        })
        .catch((e) => console.log(e));
}

function joinExistingGame() {
    room = client
        .joinById(gamecode.value, {
            name: username.value,
        })
        .then((room) => {
            prepareGameArea(room.id);
        })
        .catch((e) => console.log(e));
}

function colyseusEventHandling() {
    room.onMessage("start");
}
