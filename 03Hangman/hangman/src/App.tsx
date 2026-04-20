import { useCallback, useEffect, useState } from 'react'
import { HangmanDrawing } from './HangmanDrawing'
import { HangmanWord } from './HangmanWord'
import { Keyboard } from './Keyboard'
import './App.css'
import easyWords from "./easy_word_List.json"
import mediumWords from "./medium_word_List.json"
import hardWords from "./hard_word_List.json"

// Function to get a random word based on difficulty
function getWord(difficulty: string) {
  let wordList = easyWords

  if (difficulty === "medium") wordList = mediumWords
  if (difficulty === "hard") wordList = hardWords

  return wordList[Math.floor(Math.random() * wordList.length)]
}

function App() {
  // Stores the word to guess
  const [wordToGuess, setWordToGuess] = useState("")
  
  // Stores all guessed letters
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])

  // Player info
  const [playerName, setPlayerName] = useState("")
  const [difficulty, setDifficulty] = useState("easy")
  const [gameStarted, setGameStarted] = useState(false)

  // Letters that are NOT in the word
  const inCorrectLetters = guessedLetters.filter(
    letter => !wordToGuess.includes(letter)
  )

  // Lose condition (6 wrong guesses)
  const isLoser = inCorrectLetters.length >= 6

  // Win condition (all letters guessed)
  const isWinner =
    wordToGuess.length > 0 &&
    wordToGuess.split("").every(letter => guessedLetters.includes(letter))

  // Function to add guessed letter
  const addGuessedLetter = useCallback(
    (letter: string) => {
      // Do nothing if already guessed or game finished
      if (guessedLetters.includes(letter) || isLoser || isWinner) return

      setGuessedLetters(currentLetters => [...currentLetters, letter])
    },
    [guessedLetters, isLoser, isWinner]
  )

  // Listen for keyboard input (letters)
  useEffect(() => {
    if (!gameStarted) return

    const handler = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()

      // Only allow a-z letters
      if (!key.match(/^[a-z]$/)) return

      e.preventDefault()
      addGuessedLetter(key)
    }

    document.addEventListener("keydown", handler)

    return () => {
      document.removeEventListener("keydown", handler)
    }
  }, [addGuessedLetter, gameStarted])

  // Restart game with Enter key
  useEffect(() => {
    if (!gameStarted) return

    const handler = (e: KeyboardEvent) => {
      const key = e.key
      if (key !== "Enter") return

      e.preventDefault()
      setGuessedLetters([])
      setWordToGuess(getWord(difficulty))
    }

    document.addEventListener("keydown", handler)

    return () => {
      document.removeEventListener("keydown", handler)
    }
  }, [gameStarted, difficulty])

  return (
  <div
  style={{
  width: "100%",
  maxWidth: "1000px",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  margin: "0 auto",
  padding: "16px",
  boxSizing: "border-box",
  alignItems: "center",
  justifyContent: "center",
  paddingTop: gameStarted ? "0" : "40px",
  backgroundImage: "linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url('/images/tree-texture-mirror.png'), url('/images/tree-texture.png')",
  backgroundSize: "100% 100%, 50% 100%, 50% 100%",
  backgroundPosition: "center center, left top, right top",
  backgroundRepeat: "no-repeat, no-repeat, no-repeat",
}}
    >
    {!gameStarted && <h1 style={{ marginBottom: "50px", alignItems: "center", fontSize: "48px"}}>Hangman game</h1>}  
    {/* Hangman drawing (updates dynamically based on mistakes) */}
    <HangmanDrawing numberOfGuesses={gameStarted ? inCorrectLetters.length : 0} />
    
    {/* Start screen (shown before the game starts) */}
    {!gameStarted && (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "300px"          
        }}
      >
        
        {/* Player name input */}
        <input
          style={{marginTop: "40px"}}
          type="text"
          placeholder="Enter your name (3 to 12 charasters)"
          value={playerName}
          onChange={(e) => {
            const value = e.target.value

            if (/^[a-zA-Z\s]*$/.test(value)) {
              setPlayerName(value.slice(0, 12))
            }
          }}
        />

        {/* Difficulty selection */}
        <select
          
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        {/* Start game button */}
        <button
          
          onClick={() => {
            const cleanName = playerName.trim().replace(/\s+/g, " ")
            if (cleanName.length < 3) return

            setPlayerName(cleanName)
            setGuessedLetters([])
            setWordToGuess(getWord(difficulty))
            setGameStarted(true)
          }}
        >
          Start game
        </button>
      </div>
    )}

    {/* Game screen (shown after start) */}
    {gameStarted && (
      <>
        {/* Player info + navigation */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <h3 style={{ marginBottom: "10px" }}>
            Player: {playerName} | Difficulty: {difficulty}
          </h3>
          <p style={{ marginBottom: "20px" }}>Press ENTER to restart</p>

          
        </div>

        {/* Word display (updates dynamically) */}
        <HangmanWord
          reveal={isLoser}
          guessedLetters={guessedLetters}
          wordToGuess={wordToGuess}
        />

        {/* Keyboard (interactive buttons) */}
        <div style={{ display: "flex", justifyContent: "center"  }}>
          <Keyboard
            disabled={isWinner || isLoser}
            activeLetters={guessedLetters.filter(letter =>
              wordToGuess.includes(letter)
            )}
            inactiveLetters={inCorrectLetters}
            addGuessedLetter={addGuessedLetter}
          />
        </div>
      </>
    )}

    {/* Modal popup (appears when game ends) */}
    {(isWinner || isLoser) && (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.4)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000
        }}
      >
        <div
          style={{
            background: "white",
            padding: "2rem",
            borderRadius: "12px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            minWidth: "280px"
          }}
        >
          {/* Result text */}
          <h2 style={{ margin: 0 }}>
            {isWinner && `Winner, ${playerName}!`}
            {isLoser && `Nice try, ${playerName}!`}
          </h2>

          {/* Action buttons */}
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap"
            }}
          >
            {/* Restart game */}
            <button
              onClick={() => {
                setGuessedLetters([])
                setWordToGuess(getWord(difficulty))
              }}
            >
              Play again
            </button>

            {/* Back to start screen */}
            <button
              onClick={() => {
                setGuessedLetters([])
                setGameStarted(false)
                setPlayerName("")
              }}
            >
              Back to start
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
)}

export default App