
const buttonColors = ["red", "green", "blue", "yellow"];

let gamePattern = [];

let userClickedPattern = [];

let level = 0;

function nextSequence() {

    let randomNumber = Math.floor(Math.random() * 4);

    let randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $(`#${randomChosenColor}`).css("opacity", 0.5);
    playSound(`${randomChosenColor}`);

    setTimeout(function () {
        $(`#${randomChosenColor}`).css("opacity", 1);
    },300);

    // Increment the level after nextsequence is called
    level++;
    $('#level-title').text(`Level ${level}`);
}


function playSound(name) {
    let audio = new Audio (`sounds/${name}.mp3`);
    audio.play();
}


function animatePress(currentColor) {
    $(`#${currentColor}`).addClass("pressed");

    setTimeout(() => {
        $(`#${currentColor}`).removeClass("pressed");
    },100);
}

// Bind click event once for all buttons
$(".btn").on("click", function () {
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
});

let firstKeyPress = true;

$(document).on("keydown", function () {
    if(firstKeyPress == true) {
        firstKeyPress = false;
        nextSequence();
    }
    $('#level-title').text(`Level ${level}`);
});


function checkAnswer(currentLevel) {
    
}