/* ========================================================================
 *
 *    Project:          Javascript Quiz Against the Clock
 *    Javascript file:  main.js
 *    Created by:       Mark Watson
 *    Date commenced:   10-Sep-2021
 *
 *    References:       https://www.sitepoint.com/simple-javascript-quiz/
 * 
 *=========================================================================== */


const quizContainer     = document.getElementById("quiz");
const resultsContainer  = document.getElementById("results");
const startQuiz         = document.getElementById("start-quiz");
const answerResult      = document.getElementById("answer-result");
const welcome           = document.getElementById("welcome-message");
const timer             = document.getElementsByClassName("time-wrapper")[0];
const highScoreIcon     = document.getElementsByClassName("hi-scores-icon")[0];
const highScoreIconRH   = document.getElementsByClassName("hi-scores-icon")[1];
const countdown         = document.getElementsByClassName("countdown-wrapper")[0];

timer.style.display     = "none";
countdown.style.display = "none";

let numCorrect      = 0;
let scoresTempArray = [];

 // ===============================================================================

  function buildQuiz(){
    
    const output = [];  // variable to store the HTML output

    quizQuestions.forEach ( 

      function( currentQuestion, questionNumber ){

        const answers = [];  // array to store the list of possible answers

        for(letter in currentQuestion.answers){
 
          answers.push(
            `<button type = "button" 
                     id = "${questionNumber}${letter}"
                     class = "answered">
                ${letter} : &nbsp ${currentQuestion.answers[letter]}
             </button>`
          );
        }

          output.push(  // add question and answer to output
            `<div class="slide">
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
          );
      }
    );

    // combine output list into one string of HTML and add to page
    quizContainer.innerHTML = output.join("");    

    // Check what is in JSON and parse it to scoresTempObject.
    let storedScoreData = JSON.parse(localStorage.getItem("scores"));

    if (storedScoreData !== null) { scoresTempArray = storedScoreData; }
    
  }

  // ===============================================================================

  function welcomeWindow() {
    welcome.innerHTML = `<div style="font-size:1.25rem; 
                                           flex: 0 1 40%; 
                                           width: 95vw; 
                                           margin: -1rem 0 0 0; 
                                           padding: 0 1rem 0 0.5rem; 
                                           text-align: center;">
Welcome to a fun way to test yourself on some fundamental Javascript knowledge.<br />  
Oh, to make it even more fun, this Quiz is against the clock.  If you get a question wrong, <br />
you'll lose 10 seconds from your time to complete.<br />
Press start when you're ready.</div>`;
  }


   // ===============================================================================

  function showSlide( n ) {

    slides[ currentSlide ].classList.remove('active-slide');
    slides[ n ].classList.add('active-slide');

    currentSlide = n;

  }

  // ===============================================================================

  function showNextSlide(gameOver) {

    showResults();
    
    if (( currentSlide >= quizQuestions.length - 1 ) || ( gameOver === "endGame" )) {
      
      slides[ currentSlide ].classList.remove( 'active-slide' );

      quizContainer.style.display   = "none";
      countdown.style.display       = "none";
      highScoreIcon.style.display   = "inline-block";
      highScoreIconRH.style.display = "inline-block"; 

      currentSlide ++ // takes you to page with no slides for a quick message before going to
                      // high scores page.

      clearInterval(timeinterval);

      countdownBanner.innerHTML = `I'm about to open the high scores register so you can record your score.  <br />
      I stay open here after opening the high scores page.<br /><br />
      Well done, you still had time remaining:`;

      openHighScoresWindow();
    }      

      if ( gameOver === "endGame" ) {
        countdownBanner.innerHTML = `Ouch, you ran out of time. <br><br />I'm trying to open the high scores register so you can record your score.<br />
        Please click the High Scores button in the banner if the high scores page hasn't opened in the time it's taken to read this.
        If it does open than I stay open here after opening the high scores page.`;

        let generateDataOutOfTime = true;
        createScoreData(generateDataOutOfTime);
        
        openHighScoresWindow();

     } else { 
       showSlide( currentSlide + 1 );
     }
  }


  // == Generate game data ==============================================================
  
  /* 
    Thanks to all the scammers and spammers, using windows.open(), windows.close() and windows.focus()
    are ridiculously limited because of past abuse and caused a lot of glitches in the handling of the 
    data between this page and the high scores page.  From trying to get it to work I came across this
    method which is I think the correct way for loading a page that is part of the sequence of
    webpages.
  */

  function openHighScoresWindow() {

    // initially had location.replace() however this removes the back button function from the
    // browser.  This is better in case a user doesn't think to press the navigation button
    // I've provided.
    
    setTimeout(function(){location.assign("./highScores.html");}, 2500);

  }
  
  // == Generate game data ==============================================================

  function createScoreData(didNotMakeIt) {

    if (( currentSlide === quizQuestions.length ) &&  ( !didNotMakeIt )) {

      console.log( `${numCorrect} correct from ${currentSlide} questions` );
      console.log(`Time remaining = ${minutesSpan.innerHTML} minutes : ${secondsSpan.innerHTML} seconds`);
      
      let quizzedTime = ( timeInMinutes - ( Number( minutesSpan.innerHTML )+( Number( secondsSpan.innerHTML )/60))).toFixed(1);
      let convertSeconds = quizzedTime%1;
      
      quizzedTime -= convertSeconds;
      convertSeconds = Math.round( convertSeconds * 60 );
    
      console.log(`Time taken to complete = ${quizzedTime} minutes and ${convertSeconds} seconds.`);
      
      // Passing results to Local Storage
      let todaysResult = [
                          Date.now(),                     // a time stamp so each array series is unique
                          numCorrect,                     // how many questions answered correctly - the score.
                          currentSlide,                   // questions answered
                          quizQuestions.length,           // total number of Quiz Questions available at time of quiz
                          Number(minutesSpan.innerHTML),  // how many mins of time (excl. seconds) quiz player took
                          Number(secondsSpan.innerHTML),  // how many secs of time (excl. minutes) quiz player took
                          quizzedTime,                    // how many mins of time (excl. seconds) to Complete Quiz 
                          convertSeconds,                 // how many secs of time (excl. minutes) to Complete Quiz 
                          timeInMinutes,                  // time given to the user to answer quiz
                        ];
      
      let allResultsHistory = scoresTempArray.concat(todaysResult);
      localStorage.setItem( "scores", JSON.stringify( allResultsHistory ));
     }

     if ( didNotMakeIt ){ 
       
      console.log( `${numCorrect} correct from ${currentSlide-1} questions answered.` );
      console.log(`Time remaining = all time was used up.`);
      console.log(`Time given to complete = ${timeInMinutes} minutes.`);  
      
      // Passing results to Local Storage
      todaysResult = [
                          Date.now(),           // a time stamp so each array series is unique
                          numCorrect,           // how many questions answered correctly - the score.
                          currentSlide-1,       // questions answered - adjustment for when time ran out
                          quizQuestions.length, // total number of Quiz Questions available at time of quiz
                          0,                    // how many mins of time (excl. seconds) quiz player took
                          0,                    // how many secs of time (excl. minutes) quiz player took
                          timeInMinutes,        // how many mins of time (excl. seconds) to Complete Quiz 
                          0,                    // how many secs of time (excl. minutes) to Complete Quiz 
                          timeInMinutes,        // time given to the user to answer quiz

                      ];

      allResultsHistory = scoresTempArray.concat(todaysResult);
      localStorage.setItem( "scores", JSON.stringify( allResultsHistory ));
     }     
  }

  // ===============================================================================
  
  function showResults(userSelection, correctAnswer){

   if (userSelection!==undefined){
    console.log("User Selection = " + userSelection + " | slide # = "+currentSlide );
    console.log("The correct answer = "+ correctAnswer);
   
    if(userSelection === correctAnswer) {
      numCorrect++
      answerResult.innerHTML = `<span style="font-size:1.5rem; 
                                             color:green; 
                                             z-index:5;">
                                             ✅ Correct Answer ✅
                                </span>`;
      setTimeout(function(){ answerResult.innerHTML = ""; }, 750);

    } else {
      answerResult.innerHTML = `<span style="font-size:1.5rem; 
                                             color:red; 
                                             font-weight:500; 
                                             z-index:5;">
                                            ❌ Oh no, that's wrong ❌
                                  </span>`;
      setTimeout(function(){ answerResult.innerHTML = ""; }, 750);
      endtime = new Date(endtime - 10000);
    }   
  }

  if(currentSlide>0){progressBar()};

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} correct from ${currentSlide} questions`;

    if ( currentSlide === quizQuestions.length  ) { createScoreData(); }
  }


// == Quiz Runtime Initialisation ================================================

let gameStarted      = false;
buildQuiz();
welcomeWindow();

// Build the Quiz page
const nextSlide      = document.querySelectorAll( ".answered" );
const slides         = document.querySelectorAll( ".slide" );
let currentSlide     = 0;


function slideCountdown(){
  startQuiz.style.display = "none";
  countdown.style.display = "inline-flex";
  welcome.innerHTML       = "";
  gameStarted             = true;  // trigger created to stop errors generating in console 
                                   // from clicks on the welcome screen with no slides loaded.
  countdownBar();
}

// == Extract user selection ===========================================================

/* reply_click function - I wrote this to return the user's selection.
   Click event was not working as used to generate the slides.
   The loadSlides() function does this and creates an array of
   every button for all the questions ready for loading when a
   user has answered a question.  To get around this, I discovered
   adding an onClick event in the HTML at the parent of the buttons
   allows the following to work to extract the answer each time.
*/

const userSelect=[];


  function reply_click( e ) {
    e = e || window.event;
    e = e.target || e.srcElement;

    if (( e.nodeName === 'BUTTON' )&&( gameStarted )) {

      userSelect.push( e.id );
        
      let userLetter = userSelect[currentSlide];
      
      // worked this out - think it is an async issue?  Anyhow doing this
      // grabs the array item even though it is 'undefined'.  Couldn't work
      // out another way.

      if ( userLetter===undefined ){ 
        userLetter = userSelect.pop();
        userLetter = userLetter.slice(userLetter.length-1);
      } else {
        console.log(userLetter);
        userLetter = userLetter.slice(userLetter.length-1);
      }

      let theAnswer = quizQuestions[currentSlide-1].correctAnswer

      return showResults(userLetter, theAnswer);
    }
  }

// == Slide Manager ===================================================================

function loadSlides(){

  showSlide( currentSlide );  

  // Because the buttons are generated as an array in this app,
  // each button needs an event listener attached to it.  The following 
  // does that.
  let buttonsListener = [];

  buttonsListener.forEach.call(nextSlide, function( nextSlide ) {
    nextSlide.addEventListener( "click", showNextSlide );
  });

  showResults();  // loads the score for first time.
}

  startQuiz.addEventListener( "click", slideCountdown );  // waits for button click to start game.


// == Timer ===================================================================

// https://www.sitepoint.com/build-javascript-countdown-timer-no-dependencies/

const timeInMinutes    = 2.5;  // <<--- setting to change Quiz time.

const currentTime      = Date.parse(new Date());
let endtime            = new Date(currentTime + timeInMinutes*60*1000);

const countdownBanner  = document.getElementById( "countdown-banner" );
const clock            = document.getElementById( "clockdiv" );
// const daysSpan      = clock.querySelector( ".days" );
// const hoursSpan     = clock.querySelector( ".hours" );
const minutesSpan      = clock.querySelector( ".minutes" );
const secondsSpan      = clock.querySelector( ".seconds" );
let timeinterval;

function initialiseClock() {

  timer.style.display = "inline-flex";

  function updateClock() {
  
    const t = getTimeRemaining(endtime);

    // daysSpan.innerHTML    = t.days;
    // hoursSpan.innerHTML   = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    // console.log (t.total);
    
    if (t.total <= 0) {
      clearInterval(timeinterval);
      let endGame = "endGame";
      showNextSlide(endGame);
    }
  }

  updateClock();
  timeinterval = setInterval(updateClock, 1000);
}

function getTimeRemaining(endtime) {
  const total   = Date.parse(endtime) - Date.parse(new Date());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours   = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days    = Math.floor(total / (1000 * 60 * 60 * 24));
  
  return {
    total,
    days,
    hours,
    minutes,
    seconds
  };
}

// == Countdown Bar ===================================================================

let triggered = false;

function countdownBar() {
  highScoreIcon.style.display = "none";
  highScoreIconRH.style.display = "none"; 
  if ( !triggered ) {

    triggered = true;
    let elem = document.getElementById( "countdownIndicator" );
    let width = 100;
    let id = setInterval(frame, 33);  // 66 is close to 1 second
    
    function frame() {
      if (width <= 10) {
        clearInterval(id);
        elem.innerHTML ="go!";
        triggered = false;
        initialiseClock();
        loadSlides()
      } else {
        width--;
        elem.style.width = width + "%";
        elem.innerHTML = Math.floor(width/10);
      }
    }
  }
}

// == Progress Bar =====================================================================

function progressBar() {

  let elem = document.getElementById( "countdownIndicator" );
  let width = currentSlide;

      width = Math.floor(( currentSlide/quizQuestions.length ) * 100);
      elem.style.width = width + "%";
      elem.innerHTML = width  + "%";

    return;
}

/* ======================================================================================
   ====================================================================================== */