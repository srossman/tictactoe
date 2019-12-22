window.onload = setup; // Calling setup function at program start

/* Globals */
const classes=["e","b","w"];
var turns=[];
var buttonElementRandom = document.getElementById("next");
var title = document.getElementById("title");
var board = document.getElementById("board");
var rows = document.getElementById("rows");
var validTurn = null;

var token = 1; // Decides who is black and who is white

function setup() {
	title.innerHTML = "Tic Tac Toe!";
	boardReset("Here are instructions.");
	buttonElementRandom.innerHTML = "Play";
  newBoard();
}

/* Main */
function main() {
  document.getElementById("status").innerHTML = "Valid";

  while (rows.hasChildNodes()) {   
    rows.removeChild(rows.firstChild);
  }
  
  //Player Inputs
  var x_input = document.getElementById('x').value;
  var y_input = document.getElementById('y').value;
  
  validTurn=validateTurn(x_input,y_input);
  
  if (validTurn==true) {
    players_turn(x_input,y_input);
    buildBoard();
  }
  else {
    buildBoard();
    document.getElementById("status").innerHTML = "Invalid";
  }
}

function newBoard() {
  document.getElementById("status").innerHTML = "New";
  
  turns=[];
  // 1-d array, so []
  for (let row=0;row<3;row++){
    turns.push([]);
    // push 3 1-d row arrays into turns, so: [[],[],[]]
    for (let col=0;col<3;col++){
      //let turnVal=Math.floor(Math.random()*3); MAKES IT SO TURNS ARRAY IS FILLED WITH RANDOM VALUES
      let turnVal=0;
      let turnClass=classes[turnVal];
      turns[row].push(turnClass);
      // push the classes into each row, so [["e","e","e"],["e","e","e"],["e","e","e"]]
      }
    }
    console.log(turns);
}

function validateTurn(x,y) {
  if (x<=2 && x>=0 && y<=2 && y>=0) {
    return true;
  }
  else {
    return false;
  }
}

function players_turn(x,y) {
  if (turns[x][y] == "e") {
    turns[x][y] = classes[token];
    if (token==1) {
      token = 2;
      console.log("switched");
    } else {
      token = 1;
    }

  } else {
    document.getElementById("status").innerHTML = "Taken";
  }
  console.log("------------------------");
  console.log(turns);

  didIWin(); // CHECK FOR WINNER
}

function buildBoard(){
	for (let row=0;row<3;row++){
    var rowNode = document.createElement("ul");
    rowNode.className = "row";
    rows.appendChild(rowNode);
    for (let col=0;col<3;col++){
      // count turns
      // find last UL (row)
      var newRow = rows.lastChild;
      // prepare LI for row
      var turnNode = document.createElement("li");
      // look up and add class
      turnNode.setAttribute("class", turns[row][col]);
      // add LI to row
	    newRow.appendChild(turnNode);
	  }
	}
}

// ADD BOOLEAN GLOBAL THAT EXITS GAME IF WINNER
function didIWin(){
  for (let row=0;row<3;row++){
    for (let col=0;col<3;col++){
      if (turns[row][col]==turns[row][0]&&turns[row][col]==turns[row][1]&&turns[row][col]==turns[row][2]&&turns[row][col]!=classes[0]){
        if (token==2) console.log("Black won!");
        else console.log("White won!");
        document.getElementById("status").innerHTML = "Winner!";
      }
      if (turns[0][col]==turns[1][col]&&turns[1][col]==turns[2][col]&&turns[row][col]!="e"){
        if (token==2) console.log("Black won!");
        else console.log("White won!");
        document.getElementById("status").innerHTML = "Winner!";
      }
    }
  }
}

function boardReset(message){
  board.removeChild(board.childNodes[2]);
  var messageArea = document.createElement("p");
  messageArea.innerHTML=message;
  board.appendChild(messageArea);
}
