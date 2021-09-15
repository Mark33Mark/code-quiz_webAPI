/* ========================================================================
 *
 *    Project:          Javascript Quiz Against the Clock - questions
 *    Javascript file:  quizQuestions.js
 *    Created by:       Mark Watson
 *    Date commenced:   10-Sep-2021
 *
 *    References:       https://www.sitepoint.com/simple-javascript-quiz/
 *                      https://www.w3schools.com/quiztest/quiztest.asp?qtest=JS
 * 
 *=========================================================================== */

const quizQuestions = [
    {
      question: "Who invented JavaScript?",
      answers: {
        a: "Douglas Crockford",
        b: "Sheryl Sandberg",
        c: "Brendan Eich",
        d: "Albert Einstein"
      },
      correctAnswer: "c"
    },
    {
      question: "Which one of these is a JavaScript package manager?",
      answers: {
        a: "Node.js",
        b: "Notepad++",
        c: "TypeScript",
        d: "npm"
      },
      correctAnswer: "d"
    },
    {
      question: "Inside which HTML element do we put the JavaScript?",
      answers: {
        a: "&ltscripting&gt",
        b: "&ltjs&gt",
        c: "&ltscript&gt",
        d: "&ltjavascript&gt"
      },
      correctAnswer: "c"
    },
    {
      question: "What is the correct JavaScript syntax to change the " +
                "content of the following HTML element: <br />" +
                "&ltp id = &#34demo&#34&gt This is a demonstration. &lt p &gt ?",
      answers: {
        a: "document.getElementById( &#34demo&#34 ).innerHTML = &#34Hello!&#34;",
        b: "document.getElement( &#34p&#34 ).innerHTML = &#34Hello!&#34;",
        c: "document.getElementByName( &#34p&#34 ).innerHTML = &#34Hello!&#34;",
        d: "#demo.innerHTML = &#34Hello World!&#34;",
      },
      correctAnswer: "a"
    },
    {
      question: "Where is the correct place to insert a JavaScript?",
      answers: {
        a: "the &lthead&gt section",
        b: "the &ltbody&gt section",
        c: "you can put it anywhere",
        d: "both &lthead&gt and &ltbody&gt sections are correct"
      },
      correctAnswer: "d"
    },
    {
      question: "What is the correct syntax for referring to an external script called \"xxx.js\"?",
      answers: {
        a: "&lt script href=&#34xxx.js&#34 &gt",
        b: "&lt script name=&#34xxx.js&#34 &gt",
        c: "&lt script src=&#34xxx.js&#34 &gt",
        d: "&lt script =&#34xxx.js&#34 &gt"
      },
      correctAnswer: "c"
    },
    {
      question: "The external JavaScript file must contain the &ltscript&gt tag?",
      answers: {
        a: "yes",
        b: "no",
      },
      correctAnswer: "b"
    },
    {
      question: "How do you write &#34Hello World&#34 in an alert box?",
      answers: {
        a: "alertBox(&#34Hello World&#34);",
        b: "alert(&#34Hello World&#34);",
        c: "msgBox(&#34Hello World&#34);",
        d: "msg(&#34Hello World&#34);"
      },
      correctAnswer: "b"
    },
    {
      question: "How do you create a function in JavaScript?",
      answers: {
        a: "function myFunction()",
        b: "function = myFunction()",
        c: "function:myFunction()",
        d: "myFunction()"
      },
      correctAnswer: "a"
    },
    {
      question: "How do you call a function named \"myFunction\"?",
      answers: {
        a: "call function myFunction()",
        b: "myFunction()",
        c: "call myFunction()",
        d: "fn_myFunction()"
      },
      correctAnswer: "b"
    },
    {
      question: "How do you write an IF statement in JavaScript?",
      answers: {
        a: "if i==5 then",
        b: "if ( i==5 )",
        c: "if i=5 then",
        d: "if i=5"
      },
      correctAnswer: "b"
    },
    {
      question: "How to write an IF statement for executing some code if \"i\" is NOT equal to 5?",
      answers: {
        a: "if i=!5 then",
        b: "if i<>5",
        c: "if( i<>5 )",
        d: "if( i!=5 )"
      },
      correctAnswer: "d"
    },
    {
      question: "How does a WHILE loop start?",
      answers: {
        a: "while ( i<=10; i++ )",
        b: "while ( i<=10 )",
        c: "while i = 1 to 10",
        d: "while ( i<=10; i-- )"
      },
      correctAnswer: "b"
    },
    {
      question: "How does a FOR loop start?",
      answers: {
        a: "for( i=0; i<=5 )",
        b: "for( i<=5; i++ )",
        c: "for i = 1 to 5 ",
        d: "for( i=0; i<=5; i++ )"
      },
      correctAnswer: "d"
    },
    {
      question: "How can you add a comment in a JavaScript?",
      answers: {
        a: "\' This is comment",
        b: "// This is a comment",
        c: "&lt!-- This is a comment --&gt",
        d: "* This is a comment"
      },
      correctAnswer: "b"
    },    
    {
      question: "How do you insert a comment that has more than one line in JavaScript?",
      answers: {
        a: "// This comment is good for multiple lines //",
        b: "/* This comment is good for multiple lines */",
        c: "&lt!-- This comment is good for multiple lines --&gt",
        d: "&lt This comment is good for multiple lines &gt"
      },
      correctAnswer: "b"
    },    
    {
      question: "What is the correct way to write a JavaScript array?",
      answers: {
        a: "var colors = ( 1:&#34red&#34, 2:&#34green&#34, 3:&#34blue&#34 )",
        b: "var colors = &#34red&#34 , &#34green&#34 , &#34blue&#34",
        c: "var colors = [ &#34red&#34 , &#34green&#34 , &#34blue&#34 ]",
        d: "var colors = 1 = ( &#34red&#34 ), 2 = ( &#34green&#34 ), 3 = ( &#34blue&#34 )"
      },
      correctAnswer: "c"
    },    
    {
      question: "How do you round the number 7.25 to the nearest integer?",
      answers: {
        a: "Math.round( 7.25 )",
        b: "rnd( 7.25 )",
        c: "round( 7.25 )",
        d: "Math.rnd( 7.25 )"
      }, 
      correctAnswer: "a"
    },    
    {
      question: "How do you find the number with the highest value of x and y?",
      answers: {
        a: "Math.ceil( x,y )",
        b: "top( x,y )",
        c: "Math.max( x,y )",
        d: "ceil( x,y )"
      },
      correctAnswer: "c"
    },    
    {
      question: "What is the correct JavaScript syntax for opening a new window called \"w2\" ?",
      answers: {
        a: "w2 = window.new(&#34http://www.random.com&#34)",
        b: "w2 = window.open(&#34http://www.random.com&#34)",
        c: "w2 = open(&#34http://www.random.com&#34)"
      },
      correctAnswer: "b"
    },    
    {
      question: "JavaScript is the same as Java?",
      answers: {
        a: "yes",
        b: "no"
      },
      correctAnswer: "b"
    },    
    {
      question: "How can you detect the client's browser name?",
      answers: {
        a: "browser.name",
        b: "client.navName",
        c: "navigator.appName",
        d: "browser"
      },
      correctAnswer: "c"
    },   
    {
      question: "Which event occurs when the user clicks on a HTML element?",
      answers: {
        a: "onclick",
        b: "onmouseclick",
        c: "onmouseover",
        d: "onchange"
      },
      correctAnswer: "a"
    },    
    {
      question: "How can you declare a variable in JavaScript?",
      answers: {
        a: "variable carName",
        b: "let carName",
        c: "const carName",
        d: "both b and c"
      },
      correctAnswer: "d"
    },    
    {
      question: "Which operator is used to assign a value to a variable?",
      answers: {
        a: "X",
        b: "=",
        c: "-",
        d: "*"
      },
      correctAnswer: "b"
    },    
    {
      question: "What will the following code return: Boolean(10 > 9)",
      answers: {
        a: "NaN",
        b: "undefined",
        c: "true",
        d: "false"
      },
      correctAnswer: "c"
    },    
    {
      question: "Is JavaScript case-sensitive?",
      answers: {
        a: "yes",
        b: "no",
      },
      correctAnswer: "a"
    },
    {
      question: "Which tool can you use to ensure code quality?",
      answers: {
        a: "Angular",
        b: "jQuery",
        c: "RequireJS",
        d: "ESLint"
      },
      correctAnswer: "d"
    },
  ];
