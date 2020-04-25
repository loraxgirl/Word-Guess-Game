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

  // This function governs what happens when the user makes an incorrect guess (that they haven't guessed before).
  updateGuesses: function(letter) {
    // If the letter is not in the guessedLetters array, and the letter is not in the lettersOfName array..
    if ((this.guessedLetters.indexOf(letter) === -1) && (this.lettersOfName.indexOf(letter) === -1)) {

      // Add the letter to the guessedLetters array.
      this.guessedLetters.push(letter);

      // Decrease guesses by one.
      this.guessesLeft--;

      // Update guesses remaining and guesses letters on the page.
      document.querySelector("#guesses-remaining").innerHTML = this.guessesLeft;
      document.querySelector("#guessed-letters").innerHTML =
      this.guessedLetters.join(", ");
    }
  },

  // This function sets the initial guesses the user gets.
  processUpdateTotalGuesses: function() {
    // The user will get more guesses the longer the word is.
    this.totalGuesses = this.lettersOfName.length + 8;
    this.guessesLeft = this.totalGuesses;

    // Render the guesses left to the page.
    document.querySelector("#guesses-remaining").innerHTML = this.guessesLeft;
  },

  // This function governs what happens if the user makes a successful guess.
  updateMatchedLetters: function(letter) {
    // Loop through the letters of the "solution".
    for (var i = 0; i < this.lettersOfName.length; i++) {
      // If the guessed letter is in the solution, and we haven't guessed it already..
      if ((letter === this.lettersOfName[i]) && (this.matchedLetters.indexOf(letter) === -1)) {
        // Push the newly guessed letter into the matchedLetters array.
        this.matchedLetters.push(letter);
      }
    }
  },

  // This function builds the display of the word that is currently being guessed.
  // For example, if we are trying to guess "blondie", it might display "bl_ndi_".
  rebuildWordView: function() {
    // We start with an empty string.
    var wordView = "";

    // Loop through the letters of the word we are trying to guess..
    for (var i = 0; i < this.lettersOfName.length; i++) {
      // If the current letter has been guessed, display that letter.
      if (this.matchedLetters.indexOf(this.lettersOfName[i]) !== -1) {
        wordView += this.lettersOfName[i];
      }
      // If it hasn't been guessed, display a "_" instead.
      else {
        wordView += "&nbsp;_&nbsp;";
      }
    }

    // Update the page with the new string we built.
    document.querySelector("#current-word").innerHTML = wordView;
  },

  // Function that "restarts" the game by resetting all of the variables.
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

  // Function that checks to see if the user has won.
  updateWins: function() {
    var win;

    // If you haven't correctly guessed a letter in the word yet, we set win to false.
    if (this.matchedLetters.length === 0) {
      win = false;
    }
    // Otherwise, we set win to true.
    else {
      win = true;
    }

    // If a letter appears in the lettersOfName array, but not in the matchedLetters array, set win to false.
    // In English, if you haven't yet guessed all the letters in the word, you don't win yet.
    for (var i = 0; i < this.lettersOfName.length; i++) {
      if (this.matchedLetters.indexOf(this.lettersOfName[i]) === -1) {
        win = false;
      }
    }

    // If win is true...
    if (win) {

      // Add 1 to win total
      this.wins = this.wins + 1;

      // Update wins
      document.querySelector("#wins").innerHTML = this.wins;

      // Update bio image on page.
      document.querySelector("#bio-div").innerHTML =
        "<img class='bio-image' src='assets/images/'" + 
        this.namesList[this.currentName].picture + "alt=" +
        this.namesList[this.currentName].fullname + ">";

      // Play applause sound
      var audio = new Audio("assets/sounds/applause.wav");
      audio.play();

      // return true, which will trigger the restart of our game in the updatePage function.
      return true;
    }
    // If win is false, return false to the updatePage function. The game goes on!
    return false;
  }
};

// Initialize the game when the page loads.
wordGuessGame.setupGame();

// When a key is pressed..
document.onkeyup = function(event) {
  // Check if the key pressed is a letter.
  if (event.keyCode >= 49 && event.keyCode <= 90) {
    // Capture pressed key and make it lowercase.
    wordGuessGame.letterGuessed = event.key.toLowerCase();
    // Pass the guessed letter into our updatePage function to run the game logic.
    wordGuessGame.updatePage(wordGuessGame.letterGuessed);
  }
  
};
