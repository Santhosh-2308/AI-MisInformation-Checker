export default function ResultCard({ result }) {
  if (!result) return null

  const { label, confidence, explanation, tips, wiki_matches } = result

  const labelStyles = {
    "Likely True": "bg-green-100 text-green-800",
    "Likely False": "bg-red-100 text-red-800",
    Uncertain: "bg-yellow-100 text-yellow-800",
  }

  return (
    <section
      aria-live="polite"
      className="max-w-3xl w-full mt-10 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8"
    >
      <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Analysis Result</h2>

      <div className="flex items-center space-x-4 mb-6">
        <span
          className={`inline-block px-4 py-2 rounded-full font-semibold text-lg ${labelStyles[label] || 'bg-gray-100 text-gray-800'}`}
          aria-label={`Prediction label: ${label}`}
        >
          {label}
        </span>
        <span className="text-gray-600 dark:text-gray-300 font-medium" aria-label="Confidence score">
          Confidence: {(confidence * 100).toFixed(1)}%
        </span>
      </div>

      <p className="text-gray-700 dark:text-gray-300 mb-6">{explanation}</p>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Tips to Spot Misinformation</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
          {tips.map((tip, idx) => (
            <li key={idx}>{tip}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Wikipedia Snippets</h3>
        {wiki_matches.length === 0 ? (
          <p className="italic text-gray-500 dark:text-gray-400">No relevant Wikipedia information found.</p>
        ) : (
          <ul className="list-disc list-inside space-y-2 max-h-48 overflow-y-auto text-gray-700 dark:text-gray-300 pr-2">
            {wiki_matches.map((snippet, idx) => (
              <li key={idx}>{snippet}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}