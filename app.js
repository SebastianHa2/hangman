
const Game = (function gameSetUp(){
    const wrongLetters = document.getElementById('wrong-letters'), 
    wrongLettersList = document.getElementById('wrong-letters-list'),
    wordToGuess = document.getElementById('word'),
    submitButton = document.getElementById('submit-button'),
    inputContainer = document.querySelector('.background-cover'),
    notificationContainer = document.getElementById('notification-container')
    
    const guessedLetters = new Set()

    function setUpWord(){
        const word = document.querySelector('input').value
        const wordLength = [...word].length
        let letterLinesToInsert = ''
        for(let i=0; i<wordLength; i++){
            letterLinesToInsert += `<div class="letter ${i}"></div>`
        }
        wordToGuess.innerHTML = letterLinesToInsert
        inputContainer.style.visibility = 'hidden'
    }

    function checkGuessedLetter(e) {
        const word = document.querySelector('input').value
        const letters = [...word]

        const key = String.fromCharCode(e.keyCode).toLowerCase()

        if(inputContainer.style.visibility === 'hidden'){
            if(guessedLetters.has(key)){
                notificationContainer.classList.remove('shift-down')
                setTimeout(() => {
                    notificationContainer.classList.add('shift-down')
                }, 2000)
            }
            else{
                guessedLetters.add(key)
                letters.forEach((letter, index) => {
                    if(key == letter){
                        const lettersToGuess = document.querySelectorAll('.letter')
                        lettersToGuess.forEach(letterToGuess => {
                            if(letterToGuess.classList.contains(index)){
                                letterToGuess.innerHTML = letter
                            }
                        })
                    }
                })
            }
        }  
    }
    document.addEventListener('keyup', checkGuessedLetter)


    submitButton.addEventListener('click', setUpWord)
})()




