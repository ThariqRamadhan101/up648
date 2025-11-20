import { useState } from 'react';
import { askAi } from '../api/ai';

export function AiChatPanel() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAsk() {
    const q = question.trim();
    if (!q) return;
    setLoading(true);
    setError(null);
    setAnswer(null);
    try {
      const resp = await askAi(q);
      setAnswer(resp);
    } catch (e: any) {
      console.error(e);
      setError(e?.message ?? 'Failed to contact AI assistant');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm w-full flex flex-col gap-3">
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">
          AI Assistant
        </label>
        <p className="text-xs text-gray-500 mb-2">
          Ask questions about the current tasks, provinces, and indicators. The assistant uses the same data as the dashboard.
        </p>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows={3}
          className="w-full border rounded-md px-2 py-1 text-sm bg-gray-900 text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
          placeholder="e.g. Summarize projects in Jambi that are still in construction stage."
        />
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleAsk}
          disabled={loading}
          className="inline-flex items-center px-3 py-1.5 rounded-md bg-orange-600 text-white text-sm font-medium hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Thinking…' : 'Ask AI'}
        </button>
        {error && (
          <span className="text-xs text-red-600 truncate max-w-xs">
            {error}
          </span>
        )}
      </div>
      {answer && (
        <div className="mt-2 text-sm text-gray-900 whitespace-pre-wrap border-t pt-3">
          {answer}
        </div>
      )}
    </div>
  );
}
