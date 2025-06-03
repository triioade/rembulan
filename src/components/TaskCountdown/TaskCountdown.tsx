import { useEffect, useState } from 'react'

const targetDate = new Date('2025-06-10T23:59:00')

function TaskCountdown() {
  const [remaining, setRemaining] = useState<string>('')

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const diff = targetDate.getTime() - now.getTime()

      if (diff <= 0) {
        setRemaining('Deadline reached!')
        clearInterval(interval)
        return
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((diff / (1000 * 60)) % 60)
      const seconds = Math.floor((diff / 1000) % 60)

      setRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="task-countdown">
      <h3>Next Task Due:</h3>
      <p>{remaining}</p>
    </div>
  )
}

export default TaskCountdown
