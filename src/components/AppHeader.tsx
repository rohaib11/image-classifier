import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiTwitter, FiMoon, FiSun } from 'react-icons/fi'

const AppHeader = () => {
  const [darkMode, setDarkMode] = useState(true)

  return (
    <header className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
            AI
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
            VisionClassify
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-4"
        >
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-gray-800/50 transition-colors text-gray-400 hover:text-gray-200"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
          </button>
          
          <a
            href="https://github.com/yourusername/vision-classify"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-gray-800/50 transition-colors text-gray-400 hover:text-gray-200"
            aria-label="GitHub repository"
          >
            <FiGithub className="w-5 h-5" />
          </a>
          
          <a
            href="https://twitter.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-gray-800/50 transition-colors text-gray-400 hover:text-gray-200"
            aria-label="Twitter profile"
          >
            <FiTwitter className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </header>
  )
}

export default AppHeader