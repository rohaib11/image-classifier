import { motion } from 'framer-motion'
import { FiCpu, FiDownload } from 'react-icons/fi'

const ModelLoader = ({ progress }: { progress: number }) => {
  const circumference = 2 * Math.PI * 40
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center py-12 glass-effect rounded-2xl"
    >
      <div className="relative w-32 h-32 mb-6">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            className="text-gray-700"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r="40"
            cx="50"
            cy="50"
          />
          <circle
            className="text-indigo-500"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="40"
            cx="50"
            cy="50"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <FiCpu className="w-12 h-12 text-indigo-400" />
        </div>
      </div>
      
      <h3 className="text-lg font-medium mb-2">Loading AI Model</h3>
      <p className="text-gray-400 mb-6 text-center max-w-xs">
        Downloading the neural network (≈5MB)...
      </p>
      
      <div className="w-full max-w-xs bg-gray-700 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="mt-4 flex items-center gap-2 text-sm text-gray-400">
        <FiDownload className="w-4 h-4" />
        <span>{progress}% complete</span>
      </div>
    </motion.div>
  )
}

export default ModelLoader