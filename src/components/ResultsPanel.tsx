import { motion, AnimatePresence } from 'framer-motion'
import { FiActivity, FiCpu, FiInfo } from 'react-icons/fi'

const ResultsPanel = ({ 
  predictions, 
  status, 
  model 
}: { 
  predictions: any[], 
  status: string, 
  model: string | null 
}) => {
  return (
    <div className="glass-effect rounded-2xl shadow-xl h-full overflow-hidden">
      <div className="p-5 border-b border-gray-700/50 flex items-center justify-between">
        <h3 className="font-medium flex items-center gap-2">
          <FiActivity className="text-indigo-400" />
          Results
        </h3>
        {model && (
          <div className="text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded flex items-center gap-1">
            <FiCpu className="w-3 h-3" />
            {model}
          </div>
        )}
      </div>
      
      <div className="p-5">
        <AnimatePresence>
          {status === 'loading' ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-8"
            >
              <div className="relative w-16 h-16 mb-4">
                <div className="absolute inset-0 rounded-full border-4 border-t-indigo-500 border-r-blue-500 border-b-pink-500 border-l-transparent animate-spin"></div>
                <div className="absolute inset-2 rounded-full border-4 border-t-transparent border-r-transparent border-b-transparent border-l-gray-300 animate-spin-reverse"></div>
              </div>
              <p className="text-gray-400">Analyzing image...</p>
            </motion.div>
          ) : predictions.length > 0 ? (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-400">Top Prediction</h4>
                <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 p-4 rounded-xl border border-indigo-500/30">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium truncate">{predictions[0].className}</h3>
                      <p className="text-xs text-gray-400 mt-1">
                        Confidence
                      </p>
                    </div>
                    <div className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                      {(predictions[0].probability * 100).toFixed(1)}%
                    </div>
                  </div>
                  <div className="mt-3 w-full bg-gray-700 rounded-full h-1.5">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-purple-500 h-1.5 rounded-full"
                      style={{ width: `${predictions[0].probability * 100}%` }}
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-400">Other Predictions</h4>
                <div className="space-y-2">
                  {predictions.slice(1, 5).map((pred, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-gray-700/30 hover:bg-gray-700/50 p-3 rounded-lg border border-gray-600/30 transition-colors"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm truncate">{pred.className}</span>
                        <span className="text-sm font-medium text-gray-300">
                          {(pred.probability * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="mt-2 w-full bg-gray-600 rounded-full h-1">
                        <div
                          className="bg-gradient-to-r from-indigo-400/70 to-purple-400/70 h-1 rounded-full"
                          style={{ width: `${pred.probability * 100}%` }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-8 text-center"
            >
              <div className="p-3 bg-gray-700/50 rounded-full mb-3">
                <FiInfo className="w-6 h-6 text-gray-500" />
              </div>
              <h4 className="font-medium text-gray-300">No results yet</h4>
              <p className="text-sm text-gray-500 mt-1 max-w-xs">
                Upload an image and click "Classify" to see predictions
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ResultsPanel