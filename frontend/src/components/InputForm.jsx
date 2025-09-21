import { useState } from 'react'

export default function InputForm({ onSubmit, loading }) {
  const [text, setText] = useState('')
  const [url, setUrl] = useState('')
  const [formError, setFormError] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormError(null)

    if (!text.trim() && !url.trim()) {
      setFormError('Please enter text or a URL to analyze.')
      return
    }

    onSubmit({ text: text.trim() || null, url: url.trim() || null })
  }

  const handleReset = () => {
    setText('')
    setUrl('')
    setFormError(null)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-3xl bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8"
      noValidate
      aria-label="Misinformation detection form"
    >
      <fieldset disabled={loading} className="space-y-6">
        <legend className="sr-only">Input text or URL for misinformation detection</legend>

        <div>
          <label htmlFor="text-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Enter Text to Analyze
          </label>
          <textarea
            id="text-input"
            rows={6}
            className="block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="Paste or type text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            aria-describedby="text-desc"
          />
          <p id="text-desc" className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            You can enter a paragraph or article text.
          </p>
        </div>

        <div className="relative flex items-center justify-center my-4" aria-hidden="true">
          <span className="bg-white dark:bg-gray-900 px-3 text-gray-400 font-semibold">OR</span>
          <div className="absolute inset-x-0 top-1/2 border-t border-gray-300 dark:border-gray-700"></div>
        </div>

        <div>
          <label htmlFor="url-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Enter URL to Analyze
          </label>
          <input
            id="url-input"
            type="url"
            className="block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="https://example.com/article"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            aria-describedby="url-desc"
          />
          <p id="url-desc" className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Paste a link to an article or webpage.
          </p>
        </div>

        {formError && (
          <p className="text-red-600 font-semibold text-sm" role="alert" aria-live="assertive">
            {formError}
          </p>
        )}

        <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-6 py-2 text-white font-semibold shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-50"
            disabled={loading}
          >
            Analyze
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-6 py-2 text-gray-700 dark:text-gray-300 font-semibold shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-50"
            disabled={loading}
          >
            Reset
          </button>
        </div>
      </fieldset>
    </form>
  )
}