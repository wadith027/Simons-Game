var buttonColours = ["red", "blue", "green", "yellow"]
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var currentLevel = 0;
var gameStartedStatus = false; 

$(document).keypress(function () { 
    if(!gameStartedStatus){
        nextSequence();
    }
    gameStartedStatus = true;
    
});
$(document).dblclick(function () { 
    if(!gameStartedStatus){
        nextSequence();
    }
    gameStartedStatus = true;
    
});
function nextSequence(){
    level = level + 1;
    currentLevel = 0;
    userClickedPattern = [];
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 87683434) % 4 ;
    var randomChosenColour = buttonColours[randomNumber];
    makeAnimation(randomChosenColour);
    playSound(randomChosenColour);
    gamePattern.push(randomChosenColour);
}

$(".btn").click(function () { 
    
    var userChosenColor = $(this).attr("id");
    // makeAnimation(userChosenColor);
    playSound(userChosenColor);
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer2(currentLevel);    
    currentLevel++;
    console.log("user =" +userClickedPattern);
    console.log("game = " + gamePattern);
    console.log(currentLevel, " ", level);
     if(currentLevel === level){
        window.setTimeout(function(){
            nextSequence();
        },500);
        // userClickedPattern = [];
    }

});
function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
  
 
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
function checkAnswer2(checkColor) {
    if(gamePattern[checkColor] === userClickedPattern[checkColor] )
        {
            console.log("correct");
        }
        
        
     
    else{
        console.log("wrong")        
        level = 0;
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        window.setTimeout(function() {
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key or Double Key to Restart");
        gameStartedStatus = false;
        gamePattern = [];
        currentLevel = 0;
       
    }
   // currentLevel = 0;
    //  userClickedPattern = [];   
}
// function checkAnswer(checkColor) {
//     if(arraysEqual(gamePattern,userClickedPattern)){
//         console.log("correct")
//         window.setTimeout(function(){
//             nextSequence();
//         },500);
        
//     } 
//     else{
//         console.log("wrong")        
//         level = 0;
//         var audio = new Audio("sounds/wrong.mp3");
//         audio.play();
//         $("body").addClass("game-over");
//         window.setTimeout(function() {
//             $("body").removeClass("game-over");
//         },200);
//         $("#level-title").text("Game Over, Press Any Key to Restart");
//         gameStartedStatus = false;
//         gamePattern = [];
//     }
//     currentLevel = 0;
//     userClickedPattern = [];   
// }

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    window.setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    },100);
}





function makeAnimation(key) {
    $("#" + key).fadeOut(200).fadeIn(200);
}
function playSound(key){
    switch (key) {
        case "blue":
            var audio =  new Audio("sounds/blue.mp3");
            audio.play();
            break;
        case "green":
            var audio =  new Audio("sounds/green.mp3");
            audio.play();
            break;
        case "red":
            var audio =  new Audio("sounds/red.mp3");
            audio.play();
            break;
        case "yellow":
            var audio =  new Audio("sounds/yellow.mp3");
            audio.play();
            break;  
        
        default:
            var audio =  new Audio("sounds/wrong.mp3");
            audio.play();
            break;
    }
}
