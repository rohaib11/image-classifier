const AppFooter = () => {
  return (
    <footer className="py-6 px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
      <p>
        Powered by TensorFlow.js • All processing happens in your browser • 
        <a 
          href="https://github.com/yourusername/vision-classify" 
          target="_blank" 
          rel="noopener noreferrer"
          className="ml-2 text-gray-400 hover:text-white transition-colors"
        >
          View on GitHub
        </a>
      </p>
      <p className="mt-2">© {new Date().getFullYear()} VisionClassify</p>
    </footer>
  )
}

export default AppFooter