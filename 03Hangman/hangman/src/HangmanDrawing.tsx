
/*n��d on tegemist d�naamilise kujutisega ja sellep�rast paneme erladi constanti alla*/
const HEAD = (numberOfGuesses: number) => {
  let eyeStyle = {}
  let mouthStyle = {}

  // 😐 normal
  eyeStyle = {
    width: "6px",
    height: "6px",
    background: "black",
    borderRadius: "50%"
  }

  mouthStyle = {
    width: "20px",
    height: "10px",
    borderBottom: "3px solid black",
    borderRadius: "0 0 20px 20px"
  }

  // 😨 scared
  if (numberOfGuesses >= 2) {
    eyeStyle = {
      width: "10px",
      height: "10px",
      background: "black",
      borderRadius: "50%"
    }

    mouthStyle = {
      width: "20px",
      height: "10px",
      borderTop: "3px solid black",
      borderRadius: "20px 20px 0 0"
    }
  }

  // 😱 panic
  if (numberOfGuesses >= 4) {
    eyeStyle = {
      width: "12px",
      height: "12px",
      background: "black",
      borderRadius: "50%"
    }

    mouthStyle = {
      width: "8px",
      height: "8px",
      background: "black",
      borderRadius: "50%"
    }
  }

  // 💀 dead
 if (numberOfGuesses >= 6) {
  return (
    <div
      style={{
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        backgroundColor: "#FFD93D",
        position: "absolute",
        top: "50px",
        right: "-25px",
        
      }}
    >
      {/* LEFT X */}
      <div style={{
        position: "absolute",
        top: "20px",
        left: "15px"
      }}>
        <div style={{
          width: "10px",
          height: "2px",
          background: "black",
          transform: "rotate(45deg)"
        }} />
        <div style={{
          width: "10px",
          height: "2px",
          background: "black",
          transform: "rotate(-45deg)",
          position: "absolute",
          top: 0
        }} />
      </div>

      {/* RIGHT X */}
      <div style={{
        position: "absolute",
        top: "20px",
        right: "15px"
      }}>
        <div style={{
          width: "10px",
          height: "2px",
          background: "black",
          transform: "rotate(45deg)"
        }} />
        <div style={{
          width: "10px",
          height: "2px",
          background: "black",
          transform: "rotate(-45deg)",
          position: "absolute",
          top: 0
        }} />
      </div>

      {/* Mouth */}
      <div
        style={{
          width: "20px",
          height: "2px",
          background: "black",
          position: "absolute",
          bottom: "12px",
          left: "50%",
          transform: "translateX(-50%)"
        }}
      />
    </div>
  )
}

  return (
    <div
      style={{
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        backgroundColor: "#FFD93D",
        position: "absolute",
        top: "50px",
        right: "-25px",
        
      }}
    >
      {/* Left eye */}
      <div
        style={{
          ...eyeStyle,
          position: "absolute",
          top: "18px",
          left: "15px"
        }}
      />

      {/* Right eye */}
      <div
        style={{
          ...eyeStyle,
          position: "absolute",
          top: "18px",
          right: "15px"
        }}
      />

      {/* Mouth */}
      <div
        style={{
          ...mouthStyle,
          position: "absolute",
          bottom: "12px",
          left: "50%",
          transform: "translateX(-50%)"
        }}
      />
    </div>
  )
}

const BODY = (
    <div
        style={{
            width: "10px",
            height: "110px",
            backgroundColor: "#FFD93D",
            position: "absolute",
            top: "110px",
            right: 0
        }}
    />
)

const RIGHT_ARM = (
    <div
        style={{
            width: "90px",
            height: "10px",
            backgroundColor: "#FFD93D",
            position: "absolute",
            top: "140px",
            right: "-90px",
            transform: "rotate(-30deg)",
            transformOrigin: "left bottom"
        }}
    />
)

const LEFT_ARM = (
    <div
        style={{
            width: "90px",
            height: "10px",
            backgroundColor: "#FFD93D",
            position: "absolute",
            top: "140px",
            right: "10px",
            transform: "rotate(30deg)",
            transformOrigin: "right bottom"
        }}
    />
)

const RIGHT_LEG = (
    <div
        style={{
            width: "130px",
            height: "10px",
            backgroundColor: "#FFD93D",
            position: "absolute",
            top: "210px",
            right: "-120px",
            transform: "rotate(60deg)",
            transformOrigin: "left bottom"
        }}
    />
)

const LEFT_LEG = (
    <div
        style={{
            width: "130px",
            height: "10px",
            backgroundColor: "#FFD93D",
            position: "absolute",
            top: "210px",
            right: "0px",
            transform: "rotate(-60deg)",
            transformOrigin: "right bottom"
        }}
    />
)

const BODY_PARTS = [
  (n: number) => HEAD(n),
  () => BODY,
  () => RIGHT_ARM,
  () => LEFT_ARM,
  () => RIGHT_LEG,
  () => LEFT_LEG
]



type HangmanDrawingProps = {
    numberOfGuesses: number
}

export function HangmanDrawing({ numberOfGuesses } : HangmanDrawingProps) {
    return (
        /*alguses tuleb teha jalam koos postiga*/
        <div style={{ position: "relative" }}>
            {BODY_PARTS.slice(0, numberOfGuesses).map((part, i) => (
            <div key={i}>{part(numberOfGuesses)}</div>
            ))}
            <div
                style={{
                    height: "50px",
                    width: "10px",
                    backgroundColor: "#e0b84c",
                    position: "absolute",
                    top: 0,
                    right: 0
                }}
            />
            <div
                style={{
                    height: "10px",
                    width: "200px",
                    backgroundColor: "#5c3b1e",
                    marginLeft: "120px"
                }}
            />
            <div
                style={{
                    height: "400px",
                    width: "10px",
                    backgroundColor: "#5c3b1e",
                    marginLeft: "120px"
                }}
            />
            <div
                style={{
                    height: "10px",
                    width: "250px",
                    backgroundColor: "#5c3b1e"
                }}
            />

        </div>
    )
}