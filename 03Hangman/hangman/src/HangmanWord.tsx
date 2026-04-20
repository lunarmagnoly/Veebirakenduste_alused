type HangmanWordProps = {
    guessedLetters: string[]
    wordToGuess: string
    reveal?: boolean
}


export function HangmanWord({guessedLetters , wordToGuess, reveal = false }: 
    HangmanWordProps) {

        //const word = "test"
        //guessedLetters = ["t", "e", "s"]

    return (
        <div 
            style={{ 
                display: "flex", 
                gap: ".25em", 
                fontSize: "clamp(24px, 5vw, 60px)", 
                fontWeight: "bold", 
                textTransform: "uppercase",
                fontFamily: "monospace",
                }}
            >
                {wordToGuess.split("").map((letter, index) => (
                  <span
                    key={index}
                    style={{
                        borderBottom: "clamp(2px, 0.5vw, 4px) solid black",
                        width: "clamp(20px, 5vw, 60px)",
                        display: "inline-flex",
                        justifyContent: "center",
                        alignItems: "flex-end"
                    }}
                    >
                    <span
                      style={{
                        visibility: guessedLetters.includes(letter) || reveal 
                            ? "visible" 
                            : "hidden",
                        color: !guessedLetters.includes(letter) && reveal 
                            ? "red" 
                            : "black",
                        marginBottom: "6px"    
                      }}                    
                    >
                        {letter}
                    </span>
                </span>  
            ))}
        </div>
    )
}