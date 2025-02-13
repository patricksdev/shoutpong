// var client = new Colyseus.Client("ws://localhost:2567");

// const form = document.querySelector("#form");
// const gamearea = document.querySelector("#gamearea");
// const codeLabel = document.querySelector("#gamecode-label");

// const username = document.querySelector("#username");
// const gamecode = document.querySelector("#gamecode");

// const createGameBtn = document.querySelector("#create");
// const joinGameBtn = document.querySelector("#join");

// createGameBtn.addEventListener("click", () => {
//     validateInputs();
//     createNewGame();
// });
// joinGameBtn.addEventListener("click", () => {
//     validateInputs(true);
//     joinExistingGame();
// });

// function validateInputs(codeNeeded = false) {
//     if (
//         (username.value && !codeNeeded) ||
//         (codeNeeded && gamecode.value && username.value)
//     ) {
//         return true;
//     } else {
//         return false;
//     }
// }

// function prepareGameArea() {
//     form.style.display = "none";
//     gamearea.style.display = "block";
// }

// function createNewGame() {
//     client
//         .joinOrCreate("my_room", {
//             name: username.value,
//         })
//         .then((room) => {
//             prepareGameArea();
//             codeLabel.textContent += room.id;
//         })
//         .catch((e) => console.log(e));
// }

// function joinExistingGame() {
//     client
//         .joinById(gamecode.value, {
//             name: username.value,
//         })
//         .then((room) => {
//             prepareGameArea();
//             codeLabel.textContent += room.id;
//         })
//         .catch((e) => console.log(e));
// }

const script = document.createElement("script");
script.src = "https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.min.js";
document.head.appendChild(script);

script.onload = async function () {
    console.log("Tone.js loaded!");

    // Get microphone input
    const mic = new Tone.UserMedia();
    await mic.open();

    // FFT (Fast Fourier Transform) to analyze frequencies
    const fft = new Tone.FFT(2048);

    mic.connect(fft);

    function analyzeAudio() {
        const values = fft.getValue(); // Get frequency spectrum data
        const maxIndex = values.indexOf(Math.max(...values)); // Find peak frequency
        const sampleRate = Tone.context.sampleRate;
        const dominantFrequency = maxIndex * (sampleRate / fft.size);

        console.log(Tone.context.sampleRate);

        if (dominantFrequency > 1000) {
            console.log("🎵 High-pitched sound detected!");
        } else if (dominantFrequency > 100) {
            console.log("🎵 Low-pitched sound detected!");
        }

        requestAnimationFrame(analyzeAudio);
    }

    analyzeAudio();
};
