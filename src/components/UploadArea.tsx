import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { FiUpload, FiImage, FiX } from 'react-icons/fi'

const UploadArea = ({ onUpload, status }: { onUpload: (file: File) => void, status: string }) => {
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files)
    }
  }

  const handleFiles = (files: FileList) => {
    const file = files[0]
    if (file.type.match('image.*')) {
      onUpload(file)
    }
  }

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleChange}
        disabled={status === 'loading'}
      />
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div
          className={`border-2 border-dashed rounded-xl p-8 transition-all ${
            dragActive
              ? 'border-indigo-400 bg-indigo-900/20'
              : 'border-gray-600 hover:border-gray-500 bg-gray-800/30'
          } ${status === 'loading' ? 'opacity-70 pointer-events-none' : ''}`}
          onClick={() => fileInputRef.current?.click()}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <div className="p-4 bg-indigo-500/10 rounded-full">
              <FiImage className="w-8 h-8 text-indigo-400" />
            </div>
            <div>
              <h3 className="text-lg font-medium">
                {dragActive ? 'Drop your image here' : 'Upload an image'}
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                Drag & drop or click to browse
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="mt-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                fileInputRef.current?.click()
              }}
            >
              <FiUpload className="w-4 h-4" />
              Select File
            </motion.button>
          </div>
        </div>
      </motion.div>
      
      <div className="mt-4 text-xs text-gray-500 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
        </svg>
        Supports JPG, PNG, WEBP (Max 10MB)
      </div>
    </div>
  )
}

export default UploadArea