// start of the game
var wordGuessGame = {

  // names and details list - creating the objects
  namesList: {
    lovelace: {
      hint: "Ada -------- (1815 – 1852) was a mathematician and the world’s first computer programmer. She is regarded as the first to recognise the full potential of computers.",
      picture: "placeholder.png",
      fullname: "Ada Lovelace"
    },
    winlock: {
      hint: "Anna ------- (1857 – 1904), an astronomer and human computer, was one of the first members of the female computer group known as 'the Harvard Computers.'",
      picture: "placeholder.png",
      fullname: "Anna Winlock"
    },
    holberton: {
      hint: "Frances Elizabeth --------- (1917 – 2001) was one of the six original programmers of the first general-purpose electronic digital computer, ENIAC. She also invented breakpoints in computer debugging.",
      picture: "placeholder.png",
      fullname: "Betty Holberton"
    },
    clarke: {
      hint: "Edith ------ (1883 - 1959) worked as a 'computer', someone who performed difficult mathematical calculations before modern computers and calculators were invented.",
      picture: "placeholder.png",
      fullname: "Edith Clarke"
    },
    hopper: {
      hint: "Grace ------ (1906 - 1992) was the first woman to earn a PhD in mathematics from Yale University in 1934 and invented COBOL, one of the first easy-to-use computer languages",
      picture: "placeholder.png",
      fullname: "Grace Hopper"
    },
    bartik: {
      hint: "Jean Jennings ------ (1924 – 2011) and her colleagues developed and codified many of the fundamentals of programming while working on the ENIAC, since it was the first computer of its kind.",
      picture: "placeholder.png",
      fullname: "Jean Jennings Bartik"
    },
    sammet: {
      hint: "Jean E. ------ (1928 – 2017) was a computer scientist who developed the FORMAC programming language in 1962 and helped develop the COBOL programming language.",
      picture: "placeholder.png",
      fullname: "Jean E. Sammet"
    },
    burks: {
      hint: "Jewel ----- (1989 - ) works to make the tech industry more diverse and accessible to all people. She taught herself to build apps and launched a cutting-edge computer vision app called Partpic.",
      picture: "placeholder.png",
      fullname: "Jewel Burks - now Jewel Burks Solomon"
    },
    hamilton: {
      hint: "Margaret -------- (1936 - ), known as the 'Mother of Software', led the team at MIT in charge of onboard flight software on the Apollo computers.",
      picture: "placeholder.png",
      fullname: "Margaret Hamilton"
    },
    klawe: {
      hint: "Maria ----- (1951 - ) is the first female president of Harvey Mudd College and works hard to ignite passion about STEM fields amongst diverse groups.",
      picture: "placeholder.png",
      fullname: "Maria Klawe"
    }
  },

  // variables at beginning of game (and for reset)
  currentName: null,
  lettersOfName: [],
  matchedLetters: [],
  guessedLetters: [],
  guessesLeft: 0,
  totalGuesses: 0,
  letterGuessed: null,
  wins: 0,

  
  // sets up the game when the page loads
  setupGame: function() {
    // this is where a random name from the list is picked
    var objKeys = Object.keys(this.namesList);
    this.currentName = objKeys[Math.floor(Math.random() * objKeys.length)];

    // this pushes the hint for the chosen name to the page
    document.querySelector("#hint-text").innerHTML = this.namesList[this.currentName].hint;

    // splits the name into letters
    this.lettersOfName = this.currentName.split("");

    // creates a representation of the name and pushes it to the page (starts as underscores)
    this.rebuildWordView();

    // sets the number of initial guesses
    this.processUpdateTotalGuesses();
  },

  // this runs when a letter key is pressed for a guess
  updatePage: function(letter) {
    var toggle = new Audio('assets/sounds/toggle1.mp3');
    toggle.play();

    // when 0 guesses left, restarts game
    if (this.guessesLeft === 0) {
      this.restartGame();
    }
    // guesses left, so it runs these steps
    else {

      // incorrect guess, so total guesses remaining is updated
      this.updateGuesses(letter);

      // correct guess
      this.updateMatchedLetters(letter);

      // rebuilds what is shown on the page, with matched letters and blanks
      this.rebuildWordView();

      // If the user wins, restart the game.
      if (this.updateWins() === true) {
        this.restartGame();    
      }
    }

  },



  // new function - incorrect guess and not duplicating a previous guess
  updateGuesses: function(letter) {

    // adds new letter to guessed letters list
    if ((this.guessedLetters.indexOf(letter) === -1) && (this.lettersOfName.indexOf(letter) === -1)) {

      // adds guessed letter to guessedLetters array
      this.guessedLetters.push(letter);

      // decreases remaining guesses by one
      this.guessesLeft--;

      // updates remaining guesses and guessed letters on page
      document.querySelector("#guesses-remaining").innerHTML = this.guessesLeft;
      document.querySelector("#guessed-letters").innerHTML =
      this.guessedLetters.join(", ");
    }
  },                         

  // sets total amount of guesses user gets
  processUpdateTotalGuesses: function() {

    // user guesses depend on how long name is
    this.totalGuesses = this.lettersOfName.length + 8;
    this.guessesLeft = this.totalGuesses;

    // pushes amount of remaining guesses to page
    document.querySelector("#guesses-remaining").innerHTML = this.guessesLeft;
  },

  // this section is what happens if a guessed letter is correct
  updateMatchedLetters: function(letter) {

    // scans through letters of name
    for (var i = 0; i < this.lettersOfName.length; i++) {
  
      // guessed letter is correct
      if ((letter === this.lettersOfName[i]) && (this.matchedLetters.indexOf(letter) === -1)) {

        // pushes guessed letter to matchedLetters array
        this.matchedLetters.push(letter);
      }
    }
  },

  // this controls how the current name is displayed
  rebuildWordView: function() {
    var wordView = "";

    // scans letters of current name
    for (var i = 0; i < this.lettersOfName.length; i++) {

      // this is where a correctly guessed letter is pushed to the page in the display of the name
      if (this.matchedLetters.indexOf(this.lettersOfName[i]) !== -1) {
        wordView += this.lettersOfName[i];
      }
      // unguessed letters are "_" until guessed
      else {
        wordView += "&nbsp;_&nbsp;";
      }
    }

    // updates page with new string
    document.querySelector("#current-name").innerHTML = wordView;
  },

  // restarts game and resets all variables
  restartGame: function() {
    document.querySelector("#guessed-letters").innerHTML = "";
    this.currentName = null;
    this.lettersOfName = [];
    this.matchedLetters = [];
    this.guessedLetters = [];
    this.guessesLeft = 0;
    this.totalGuesses = 0;
    this.letterGuessed = null;
    this.setupGame();
    this.rebuildWordView();
  },

  // this checks to see if game won
  updateWins: function() {
    var win;

    // if name not guessed yet, sets win to false
    if (this.matchedLetters.length === 0) {
      win = false;
    }
    // else sets win to true
    else {
      win = true;
    }

    // checking what letters have been guessed, if name has been completed, if not still setting win to false
    for (var i = 0; i < this.lettersOfName.length; i++) {
      if (this.matchedLetters.indexOf(this.lettersOfName[i]) === -1) {
        win = false;
      }
    }

    // when win = true
    if (win) {

      // adds 1 to win total
      this.wins = this.wins + 1;

      // updates wins on page
      document.querySelector("#wins").innerHTML = this.wins;

      // pushes new women in computers image to page
      var myArray = [ "sample.jpg", "sample.jpg", "sample.jpg"];
      var randomItem = myArray[Math.floor(Math.random()*myArray.length)];
      document.querySelector("#bio-div").innerHTML =
        "<img class='bio-image' src='assets/images/" + randomItem + "'>";

      // plays applause sound for a win
      var audio = new Audio("assets/sounds/applause.WAV");
      audio.play();

      // when game is won, this triggers restart (updatePage function)
      return true;
    }

    // game not won but guesses still remaining, sends false to updatePage
    return false;
  }
};

// starts game set up when page loads/refreshes
wordGuessGame.setupGame();

// on any keypress:
document.onkeyup = function(event) {

  // this checks to see if the key is a letter key
  if (event.keyCode >= 49 && event.keyCode <= 90) {
    
    // if it is a letter key, this captures which letter
    wordGuessGame.letterGuessed = event.key.toLowerCase();
    
    // sends that guessed letter to updatePage function to update game
    wordGuessGame.updatePage(wordGuessGame.letterGuessed);
  }
  
};
