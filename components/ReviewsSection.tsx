'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Star, MessageCircle, Pencil, Trash2, Send } from 'lucide-react';

export type Review = {
  id: string;
  user_id: string;
  user_name: string;
  rating: number;
  comment: string;
  created_at: string;
  updated_at: string;
};

function StarRating({
  value,
  onChange,
  readonly = false,
  size = 24,
}: {
  value: number;
  onChange?: (v: number) => void;
  readonly?: boolean;
  size?: number;
}) {
  return (
    <div className="flex gap-0.5" role={readonly ? 'img' : undefined} aria-label={readonly ? `Rating: ${value} out of 5 stars` : undefined}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => !readonly && onChange?.(star)}
          onKeyDown={(e) => {
            if (readonly) return;
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onChange?.(star);
            }
          }}
          className={`p-0.5 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 ${
            readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110 transition-transform'
          }`}
          aria-label={readonly ? undefined : `Rate ${star} star${star > 1 ? 's' : ''}`}
        >
          <Star
            size={size}
            className={
              star <= value
                ? 'fill-amber-400 text-amber-400'
                : 'fill-transparent text-gray-300 dark:text-gray-600'
            }
          />
        </button>
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  const { data: session, status } = useSession();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [formRating, setFormRating] = useState(5);
  const [formComment, setFormComment] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editRating, setEditRating] = useState(5);
  const [editComment, setEditComment] = useState('');
  const [editLoading, setEditLoading] = useState(false);

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchReviews = useCallback(async () => {
    try {
      const res = await fetch('/api/reviews');
      if (!res.ok) throw new Error('Failed to load reviews');
      const data = await res.json();
      setReviews(data.reviews ?? []);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load reviews');
      setReviews([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id) return;
    setSubmitError(null);
    setSubmitLoading(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating: formRating, comment: formComment.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? 'Failed to submit review');
      setFormComment('');
      setFormRating(5);
      await fetchReviews();
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : 'Failed to submit');
    } finally {
      setSubmitLoading(false);
    }
  };

  const startEdit = (r: Review) => {
    setEditingId(r.id);
    setEditRating(r.rating);
    setEditComment(r.comment);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditRating(5);
    setEditComment('');
  };

  const handleUpdate = async (id: string) => {
    setEditLoading(true);
    try {
      const res = await fetch(`/api/reviews/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating: editRating, comment: editComment.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? 'Failed to update');
      setEditingId(null);
      await fetchReviews();
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : 'Failed to update');
    } finally {
      setEditLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this review?')) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/reviews/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? 'Failed to delete');
      }
      await fetchReviews();
      if (editingId === id) setEditingId(null);
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : 'Failed to delete');
    } finally {
      setDeletingId(null);
    }
  };

  const isOwnReview = (r: Review) => session?.user?.id === r.user_id;

  return (
    <section id="reviews" aria-label="Reviews and suggestions" className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary-700 dark:text-primary-400 mb-4">
            Reviews &amp; Suggestions
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-4" />
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Rate our clinic services and leave your feedback. You need an account to submit a review.
          </p>
        </div>

        {session && (
          <div className="mb-10 p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-primary-100 dark:border-primary-900/30">
            <h3 className="text-lg font-semibold text-primary-700 dark:text-primary-400 mb-4 flex items-center gap-2">
              <MessageCircle size={20} />
              Leave a review or suggestion
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Rating (1–5 stars)
                </label>
                <StarRating value={formRating} onChange={setFormRating} size={28} />
              </div>
              <div>
                <label htmlFor="review-comment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your review or suggestion
                </label>
                <textarea
                  id="review-comment"
                  rows={4}
                  required
                  value={formComment}
                  onChange={(e) => setFormComment(e.target.value)}
                  placeholder="Share your experience or suggest how we can improve..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              {submitError && (
                <p className="text-sm text-red-600 dark:text-red-400">{submitError}</p>
              )}
              <button
                type="submit"
                disabled={submitLoading}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium disabled:opacity-50"
              >
                <Send size={18} />
                {submitLoading ? 'Submitting...' : 'Submit review'}
              </button>
            </form>
          </div>
        )}

        {!session && status !== 'loading' && (
          <div className="mb-10 p-6 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-200 dark:border-primary-800 text-center">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Sign in or create an account to leave a review and rate our services.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/auth/signin"
                className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="px-5 py-2.5 rounded-lg text-sm font-semibold text-primary-600 dark:text-primary-400 border-2 border-primary-600 dark:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
              >
                Create account
              </Link>
            </div>
          </div>
        )}

        <div>
          <h3 className="text-xl font-semibold text-primary-700 dark:text-primary-400 mb-6">
            What others say
          </h3>
          {loading && (
            <p className="text-gray-600 dark:text-gray-400">Loading reviews...</p>
          )}
          {error && (
            <p className="text-red-600 dark:text-red-400">{error}</p>
          )}
          {!loading && !error && reviews.length === 0 && (
            <p className="text-gray-600 dark:text-gray-400">No reviews yet. Be the first to share your experience!</p>
          )}
          {!loading && !error && reviews.length > 0 && (
            <ul className="space-y-6">
              {reviews.map((r) => (
                <li
                  key={r.id}
                  className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-100 dark:border-gray-800"
                >
                  {editingId === r.id ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rating</label>
                        <StarRating value={editRating} onChange={setEditRating} size={28} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Comment</label>
                        <textarea
                          rows={3}
                          value={editComment}
                          onChange={(e) => setEditComment(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleUpdate(r.id)}
                          disabled={editLoading}
                          className="px-3 py-1.5 bg-primary-600 text-white rounded font-medium text-sm disabled:opacity-50"
                        >
                          {editLoading ? 'Saving...' : 'Save'}
                        </button>
                        <button
                          type="button"
                          onClick={cancelEdit}
                          className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded font-medium text-sm text-gray-700 dark:text-gray-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <StarRating value={r.rating} readonly size={20} />
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(r.created_at).toLocaleDateString(undefined, {
                            dateStyle: 'medium',
                          })}
                          {r.updated_at !== r.created_at && ' (edited)'}
                        </span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{r.comment}</p>
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        — {r.user_name}
                      </p>
                      {isOwnReview(r) && (
                        <div className="mt-4 flex gap-2">
                          <button
                            type="button"
                            onClick={() => startEdit(r)}
                            className="inline-flex items-center gap-1 px-2 py-1.5 text-sm text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded"
                          >
                            <Pencil size={14} />
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(r.id)}
                            disabled={deletingId === r.id}
                            className="inline-flex items-center gap-1 px-2 py-1.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded disabled:opacity-50"
                          >
                            <Trash2 size={14} />
                            {deletingId === r.id ? 'Deleting...' : 'Delete'}
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
