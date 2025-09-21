import Head from 'next/head'
import { useState } from 'react'
import InputForm from '../components/InputForm'
import ResultCard from '../components/ResultCard'
import { fetchPrediction } from '../utils/api'

export default function Home() {
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async ({ text, url }) => {
    setError(null)
    setResult(null)
    setLoading(true)
    try {
      const data = await fetchPrediction({ text, url })
      setResult(data)
    } catch (err) {
      setError(err.toString())
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>AI-Powered Misinformation Detector</title>
        <meta name="description" content="Detect misinformation using AI-powered analysis." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-500 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-8 max-w-3xl">
          AI-Powered Misinformation Detector
        </h1>

        <InputForm onSubmit={handleSubmit} loading={loading} />

        {error && (
          <div className="max-w-xl mt-6 p-4 bg-red-100 text-red-700 rounded-md shadow-md">
            <strong>Error:</strong> {error}
          </div>
        )}

        {loading && (
          <div className="mt-6">
            <svg
              className="animate-spin h-12 w-12 text-blue-600 mx-auto"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-label="Loading spinner"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          </div>
        )}

        {result && <ResultCard result={result} />}
        
        <footer className="mt-12 text-center text-gray-600 dark:text-gray-400 text-sm max-w-xl">
          <p>
            <em>This is an AI-based educational tool. Always verify with official sources.</em>
          </p>
          <p className="mt-2">&copy; 2024 AI Misinformation Detector</p>
        </footer>
      </main>
    </>
  )
}