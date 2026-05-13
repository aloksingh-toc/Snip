import { useState } from 'react';
import api from '../api/client.js';
import Alert from './Alert.jsx';

export default function ShortenForm({ onCreated }) {
  const [url, setUrl] = useState('');
  const [alias, setAlias] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/urls', {
        originalUrl: url,
        customAlias: alias || undefined,
        expiresAt: expiresAt || undefined,
      });
      onCreated(data);
      setUrl('');
      setAlias('');
      setExpiresAt('');
      setShowOptions(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to shorten URL');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2 className="text-lg font-semibold mb-4">Shorten a URL</h2>
      <Alert message={error} />
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex gap-2">
          <input
            type="url" required className="input flex-1"
            placeholder="https://example.com/very/long/url"
            value={url}
            onChange={e => setUrl(e.target.value)}
          />
          <button type="submit" disabled={loading} className="btn-primary whitespace-nowrap">
            {loading ? 'Shortening…' : 'Shorten'}
          </button>
        </div>

        <button
          type="button"
          onClick={() => setShowOptions(v => !v)}
          className="text-sm text-blue-600 hover:underline"
        >
          {showOptions ? '− Hide options' : '+ Custom alias / expiry'}
        </button>

        {showOptions && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Custom alias</label>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
                <span className="px-2 py-2 bg-gray-50 text-gray-400 text-sm border-r border-gray-300">snip/</span>
                <input
                  type="text" className="flex-1 px-2 py-2 text-sm outline-none"
                  placeholder="my-link"
                  value={alias}
                  onChange={e => setAlias(e.target.value.replace(/[^a-zA-Z0-9-_]/g, ''))}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Expires at</label>
              <input
                type="datetime-local" className="input"
                value={expiresAt}
                min={new Date().toISOString().slice(0, 16)}
                onChange={e => setExpiresAt(e.target.value)}
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
