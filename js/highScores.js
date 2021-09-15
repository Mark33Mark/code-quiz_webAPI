/* ========================================================================
 *
 *    Project:          Javascript Quiz Against the Clock
 *    Javascript file:  main.js
 *    Created by:       Mark Watson
 *    Date commenced:   12-Sep-2021
 *
 *    References:       usyd activity 26 - local storage todos
 * 
 *=========================================================================== */


const quizzersName         = document.querySelector("#hi-scores-text");
const highScoresForm       = document.querySelector("#hi-scores-form");
const highScoresCount      = document.querySelector("#hi-scores-count");
const highScoresRegister   = document.querySelector("#hi-scores-register");
const returnToQuiz         = document.getElementsByClassName("return-to-quiz")[0];

let hiScores               = [];
let timeStamp              = "";
let hiScorersInitials      = "";
let hiScoresText           = "";
let quizzer                = "";
let numbersOnly            = false;

// =============================================================================

function init() {

  let storedScores = JSON.parse(localStorage.getItem("scores"));

  // checks if there is data, if not by some chance someone opens the page before taking
  // any quiz then this will generate a blank form.

  if (storedScores !== null ) {
    hiScores = storedScores; 
  } else {
    return;
  }

      /* needed to add this as script glitches without something entered
       for user, this tests if no name provided on previous entry with new
       data coming in.
    */ 
   if( typeof(hiScores[hiScores.length-9]) != "number" ) {
       if ( hiScores.length >=10 ) {
        timeStamp = hiScores[hiScores.length-9].toString()
        quizzer =  "enter your initials" + "~" + timeStamp;
        hiScores[hiScores.length - 9] = quizzer;
        storeScores();

      } else {

        if( !hiScores[hiScores.length-9].includes("~") ) {
          quizzer =  "enter your initials" + "~" + timeStamp;
          hiScores[hiScores.length - 9] = quizzer;
          storeScores();
        }
      }
    }

  renderScores();
}

// =============================================================================

function renderScores() {

  highScoresRegister.innerHTML = "";
  highScoresCount.textContent = hiScores.length / 9;

  // looping backwards so most recent entry at top of list
  for ( let i = hiScores.length; i >= 0; i-- ) {  
    
    if ((i)%9===1){

      let li = document.createElement("li");

      li.textContent = `score: ${hiScores[i]} | ${hiScores[i+1]} questions attempted & 
                        ${hiScores[i+2]-hiScores[i+1]} unattempted from the total available questions. 
                        You had ${hiScores[i+7]} minutes and finished with ${hiScores[i+3]}min 
                        ${hiScores[i+4]}sec unused, taking ${hiScores[i+5]}min ${hiScores[i+6]}sec 
                        to complete the quiz.`;

      li.setAttribute("data-index", i);

      timeStamp = hiScores[i-1].toString();  // initially comes in as a number.
      
      if ( i <= hiScores.length - 10 ) { // doing this to leave badge off newest list item.

        let button = document.createElement("button");
        
        let stringIndex =  hiScores[i-1].search("~");
        let name = hiScores[i-1].slice(0, stringIndex);

        button.textContent = `Well done: ${name} 🏆`;

        li.appendChild(button);
      }



      let stringTest = typeof(hiScores[hiScores.length - 9])
      let text = hiScores[hiScores.length - 9];

      if ( stringTest==='string' ){
        // deal with the most recent score.
        let registryExe = /^[0-9]+$/;

        if (text.match(registryExe)) { numbersOnly = true;}
      }

      if (quizzer!="") {
        
        // add Quizzers name to new list entry.
        if (( i === hiScores.length - 8 )&&( hiScoresText != "" )&&(numbersOnly)) { 
          
          button = document.createElement("button");
          button.textContent = `Well done: ${hiScoresText} 🏆`;

          li.appendChild(button);
        } 
      }
        if ((!numbersOnly)&&( i === hiScores.length - 8 )&&( stringTest==='string' )) {
          
          let currentStringIndex = text.search("~");
          let currentName = text.slice(0, currentStringIndex);

          button = document.createElement("button");
          button.textContent = `Well done: ${currentName} 🏆`;

          li.appendChild(button);
        }
 
      highScoresRegister.appendChild(li);
    }
  }
}

// =============================================================================

function storeScores() {
  
  localStorage.setItem( "scores", JSON.stringify( hiScores ));
}

// =============================================================================

highScoresForm.addEventListener( "submit", function( event ) {
 
  event.preventDefault();

  hiScoresText = quizzersName.value.trim();
  hiScoresText = hiScoresText.replace(/ +/g, "");  /* removing whitespace if 
                                                      user's input more than initials
                                                   */   

  // Return from function early if submitted hiScoresText is blank
  // or there is already a name assigned to the timeStamp.
  if ( hiScoresText === "" ) {
    quizzersName.value = "";
    return;
  }
  
  timeStamp = hiScores[hiScores.length-9].toString()

  if( timeStamp.includes("~") ) {
    stringIndex       = timeStamp.search("~");
    timeStampSliced   = timeStamp.slice(stringIndex+1, timeStamp.length);
    timeStamp = timeStampSliced;
  }
   
  quizzer =  hiScoresText + "~" + timeStamp;
  hiScores[hiScores.length - 9] = quizzer;

  quizzersName.value = "";

  storeScores();
  renderScores();
});

// == In case no initials - add default ========================================

window.onbeforeunload = function(){
  
  timeStamp = hiScores[hiScores.length-9].toString()

  if( !timeStamp.includes("~") ) {

    quizzer =  "default" + "~" + timeStamp;
    hiScores[hiScores.length - 9] = quizzer;
  }
  storeScores();
}

// =============================================================================


init();

returnToQuiz.addEventListener( "click", returnToPage );  // waits for button click to start game.

// =============================================================================

function returnToPage() {

  location.replace("./index.html")

}