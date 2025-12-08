'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LoadingScreenProps {
  onLoadingComplete?: () => void
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [score, setScore] = useState(0)
  const [missed, setMissed] = useState(0)
  const [fallingBooks, setFallingBooks] = useState<Array<{
    id: number
    emoji: string
    left: number
    caught: boolean
  }>>([])

  const bookEmojis = ['📕', '📗', '📘', '📙', '📔', '📖']

  // Create falling book
  const createFallingBook = useCallback(() => {
    if (progress >= 100) return

    const newBook = {
      id: Date.now(),
      emoji: bookEmojis[Math.floor(Math.random() * bookEmojis.length)],
      left: Math.random() * 85,
      caught: false
    }

    setFallingBooks(prev => [...prev, newBook])

    // Remove book after animation (4 seconds)
    setTimeout(() => {
      setFallingBooks(prev => {
        const book = prev.find(b => b.id === newBook.id)
        if (book && !book.caught) {
          setMissed(m => m + 1)
        }
        return prev.filter(b => b.id !== newBook.id)
      })
    }, 4000)
  }, [progress])

  // Catch book handler
  const catchBook = (bookId: number) => {
    setFallingBooks(prev =>
      prev.map(book =>
        book.id === bookId ? { ...book, caught: true } : book
      )
    )
    setScore(s => s + 1)
  }

  // Progress simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const increment = Math.random() * 12 + 3
        const newProgress = Math.min(prev + increment, 100)
        
        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsLoading(false)
            onLoadingComplete?.()
          }, 1000)
        }
        
        return newProgress
      })
    }, 600)

    return () => clearInterval(interval)
  }, [onLoadingComplete])

  // Book spawner
  useEffect(() => {
    const bookInterval = setInterval(() => {
      createFallingBook()
    }, 1200)

    return () => clearInterval(bookInterval)
  }, [createFallingBook])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-[#FFF8E7] via-[#FFE8B3] to-[#FFF8E7]"
        >
          {/* Animated Book Logo */}
          <div className="relative mb-12">
            <motion.div
              animate={{
                y: [0, -15, 0],
                rotate: [0, 2, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative w-36 h-36"
            >
              {/* Sparkles */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                  className="absolute w-2 h-2 bg-[#FFC428] rounded-full"
                  style={{
                    top: i === 0 ? '10%' : i === 1 ? '20%' : '80%',
                    left: i === 0 || i === 2 ? '15%' : 'auto',
                    right: i === 1 || i === 3 ? '15%' : 'auto',
                    bottom: i === 2 || i === 3 ? '15%' : 'auto'
                  }}
                />
              ))}

              {/* Left Book Page */}
              <motion.div
                animate={{ rotateY: [0, -25, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute left-0 top-5 w-[70px] h-[100px] bg-[#FFC428] rounded-lg border-r-[3px] border-[#1A1A1A]"
              />

              {/* Book Spine */}
              <div className="absolute left-1/2 top-5 w-3 h-[100px] -translate-x-1/2 bg-gradient-to-b from-[#FFD56B] to-[#FFC428] rounded shadow-lg shadow-[#FFC428]/40" />

              {/* Right Book Page */}
              <motion.div
                animate={{ rotateY: [0, 25, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                className="absolute right-0 top-5 w-[70px] h-[100px] bg-[#FFC428] rounded-lg border-l-[3px] border-[#1A1A1A]"
              />

              {/* T B Letters */}
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-2 text-5xl font-extrabold text-[#1A1A1A]"
                style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}
              >
                <span>T</span>
                <span>B</span>
              </motion.div>
            </motion.div>
          </div>

          {/* Game Container */}
          <div className="text-center">
            <h2 className="text-xl font-semibold text-[#1A1A1A] mb-2">
              📚 Tangkap Buku yang Jatuh!
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Klik buku sebelum jatuh ke bawah
            </p>

            {/* Game Area */}
            <div className="relative w-80 h-44 bg-white/60 border-3 border-[#FFC428] rounded-2xl mx-auto mb-5 overflow-hidden shadow-lg shadow-[#FFC428]/20">
              {fallingBooks.map(book => (
                <motion.div
                  key={book.id}
                  initial={{ top: -50 }}
                  animate={book.caught ? {
                    scale: [1, 1.3, 0],
                    rotate: [0, 10, 20],
                    opacity: [1, 1, 0]
                  } : {
                    top: '100%'
                  }}
                  transition={book.caught ? {
                    duration: 0.4
                  } : {
                    duration: 4,
                    ease: 'linear'
                  }}
                  onClick={() => !book.caught && catchBook(book.id)}
                  className={`absolute w-9 h-11 bg-gradient-to-br from-[#FFC428] to-[#FFD56B] border-2 border-[#1A1A1A] rounded flex items-center justify-center text-xl ${!book.caught ? 'cursor-pointer hover:scale-110' : 'pointer-events-none'} transition-transform`}
                  style={{ left: `${book.left}%` }}
                >
                  {book.emoji}
                </motion.div>
              ))}
            </div>

            {/* Score */}
            <div className="flex justify-center gap-8 mb-8">
              <div className="text-base font-semibold text-[#1A1A1A]">
                Tertangkap: <span className="text-2xl font-extrabold text-[#FFC428]">{score}</span>
              </div>
              <div className="text-base font-semibold text-[#1A1A1A]">
                Terlewat: <span className="text-2xl font-extrabold text-[#FFC428]">{missed}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-80 mx-auto">
              <div className="text-sm font-semibold text-[#1A1A1A] mb-3">
                Memuat perpustakaan... {Math.floor(progress)}%
              </div>
              <div className="w-full h-2.5 bg-white/60 border-2 border-[#FFC428] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#FFC428] via-[#FFD56B] to-[#FFC428] rounded-full"
                  style={{ width: `${progress}%` }}
                  animate={{
                    backgroundPosition: ['200% 0', '-200% 0']
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoadingScreen