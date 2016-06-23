/***
 * Tic Tac Toe by Gabriel Roa
 * The algorithms presented look at all the squares as a 3x3 grid like this:
 * 0 1 2
 * 3 4 5
 * 6 7 8
 */
//TODO: Code a prompt that lets the user pick between O and X
var ai;
var player;
var playStack = []; //Store in this variable all the moves by the user.
var responseCount = 0; //Once the AI responds 4 times, the game is a draw.
var possibleWins = [ //This is a 2D array with all the possible combination of plays that can win.
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

var possibleWinsOp = [ //This is a copy for the AI's use.
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

var oponentStack = [] //Here will be stored all the AI's moves.
var firstPlay = true; //The first play will respond a bit different.
//In a Tic Tac Toe game, you're only lost for sure if you don't play a corner after the oponent starts with center,
//or if you dont't play center after the oponent starts anywhere else.

$(document).ready(function() {

  //First prompt if you want to be X or O
  $("#dialog-confirm").dialog({
    resizable: false,
    height: 140,
    modal: true,
    buttons: {
      X: function() {
        //1 is x, 0 is o
        player = 1;
        ai = 0;
        $(this).dialog("close");
      },
      O: function() {
        player = 0;
        ai = 1;
        $(this).dialog("close");
      }
    }
  });

  $("#0").click(function() {
    playedKey(0);
  })

  $("#1").click(function() {
    playedKey(1);
  })

  $("#2").click(function() {
    playedKey(2);
  })

  $("#3").click(function() {
    playedKey(3);
  })

  $("#4").click(function() {
    playedKey(4);
  })

  $("#5").click(function() {
    playedKey(5);
  })

  $("#6").click(function() {
    playedKey(6);
  })

  $("#7").click(function() {
    playedKey(7);
  })

  $("#8").click(function() {
    playedKey(8);
  })

})

//This function draws an X image an takes in a coordinate which must be a string ID such as "#0"
function drawFigure(coord, key) {
  if (key == 0) {
    $(coord).html('<img class="img img-responsive" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Red-circle.svg/1024px-Red-circle.svg.png">')
  } else if (key == 1) {
    $(coord).html('<img class="img img-responsive" src="http://www.clker.com/cliparts/0/7/e/a/12074327311562940906milker_X_icon.svg.hi.png">');
  }
}

//I don't even know why this is a function. TODO: Combine these.
function playedKey(value) {
  addToStack(value);
}

function addToStack(value) {

  var found = false;
  //If it was already played, don't do anything.
  for (var i = 0; i < playStack.length; i++) {
    if (playStack[i] === value) {
      console.log("Already found at " + playStack);
      found = true;
    }
  }

  for (var j = 0; j < oponentStack.length; j++) {
    if (oponentStack[j] === value) {
      //console.log("Found in oponent stack");
      console.log("Already found at " + oponentStack);
      found = true;
    }
  }

  //If it was not already played:
  if (found === false) {
    //Push as a play, and replace all the possible wins in the oponents rank that have that number as -1.
    playStack.push(value);
    for (var i = 0; i < possibleWinsOp.length; i++) {
      for (var j = 0; j < possibleWinsOp[i].length; j++) {
        if (possibleWinsOp[i][j] === value) {
          //console.log("X was drawn. So we're changing op pos wins ")
          possibleWinsOp[i][j] = -1;
          //console.log(possibleWinsOp);
        }
      }
    }
    //Value is converted into a string "#value"
    value = value.toString().split("");
    value.push("#");
    value = value.reverse();
    drawFigure(value.join(""), player);

    if (responseCount == 4) {
      alert("Draw brah.");
      location.reload(false);
    }

    //This gets the AI's response.
    getResponse();

  }

}

function getResponse() {
  responseCount++;

  if (firstPlay) {
    firstPlay = false;
    if (playStack[0] === 4) {
      //console.log("You played center on the first play.");
      oponentStack.push(2);
      drawFigure("#2", ai);
      for (var i = 0; i < possibleWins.length; i++) {
        for (var j = 0; j < possibleWins[i].length; j++) {
          if (possibleWins[i][j] === 2) {
            possibleWins[i][j] = -1;
          }
        }
      }
    } else {
      //console.log("You did not play center at first.");
      oponentStack.push(4);
      drawFigure("#4", ai);
      for (var i = 0; i < possibleWins.length; i++) {
        for (var j = 0; j < possibleWins[i].length; j++) {
          if (possibleWins[i][j] === 4) {
            possibleWins[i][j] = -1;
          }
        }
      }
    }
  } else {
    getWinningMove();
  }
}

//TODO: Split this giant method into many functions to stop for reusing code so much.
//A filterWins method that takes a value and replaces all the possibleWins[i][j] with -1 would be used a lot.
function getWinningMove() {
  var winPos = false;
  var opPos = false;
  //console.log(possibleWins);
  //console.log(possibleWinsOp);

  //This loop analyses if the AI has two consecutive Os
  for (var i = 0; i < possibleWinsOp.length; i++) {
    for (var j = 0; j < oponentStack.length; j++) {
      possibleWinsOp[i] = possibleWinsOp[i].filter(function(value) {
        return value !== oponentStack[j];
      })
    }

    if (possibleWinsOp[i].length == 1 && possibleWinsOp[i][0] !== -1) {
      //console.log("Turning on opPos");
      //console.log(possibleWinsOp);
      opPos = true;
      var draw = possibleWinsOp[i][0].toString().split("");
      draw.push('#');
      draw = draw.reverse();
      //console.log("Drawing winning 0 at " + draw);
      //console.log(possibleWinsOp);
      drawFigure(draw.join(""), ai);

      //The oponent will have won the game when this happens
      //so prompt properly.
      alert("Lost brah.");
      location.reload(false);
    }
  }

  //This for loop analyses if the oponent has two consecutive
  //Xs
  if (!opPos) {
    var replacer = -2;
    for (var i = 0; i < possibleWins.length; i++) {

      for (var j = 0; j < playStack.length; j++) {
        possibleWins[i] = possibleWins[i].filter(function(value) {
          return value !== playStack[j];
        })
      }

      if (possibleWins[i].length == 1 && possibleWins[i][0] !== -1) {
        replacer = possibleWins[i][0];
        //console.log("Turning on winPos");
        //console.log("Winning combination " + possibleWins[i]);
        //console.log(possibleWins);
        winPos = true;
        var draw = possibleWins[i][0].toString().split("");
        oponentStack.push(possibleWins[i][0]);
        draw.push("#");
        draw = draw.reverse();
        drawFigure(draw.join(""), ai);

        //Now we are goign to mark this value as not a possible win.
      }

    }
    //Proper filter.
    for (var i = 0; i < possibleWins.length; i++) {
      for (var j = 0; j < possibleWins[i].length; j++) {
        if (possibleWins[i][j] === replacer) {
          possibleWins[i][j] = -1;
        }
      }
    }

  }

  //If there are no consecutive Xs or Os, just play wherever.
  if (!winPos && !opPos) {
    //console.log("No winning possibilities for each side.");
    for (var i = 0; i < possibleWinsOp.length; i++) {
      if (possibleWinsOp[i].length == 2) {

        if (possibleWinsOp[i][0] !== -1) {
          var draw = possibleWinsOp[i][0].toString().split("");
          oponentStack.push(possibleWinsOp[i][0]);
          draw.push('#');
          draw = draw.reverse();
          drawFigure(draw.join(""), ai);
          break;

        } else if (possibleWinsOp[i][1] !== -1) {

          var draw = possibleWinsOp[i][1].toString().split("");
          oponentStack.push(possibleWinsOp[i][1]);
          draw.push('#');
          draw = draw.reverse();
          drawFigure(draw.join(""), ai);
          break;
        }

      }
    }
  }

}
/*
Game starts:

Conditional based on first move:
If first move was in center:
	Play in corners
else
	Play in center

Get second move:
Do a comparison of second move and every possible winning combination.

Organize the combinations in 2d array [ [1, 2, 3] , [4, 5, 6] ]
add moves to a separate array

Triple for loop it. For every move, for every element in array, for every element in array[j]
Compare pairs. Have another array for changing [ 0, 0, 0, 0, 0, 0, ] with 8 elements.

If number matches with possibility 1, [1, 0, 0, 0, 0, 0, 0]
if number matches with possibility 1 and 3, [2, 0, 0, 1, 0, 0, ]

As soon as one of the numbers is 2
array[j] and place the 0 in the unmatched element.
*/