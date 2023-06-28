document.addEventListener('DOMContentLoaded', () => {
  // Data flashcards
  var flashcards = [];

  var flashcardIndex = 0;
  var isQuestionDisplayed = true;

  var questionElement = document.getElementById('question');
  var flipButton = document.getElementById('flip-button');
  var nextButton = document.getElementById('next-button');
  var rememberedButton = document.getElementById('remembered-button');
  var notrememberedButton = document.getElementById('notremembered-button');

  // Function to update the content of the flashcard
  function updateFlashcard() {
    var flashcard = flashcards[flashcardIndex];
    questionElement.textContent = isQuestionDisplayed ? flashcard.question : flashcard.answer;
  }

  // Flip/show the answer on the flashcard
  flipButton.addEventListener('click', function() {
    isQuestionDisplayed = !isQuestionDisplayed;
    updateFlashcard();
  });

  rememberedButton.addEventListener('click', function() {
    flashcards[flashcardIndex].remembered = true;
    console.log(flashcardIndex)
    updateFlashcard();
  });

  notrememberedButton.addEventListener('click', function() {
    flashcards[flashcardIndex].remembered = false;
    updateFlashcard();
  });

  // Move to the next flashcard
  nextButton.addEventListener('click', function() {
    do {
    flashcardIndex = (flashcardIndex + 1) % flashcards.length;
    } while(flashcards[flashcardIndex].remembered == true);
    isQuestionDisplayed = true;
    updateFlashcard();
  });

  // Load questions and answers from the CSV file
  function loadFlashcardsFromCSV(csvData) {
    var lines = csvData.split('\n');
    flashcards = lines.map(function(line) {
      var [question, answer] = line.split(',');
      return { question: question, answer: answer, remembered: false};
    });
    console.log(flashcards);
  }

  // Fetch the CSV file and load it
  function fetchFlashcardsCSV() {
    fetch('flashcards.csv')
      .then(function(response) {
        return response.text();
      })
      .then(function(data) {
        loadFlashcardsFromCSV(data);
        updateFlashcard();
      })
      .catch(function(error) {
        console.log('Error fetching flashcards CSV:', error);
      });
  }

  // Initialize the first flashcard after the document has loaded
  fetchFlashcardsCSV();
});
