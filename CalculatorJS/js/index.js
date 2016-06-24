$(document).ready(function() {
  var numbers = [];
  
  //Number click functions
  $("#7").click(function(){
    $("#screen").append("7");
    numbers.push(7);
  })
  
  $("#8").click(function(){
    $("#screen").append("8");
    numbers.push(8);
  })
  
  $("#9").click(function(){
    $("#screen").append("9");
    numbers.push(9);
  })
  
  $("#4").click(function(){
    $("#screen").append("4")
    numbers.push(4);
  })
  
  $("#5").click(function(){
    $("#screen").append("5");
    numbers.push(5);
  })
  
  $("#6").click(function(){
    $("#screen").append("6");
    numbers.push(6);
  })
  
  $("#1").click(function(){
    $("#screen").append("1")
    numbers.push(1);
  })
  
  $("#2").click(function(){
    $("#screen").append("2")
    numbers.push(2);
  })
  
  $("#3").click(function(){
    $("#screen").append("3")
    numbers.push(3);
  })
  
  $("#0").click(function(){
    $("#screen").append("0")
    numbers.push(0);
  })
  
  //Operator click function
  $("#plus").click(function(){
    $("#screen").append(" + ")
    numbers.push("+");
  })
  $("#minus").click(function(){
    $("#screen").append(" - ")
    numbers.push("-");
  })
  $("#times").click(function(){
    $("#screen").append(" × ")
    numbers.push("times");
  })
  $("#divided").click(function(){
    $("#screen").append(" ÷ ")
    numbers.push("by");
  })
  
  $("#modulus").click(function(){
    $("#screen").append(" % ")
    numbers.push("mod");
  })
  
  $("#point").click(function(){
    $("#screen").append(".")
    numbers.push(".");
    //Will have to figure this out.. Probably not that bad.
  })
  
  //Clear and other bullshit
  $("#clear").click(function(){
    $("#screen").html("");
    numbers = [];
  })
  
  $("#equals").click(function(){
    //Scan the number array and perform the respective operations. Super messy but lets just get this done.
    //Also this looks like a very interesting algorithm to make.
    numbers.push("=");
    console.log(numbers);
    var side1 = [];
    var side2 = [];
    var lastNaN = "";
    var lastNaNIndex;
    for(var i = 0; i < numbers.length; i++){ //For all elements in the numbers array
      if(typeof numbers[i] !== 'number' && numbers[i] !== "."){   //If you find something that is not an integer
        console.log("Found a +");
        if (lastNaN === ""){                  //If this is the first non Integer you find
          for(var j = 0; j < i; j++){       //For all elemenets before that last integer
            side1.push(numbers[j]);         //Push them to the side1 array
            
          }
          
          side1 = parseFloat(side1.join(""));   //Convert the side1 array into an integer
          console.log("Defined side 1 as " + side1);
                            
          
        } else { //Else, if you found something that is not an integer, and it is not the first nan we found
          for(var j = lastNaNIndex + 1; j < i; j++ ){ //For all elements after the last non integer and until the one we are now
            side2.push(numbers[j]);                   //Add to the side2 array
          }
          
          side2 = parseFloat(side2.join(""));           //Convert side2 to a number
          console.log("Definint side2 as " + side2);
          
          
          /***
          * This is where you will define all possible operators.
          */
          
          if (lastNaN === "+"){  
            console.log("LastNan was plus");
            side1 = side1 + side2;
            console.log(side1);
          }
          
          if (lastNaN === "-"){
            side1 = side1 - side2;
          }
          
          if (lastNaN === "times"){
            side1 = side1 * side2;
          }
          
          if(lastNaN === "by"){
            side1 = side1 / side2;
          }
          
          if(lastNaN === "mod"){
            side1 = side1 % side2;
          }
          
        }
        
        
        lastNaN = numbers[i];               //Assign the current operator as the last one found.
        lastNaNIndex = i;
        side2 = [];
        console.log("Redifining lastNaN as " + lastNaN);
        
      }
    }
    
    numbers = [];
    numbers.push(side1);
    $("#screen").html(side1);
  })
  
})