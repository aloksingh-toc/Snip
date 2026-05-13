import { useState, useEffect } from 'react';
import api from '../api/client.js';
import ShortenForm from '../components/ShortenForm.jsx';
import UrlCard from '../components/UrlCard.jsx';

export default function DashboardPage() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/urls')
      .then(({ data }) => setUrls(data))
      .finally(() => setLoading(false));
  }, []);

  const handleCreated = (newUrl) => setUrls(prev => [newUrl, ...prev]);
  const handleDeleted = (id) => setUrls(prev => prev.filter(u => u._id !== id));

  const totalClicks = urls.reduce((sum, u) => sum + (u.clicks?.length ?? 0), 0);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <ShortenForm onCreated={handleCreated} />

      {!loading && urls.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { label: 'Total links', value: urls.length },
            { label: 'Total clicks', value: totalClicks },
            { label: 'Active links', value: urls.filter(u => !u.expiresAt || new Date(u.expiresAt) > new Date()).length },
          ].map(({ label, value }) => (
            <div key={label} className="card py-4 text-center">
              <p className="text-2xl font-bold text-blue-600">{value}</p>
              <p className="text-xs text-gray-500 mt-1">{label}</p>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-800">Your links</h2>
        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading links…</div>
        ) : urls.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-4xl mb-3">✂️</p>
            <p className="text-gray-500">No links yet. Shorten your first URL above!</p>
          </div>
        ) : (
          urls.map(url => <UrlCard key={url._id} url={url} onDeleted={handleDeleted} />)
        )}
      </div>
    </div>
  );
}
