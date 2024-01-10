import { useCallback, useEffect, useState } from "react";
import words from "./wordList.json"
// import './index.css'

import { Keyboard } from "./components/Keyboard";
import { HangmanDrawing } from "./components/HangmanDrawing";
import { HangmanWord } from "./components/HangmanWord";

function App() {
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])
  const [wordToGuess, setWordToGuess] = useState(() => { return words[Math.floor(Math.random() * words.length)] })
  const incorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter))

  const isWinner = wordToGuess.split("").every(letter => guessedLetters.includes(letter))
  const isLoser = incorrectLetters.length >= 6

  useEffect(() => {
    const handler = (ev: KeyboardEvent) => {
      const key = ev.key

      if (!key.match(/^[a-zA-Z]$/)) return

      ev.preventDefault()
      addGuessedLetter(key)
    }

    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [guessedLetters])

  const addGuessedLetter = useCallback((letter: string) => {
    if (guessedLetters.includes(letter)) return

    setGuessedLetters(currLetters => [...currLetters, letter])
  }, [guessedLetters])


  return (
    <div className="max-w-screen-md	mx-auto flex flex-col gap-8 items-center font-mono">

      <div className="text-3xl text-center text-lighter">
        {isWinner && "Winner! - Good job, refresh to play again"}
        {isLoser && "Nice try! refresh to play again"}
      </div>

      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      <HangmanWord guessedLetters={guessedLetters} wordToGuess={wordToGuess} />

      <div className="self-stretch">
        <Keyboard
          activeLetters={guessedLetters.filter(letter =>
            wordToGuess.includes(letter)
          )}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </div>

    </div>
  )
}

export default App
