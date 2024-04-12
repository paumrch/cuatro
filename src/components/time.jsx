import React, { useState, useEffect } from "react"

export default function Time() {
  const [showTimer, setShowTimer] = useState(false);
  const [currentTime, setCurrentTime] = useState(() => {
    const date = new Date()
    const hours = date.getHours().toString().padStart(2, "0")
    const minutes = date.getMinutes().toString().padStart(2, "0")
    const seconds = date.getSeconds().toString().padStart(2, "0")
    return `${hours}:${minutes}:${seconds}`
  })

  useEffect(() => {
    setShowTimer(true); // Mostrar el temporizador una vez que el componente se haya montado en el cliente

    const interval = setInterval(() => {
      const date = new Date()
      const hours = date.getHours().toString().padStart(2, "0")
      const minutes = date.getMinutes().toString().padStart(2, "0")
      const seconds = date.getSeconds().toString().padStart(2, "0")
      setCurrentTime(`${hours}:${minutes}:${seconds}`)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <p suppressHydrationWarning>
      {showTimer ? currentTime : null}
    </p>
  )
}
