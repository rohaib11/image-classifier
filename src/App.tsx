import { useEffect, useState, useRef } from 'react'
import * as tf from '@tensorflow/tfjs'
import * as mobilenet from '@tensorflow-models/mobilenet'
import { motion, AnimatePresence } from 'framer-motion'
import AppHeader from './components/AppHeader'
import AppFooter from './components/AppFooter'
import UploadArea from './components/UploadArea'
import ResultsPanel from './components/ResultsPanel'
import ModelLoader from './components/ModelLoader'

const App = () => {
  const [model, setModel] = useState<mobilenet.MobileNet | null>(null)
  const [image, setImage] = useState<string | null>(null)
  const [predictions, setPredictions] = useState<any[]>([])
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle')
  const [activeTab, setActiveTab] = useState<'classify' | 'history'>('classify')
  const [progress, setProgress] = useState(0)
  const appRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadModel = async () => {
      setStatus('loading')
      try {
        await tf.ready()
        
        const model = await mobilenet.load({
          version: 2,
          alpha: 1.0
        })
        
        setModel(model)
        setStatus('ready')
        
        // Warm up the model
        const warmupTensor = tf.zeros([1, 224, 224, 3])
        await model.classify(warmupTensor as tf.Tensor3D)
        tf.dispose(warmupTensor)
      } catch (err) {
        console.error('Model loading error:', err)
        setStatus('error')
      }
    }

    loadModel()

    return () => {
      if (model) {
        tf.disposeVariables()
      }
    }
  }, [])

  const handleImageUpload = async (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      setImage(e.target?.result as string)
      setPredictions([])
    }
    reader.readAsDataURL(file)
  }

  const classifyImage = async () => {
    if (!model || !image) return
    
    setStatus('loading')
    try {
      const imgElement = document.createElement('img')
      imgElement.src = image
      
      await new Promise((resolve) => {
        imgElement.onload = resolve
      })
      
      const results = await model.classify(imgElement)
      setPredictions(results)
      setStatus('ready')
    } catch (err) {
      console.error('Classification error:', err)
      setStatus('error')
    }
  }

  return (
    <div ref={appRef} className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-indigo-500/10"
            initial={{
              x: Math.random() * 100,
              y: Math.random() * 100,
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
              opacity: 0.1
            }}
            animate={{
              x: [null, Math.random() * 100],
              y: [null, Math.random() * 100],
              opacity: [0.1, Math.random() * 0.2 + 0.1]
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        <AppHeader />
        
        <main className="flex-1 container mx-auto px-4 py-8 flex flex-col">
          {status === 'loading' && progress < 100 ? (
            <ModelLoader progress={progress} />
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex-1 flex flex-col lg:flex-row gap-8"
            >
              {/* Left panel */}
              <div className="flex-1 glass-effect rounded-2xl shadow-xl overflow-hidden">
                <div className="flex border-b border-gray-700/50">
                  <button
                    onClick={() => setActiveTab('classify')}
                    className={`flex-1 py-4 font-medium transition-colors ${
                      activeTab === 'classify' 
                        ? 'text-white bg-indigo-600/50' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Image Classification
                  </button>
                  <button
                    onClick={() => setActiveTab('history')}
                    className={`flex-1 py-4 font-medium transition-colors ${
                      activeTab === 'history' 
                        ? 'text-white bg-indigo-600/50' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    History
                  </button>
                </div>
                
                <div className="p-6">
                  <AnimatePresence mode="wait">
                    {activeTab === 'classify' ? (
                      <motion.div
                        key="classify"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <UploadArea 
                          onUpload={handleImageUpload} 
                          status={status}
                        />
                        
                        {image && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-6"
                          >
                            <div className="relative group">
                              <img
                                src={image}
                                alt="Uploaded preview"
                                className="w-full h-auto max-h-96 object-contain rounded-xl shadow-lg"
                              />
                              <button
                                onClick={() => setImage(null)}
                                className="absolute top-3 right-3 bg-red-500/90 hover:bg-red-600 text-white p-2 rounded-full transition-all transform hover:scale-110 shadow-lg"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                              </button>
                            </div>
                            
                            <button
                              onClick={classifyImage}
                              disabled={status === 'loading'}
                              className={`mt-6 w-full py-3 px-6 rounded-xl font-medium flex items-center justify-center space-x-2 transition-all ${
                                status === 'loading'
                                  ? 'bg-gray-600 cursor-not-allowed'
                                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                              }`}
                            >
                              {status === 'loading' ? (
                                <>
                                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                  <span>Processing...</span>
                                </>
                              ) : (
                                <>
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                  </svg>
                                  <span>Classify Image</span>
                                </>
                              )}
                            </button>
                          </motion.div>
                        )}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="history"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                        className="text-center py-12"
                      >
                        <div className="text-gray-400">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p className="text-lg">History feature coming soon!</p>
                          <p className="mt-2 text-sm">We're working on saving your classification history.</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              
              {/* Right panel */}
              <div className="lg:w-96 flex-shrink-0">
                <ResultsPanel 
                  predictions={predictions} 
                  status={status}
                  model={model ? 'MobileNet v2' : null}
                />
              </div>
            </motion.div>
          )}
        </main>
        
        <AppFooter />
      </div>
    </div>
  )
}

export default App