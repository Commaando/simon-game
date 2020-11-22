
var buttonColours =["red", "blue", "green", "yellow"];
var randomChosenColour ;
var userChosenColour;
var gamePattern=[];
var userClickedPattern=[];
var gameStarted=false;
var level=0;
var currentLevel=0;

function startOver (){
  level=0;
  currentLevel=0;
  gamePattern=[];
  userClickedPattern=[];
  gameStarted=false;
  $("h1").html("Game Over, Press Any Key to Restart");
}
function playSound(name){
   var audio =new Audio("sounds/"+name+".mp3");
   audio.play();
 }

function checkScore(abc){
  if (gamePattern[abc] != userClickedPattern[abc]){
    startOver();
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    },200);

  }else {
   currentLevel++;
   }
}

function nextSequence(){                              //creating a random number from 0-3
   var randomNumber= Math.floor(Math.random()*4);
   randomChosenColour= buttonColours[randomNumber];     //choosing a random color
   gamePattern.push(randomChosenColour);                  //adding random chosen colour to the game gamePattern
   $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
   playSound(randomChosenColour);
   if (gameStarted==true){
   $("h1").html("Level "+ level);
 }
 level++;

 }

$("div .btn").click(function(){                         //user clicks
  userChosenColour= this.id;                            //getting user chosen color
  userClickedPattern.push(userChosenColour);            // creating user pattern
  playSound(userChosenColour);                         //playing user clicked sounds
  $("#"+userChosenColour).addClass("pressed");
  setTimeout(function () {
    $("#"+userChosenColour).removeClass("pressed");

  }, 100);
  checkScore(currentLevel);
  if (currentLevel==level && gameStarted==true){
    currentLevel=0;
    userClickedPattern=[];
    setTimeout(function () {
      nextSequence();
    }, 1000);
  }


});

$(document).keypress(function(){
   if (gameStarted == false) {
      gameStarted =true;
      nextSequence();
    }
});
