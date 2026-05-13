import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client.js';
import Alert from '../components/Alert.jsx';
import { SERVER_URL } from '../config.js';

export default function HomePage() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);
    setLoading(true);
    try {
      const { data } = await api.post('/shorten', { originalUrl: url });
      setResult(data);
      setUrl('');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const shortUrl = result ? `${SERVER_URL}/${result.shortCode}` : '';

  const copy = async () => {
    await navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-56px)] px-4">
      {/* Hero */}
      <div className="text-center mb-10 max-w-xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
          Shorten any URL <br />
          <span className="text-blue-600">instantly & free</span>
        </h1>
        <p className="text-gray-500 text-lg">
          No sign-up needed. Paste a long link and get a short one in seconds.
        </p>
      </div>

      {/* Shorten form */}
      <div className="w-full max-w-2xl">
        <form onSubmit={handleSubmit} className="flex gap-2 shadow-lg rounded-xl overflow-hidden border border-gray-200 bg-white p-2">
          <input
            type="url" required
            className="flex-1 px-4 py-3 text-sm outline-none text-gray-800 placeholder-gray-400"
            placeholder="Paste your long URL here…"
            value={url}
            onChange={e => setUrl(e.target.value)}
          />
          <button type="submit" disabled={loading} className="btn-primary px-6 py-3 text-base rounded-lg">
            {loading ? 'Shortening…' : 'Shorten'}
          </button>
        </form>

        {error && <Alert message={error} />}

        {result && (
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs text-gray-500 mb-0.5">Your short link is ready</p>
              <a
                href={shortUrl} target="_blank" rel="noopener noreferrer"
                className="text-blue-700 font-semibold text-sm hover:underline truncate block"
              >
                {shortUrl}
              </a>
            </div>
            <button onClick={copy} className="btn-primary shrink-0 py-2 px-4 text-sm">
              {copied ? '✓ Copied!' : 'Copy'}
            </button>
          </div>
        )}
      </div>

      {/* CTA to sign up */}
      <div className="mt-12 text-center">
        <p className="text-gray-500 text-sm mb-3">Want click analytics, custom aliases & link expiry?</p>
        <div className="flex gap-3 justify-center">
          <Link to="/register" className="btn-primary">Create free account</Link>
          <Link to="/login" className="btn-secondary">Sign in</Link>
        </div>
      </div>

      {/* Feature pills */}
      <div className="mt-10 flex flex-wrap justify-center gap-3 text-xs text-gray-500">
        {['✓ No login required', '✓ Custom aliases', '✓ Click analytics', '✓ Link expiry'].map(f => (
          <span key={f} className="bg-gray-100 rounded-full px-3 py-1">{f}</span>
        ))}
      </div>
    </div>
  );
}
