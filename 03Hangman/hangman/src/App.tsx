import { useCallback, useEffect, useState } from 'react'
import words from "./wordList.json"
import { HangmanDrawing } from './HangmanDrawing'
import { HangmanWord } from './HangmanWord'
import { Keyboard } from './Keyboard'
import './App.css'

//see funktsioon tagastab suvalise sõna wordList.json failist
function getWord() {
  return words[Math.floor(Math.random() * words.length)]
}

function App() {

  //sõnade salvestamine array sisse on kõige lihtsam
  //Stringi kasutan kuna viitan, et on tegemist ainult stringiga
  const [wordToGuess, setWordToGuess] = useState(getWord)
  //string on loetelu e massiivis
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])

  //filtreerib välja tähti, mis ei ole arvtavas sõnas
  const inCorrectLetters = guessedLetters.filter(
    letter => !wordToGuess.includes(letter)
  )

  //kui oled pakkunud valesid t'hti kuus korda, siis kaotad
  const isLoser = inCorrectLetters.length >= 6

  //v]idu sildi kuvamine
  //kasutage spliti ja every
  const isWinner = wordToGuess
      .split("")
      .every(letter => guessedLetters.includes(letter))

      //see j'tab meelde funktsiooni
      //et ei loodaks seda uuesti igas ts[klis
  const addGuessedLetter = useCallback
      ((letter: string) => {
        //isLoser ja isWinner ja vastavalt sellele annab tulemuse
        if (guessedLetters.includes(letter) || isLoser || isWinner)
          return
        //funktsioon on edasi antud setter, v]ta praegune olek ja returni uus versioon v]i situatsion
        //funktsionaalne update, v'listab bugisid uuenduse k'igus
        setGuessedLetters(currentLetters => [...currentLetters, letter])
        },
        [guessedLetters, isLoser, isWinner]
      )

      useEffect(() => {
        const handler = (e: KeyboardEvent) => {
          const key = e.key
          if (!key.match(/^[a-z]$/)) return

          e.preventDefault()
          addGuessedLetter(key)
        }

        document.addEventListener("keypress", handler)

        return () => {
          document.removeEventListener("keypress", handler)
        }
      }, [guessedLetters])

      useEffect(() => {
        const handler = (e: KeyboardEvent) => {
          const key = e.key
          if (key !== "Enter") return

          e.preventDefault()
          setGuessedLetters([])
          setWordToGuess(getWord())
        }

        document.addEventListener("keypress", handler)

        return () => {
          document.removeEventListener("keypress", handler)
        }
      }, [])

  return (
    <div
      style={{
        maxWidth: "800px",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        margin: "0 auto",
        alignItems: "center"
      }}
      >
        <div style={{ fontSize: "2rem", textAlign: "center"}}>
            {isWinner && "Winner! - Refresh to try again"}
            {isLoser && "Nice try! - Refresh to try again"}
        </div>

        {/* kutsume esile erinevad komponendid */}
        <HangmanDrawing numberOfGuesses={inCorrectLetters.length} />
        <HangmanWord reveal={isLoser} guessedLetters={guessedLetters} wordToGuess={wordToGuess} />

        <div style={{ alignSelf: "stretch"}}>
            <Keyboard 
              disabled={isWinner || isLoser}
              activeLetters={guessedLetters.filter(letter =>
              wordToGuess.includes(letter)
            )}
              inactiveLetters={inCorrectLetters}
              addGuessedLetter={addGuessedLetter}
            />
        </div>

    </div>
  )
}

export default App
