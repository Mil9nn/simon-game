
const buttonColors = ["red", "green", "blue", "yellow"];

let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let firstKeyPress = true;

// Function to generate the next sequence
function nextSequence() {
    // Reset user pattern for this level
    userClickedPattern = [];

    // Increment the level
    level++;
    $('#level-title').text(`Level ${level}`);

    // Generate a random color and add to game pattern
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    // Animate and play sound for the chosen color
    $(`#${randomChosenColor}`).css("opacity", 0.5);
    playSound(randomChosenColor);
    setTimeout(function () {
        $(`#${randomChosenColor}`).css("opacity", 1);
    }, 300);
}

// Function to play sound
function playSound(name) {
    let audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

// Function to animate user press
function animatePress(currentColor) {
    $(`#${currentColor}`).addClass("pressed");
    setTimeout(() => {
        $(`#${currentColor}`).removeClass("pressed");
    }, 100);
}

// Function to check user's answer
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
            console.log("Level Complete!");
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
        playSound(`wrong`);

        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200)
        startOver();
    }
}

// Restart the game on wrong answer
function startOver() {
    console.log("Game Over! Restarting...");
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    firstKeyPress = true;
    $("#level-title").text("Game Over, Press Any Key to Restart");
}

// Bind click event to all buttons
$(".btn").on("click", function () {
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
});

// Start the game on keydown
$(document).on("keydown", function () {
    if (firstKeyPress) {
        firstKeyPress = false;
        nextSequence();
    }
});
