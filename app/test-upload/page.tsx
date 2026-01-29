"use client";

/**
 * Step 11: Simple test page for file upload.
 * Visit /test-upload, choose a file, and click Upload to verify Storage works.
 * You can remove this page after testing.
 */
import { useState, useRef, FormEvent } from "react";
import Link from "next/link";

export default function TestUploadPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success?: boolean; path?: string; fileName?: string; error?: string } | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      setResult({ error: "Please choose a file first." });
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/test-upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        setResult({ error: data.error || "Upload failed" });
        return;
      }
      setResult({ success: true, path: data.path, fileName: data.fileName });
      fileInputRef.current?.form?.reset();
    } catch (err) {
      setResult({ error: err instanceof Error ? err.message : "Upload failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Test file upload (Step 11)
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Upload a file to verify Supabase Storage works. Check the{" "}
            <strong>test-results</strong> bucket in your Supabase dashboard after
            uploading.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="file"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Choose a file
              </label>
              <input
                ref={fileInputRef}
                id="file"
                name="file"
                type="file"
                className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 dark:file:bg-primary-900/30 dark:file:text-primary-400 hover:file:bg-primary-100 dark:hover:file:bg-primary-900/50"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 rounded-md text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Uploading…" : "Upload"}
            </button>
          </form>

          {result && (
            <div
              className={`mt-4 p-4 rounded-md text-sm ${
                result.success
                  ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 border border-green-300 dark:border-green-700"
                  : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200"
              }`}
            >
              {result.success ? (
                <>
                  <p className="font-semibold">✓ File uploaded successfully</p>
                  <p className="mt-1">Stored as: {result.fileName}</p>
                  <p className="mt-1 text-xs opacity-90">Path: {result.path}</p>
                  <p className="mt-2 text-xs">
                    You can confirm in Supabase: Storage → Buckets → test-results
                  </p>
                </>
              ) : (
                <p>{result.error}</p>
              )}
            </div>
          )}

          <p className="mt-6 text-xs text-gray-500 dark:text-gray-400">
            This is a temporary test page. You can delete{" "}
            <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">app/test-upload/page.tsx</code> and{" "}
            <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">app/api/test-upload/</code> after
            testing.
          </p>
        </div>

        <p className="mt-4 text-center">
          <Link
            href="/"
            className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400"
          >
            ← Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
