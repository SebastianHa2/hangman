
const Game = (function gameSetUp(){
    const wrongLetters = document.getElementById('wrong-letters'), 
    wrongLettersList = document.getElementById('wrong-letters-list'),
    wordToGuess = document.getElementById('word'),
    submitButton = document.getElementById('submit-button'),
    inputContainer = document.querySelector('.background-cover'),
    notificationContainer = document.getElementById('notification-container'),
    popUp = document.getElementById('popup-container'),
    playAgainBtn = document.getElementById('play-button'),
    figure = document.querySelector('.figure-container')
    
    const guessedLetters = new Set()
    let wrongGuesses = 0
    let correctGuesses = 0

    // Inserts an empty div for each letter to guess
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

    /* Checks if the pressed key is a valid character,
        then if the character has already been guessed, if not,
        does it appear in the word or does it go to the wrongly guessed letters
    */
    function checkGuessedLetter(e) {
        const word = document.querySelector('input').value
        const letters = [...word]
        const wordLength = [...word].length
        let foundLetter = false

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
                        foundLetter = true
                        const lettersToGuess = document.querySelectorAll('.letter')
                        lettersToGuess.forEach(letterToGuess => {
                            if(letterToGuess.classList.contains(index)){
                                letterToGuess.innerHTML = letter
                                recordCorrectGuesses(wordLength)
                            }
                        })
                    }
                })

                if(foundLetter === false){
                    wrongLetters.style.visibility = 'visible'
                    const li = document.createElement('li')
                    const liText = document.createTextNode(key.toUpperCase())
                    li.appendChild(liText)
                    wrongLettersList.appendChild(li)

                    recordWrongGuesses()
                }
            }
        }  
    }

    /* Keep track if the game is won or lost when a letter is
    wrongly or correctly guessed
    */

    function recordWrongGuesses() {
        if(wrongGuesses !== 5){
            let bodyPart = document.getElementById(`body-part-${wrongGuesses}`)
            bodyPart.classList.remove('hide')
            wrongGuesses++
        }
        else if(wrongGuesses === 5){
            let bodyPart = document.getElementById(`body-part-${wrongGuesses}`)
            bodyPart.classList.remove('hide')
            animateHanging()
            setTimeout(() => {
                document.getElementById('final-message').innerHTML = 'You have lost'
                popUp.classList.remove('hide')
            }, 2000)
            wrongGuesses++
        }
    }

    // Hanging animation

    function recordCorrectGuesses(wordLength) {
        correctGuesses++
        if(correctGuesses === wordLength){
            popUp.classList.remove('hide')
        }
    }

    function animateHanging() {
        dropBody()

        document.getElementById('xEyes').classList.remove('hide')
    }

    function dropBody() {
        Velocity(document.getElementById('door1'), {rotateZ: 90}, 1000)
        Velocity(document.getElementById('door2'), {rotateZ: -90}, 1000)
        fall()
    }

    function fall() {
        let duration = 500
        let delay = 1000

        Velocity(document.getElementById('body'), {translateY: "100px"}, {duration: duration, delay: delay})
        Velocity(document.getElementById('rope'), {y2: "+=100px"}, {duration: duration, delay: delay})
        Velocity(document.getElementById('body-part-2'), {y2: "-=60px"}, {duration: duration, delay: delay})
        Velocity(document.getElementById('body-part-3'), {y2: "-=60px"}, {duration: duration, delay: delay})

        finishFall()
    }

    function finishFall() {
        Velocity(document.getElementById('body-part-2'), {y2: "+=70px", x2: "+=10px"}, 500);
        Velocity(document.getElementById('body-part-3'), {y2: "+=70px", x2: "-=10px"}, 500);
    }

    function playAgain() {
        guessedLetters.clear()
        wrongGuesses = 0
        correctGuesses = 0
        wrongLettersList.innerHTML = ''
        figure.innerHTML = `            <g id="body">
        <g id="body-part-0" class="hide">
            <circle cx="200" cy="80" r="20" stroke="black" stroke-width="5" fill="transparent"/>
        <g id="xEyes" class="hide">
            <line x1="190" y1="78" x2="196" y2="84"/>
            <line x1="204" y1="78" x2="210" y2="84"/>
            <line x1="190" y1="84" x2="196" y2="78"/>
            <line x1="204" y1="84" x2="210" y2="78"/>
        </g>
        </g>
            <line class="hide" id="body-part-1" x1="200" y1="100" x2="200" y2="150" />
            <line class="hide" id="body-part-2" x1="200" y1="120" x2="170" y2="140" />
            <line class="hide" id="body-part-3" x1="200" y1="120" x2="230" y2="140" />
            <line class="hide" id="body-part-4" x1="200" y1="150" x2="180" y2="190" />
            <line class="hide" id="body-part-5" x1="200" y1="150" x2="220" y2="190" />
        </g>
            <line x1="10" y1="250" x2="150" y2="250" />
            <line id="door1" x1="150" y1="250" x2="200" y2="250" />
            <line  id="door2" x1="200" y1="250" x2="250" y2="250" />
            <line x1="250" y1="250" x2="390" y2="250" />
            <line x1="100" y1="250" x2="100" y2="20" />
            <line x1="100" y1="20" x2="200" y2="20" />
            <line id="rope" x1="200" y1="20" x2="200" y2="60" />`
        popUp.classList.add('hide')
        inputContainer.style.visibility = 'visible'
    }
    


    // Event Listeners
    document.addEventListener('keyup', checkGuessedLetter)
    submitButton.addEventListener('click', setUpWord)
    playAgainBtn.addEventListener('click', playAgain)
})()




