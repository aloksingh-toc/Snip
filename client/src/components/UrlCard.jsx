import { useState } from 'react';
import api from '../api/client.js';
import { SERVER_URL } from '../config.js';

const BASE = SERVER_URL;

function fmtDate(d) {
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function UrlCard({ url, onDeleted }) {
  const [copied, setCopied] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const shortUrl = `${BASE}/${url.shortCode}`;
  const isExpired = url.expiresAt && new Date(url.expiresAt) < new Date();

  const copy = async () => {
    await navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const deleteUrl = async () => {
    if (!confirm('Delete this link?')) return;
    setDeleting(true);
    try {
      await api.delete(`/urls/${url._id}`);
      onDeleted(url._id);
    } catch {
      setDeleting(false);
    }
  };

  return (
    <div className={`card flex flex-col gap-3 ${isExpired ? 'opacity-60' : ''}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <a
              href={shortUrl} target="_blank" rel="noopener noreferrer"
              className="text-blue-600 font-semibold hover:underline text-sm truncate"
            >
              {BASE}/{url.shortCode}
            </a>
            {isExpired && (
              <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">Expired</span>
            )}
          </div>
          <p className="text-gray-500 text-xs truncate mt-0.5">{url.originalUrl}</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button onClick={copy} className="btn-secondary text-sm py-1.5 px-3">
            {copied ? '✓ Copied' : 'Copy'}
          </button>
          <button onClick={deleteUrl} disabled={deleting} className="btn-danger">
            {deleting ? '…' : 'Delete'}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 text-xs text-gray-500 border-t border-gray-100 pt-3">
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <strong className="text-gray-700">{url.clickCount ?? url.clicks?.length ?? 0}</strong> clicks
        </span>
        <span>Created {fmtDate(url.createdAt)}</span>
        {url.expiresAt && (
          <span className={isExpired ? 'text-red-500' : ''}>
            {isExpired ? 'Expired' : 'Expires'} {fmtDate(url.expiresAt)}
          </span>
        )}
      </div>
    </div>
  );
}
